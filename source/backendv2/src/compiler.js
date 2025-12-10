// compiler.js
const { spawn, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const readline = require('readline');
const { augmentCode, INPUT_MARKER } = require('./helper');

const TEMP_DIR = path.join(__dirname, 'temp');
console.log("TEMP_DIR : ", TEMP_DIR);
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

function sendJsonSafe(ws, obj) {
    try { ws.send(JSON.stringify(obj)); } catch (e) { /* ignore */ }
}

async function executeRustCode(code, ws) {
    const id = crypto.randomUUID();

    const srcPath = path.join(TEMP_DIR, `${id}.rs`);
    const binPath = path.join(TEMP_DIR, `${id}${process.platform === 'win32' ? '.exe' : ''}`);

    try {
        const augmented = augmentCode(code);
        fs.writeFileSync(srcPath, augmented);

        // Compile: use rustc
        await new Promise((resolve, reject) => {
            const compile = execFile('rustc', [srcPath, '-o', binPath], { timeout: 10000 }, (err, stdout, stderr) => {
                if (err) {
                    // send compile errors back
                    sendJsonSafe(ws, { type: 'stderr', message: stderr || (err.message) });
                    return reject(err);
                }
                resolve();
            });
        });

        // Spawn compiled binary
        const child = spawn(binPath, [], { stdio: ['pipe', 'pipe', 'pipe'] });

        // Read stdout line-by-line
        const rl = readline.createInterface({ input: child.stdout });

        // Flag to wait for input: when we detect marker, we wait for next message from websocket
        let waitingForInput = false;
        // Buffer to hold a one-time listener for input
        function setupOneTimeInputListener() {
            const handler = (msg) => {
                try {
                    const data = JSON.parse(msg.toString());
                    const value = (data.value ?? '') + '\n';
                    child.stdin.write(value);
                } catch (e) {
                    // ignore malformed input
                }
                // remove this listener after using
                ws.removeListener('message', handler);
            };
            ws.on('message', handler);
        }

        rl.on('line', (line) => {
            if (line.startsWith(INPUT_MARKER)) {
                sendJsonSafe(ws, { type: 'input_prompt' });
                setupOneTimeInputListener();
            } else {
                sendJsonSafe(ws, { type: 'output', content: line + '\n' });
            }
        });

        // capture stderr (compiler runtime errors)
        let stderrBuf = '';
        child.stderr.on('data', (d) => { stderrBuf += d.toString(); });

        child.on('close', (codeExit) => {
            if (stderrBuf) sendJsonSafe(ws, { type: 'stderr', message: stderrBuf });
            sendJsonSafe(ws, { type: 'executed' });
        });

        child.on('error', (err) => {
            sendJsonSafe(ws, { type: 'error', message: err.message });
        });

    } catch (err) {
        if (err && err.code === 'ETIMEDOUT') {
            sendJsonSafe(ws, { type: 'error', message: 'Timeout encountered.' });
        } else if (!err.killed) {
            // compile errors already emitted, but ensure we send something
            sendJsonSafe(ws, { type: 'error', message: (err && err.message) || 'Execution failed.' });
        }
    } finally {
        // cleanup
        try { if (fs.existsSync(srcPath)) fs.unlinkSync(srcPath); } catch (e) { }
        try { if (fs.existsSync(binPath)) fs.unlinkSync(binPath); } catch (e) { }
    }
}

module.exports = { executeRustCode };