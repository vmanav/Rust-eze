// compiler.js
const { spawn, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const readline = require('readline');
const { augmentCode, INPUT_MARKER } = require('./helper');

const TEMP_DIR = path.join(__dirname, '../temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

function sendJsonSafe(websocket, obj) {
    try { websocket.send(JSON.stringify(obj)); } catch (e) { /* ignore */ }
}

async function executeRustCode(code, ws) {
    console.log("Executing Rust code...");
    const id = (crypto.randomUUID && crypto.randomUUID()) || crypto.randomBytes(16).toString('hex');

    const srcPath = path.join(TEMP_DIR, `${id}.rs`);
    const binPath = path.join(TEMP_DIR, `${id}${process.platform === 'win32' ? '.exe' : ''}`);

    try {
        const augmented = augmentCode(code);
        fs.writeFileSync(srcPath, augmented);

        // Compile: use rustc and capture stderr
        const compileResult = await new Promise((resolve) => {
            const compile = execFile('rustc', [srcPath, '-o', binPath], { timeout: 10000 }, (err, stdout, stderr) => {
                resolve({ err, stdout, stderr });
            });
        });

        console.log("Compilation result:", compileResult);

        if (compileResult.err) {
            const stderr = compileResult.stderr || compileResult.err.message || 'Compilation failed';
            sendJsonSafe(ws, { type: 'stderr', message: stderr });
            return; // stop here
        }

        // Spawn compiled binary
        const child = spawn(binPath, [], { stdio: ['pipe', 'pipe', 'pipe'] });

        // line-by-line stdout
        const rl = readline.createInterface({ input: child.stdout });

        function setupOneTimeInputListener() {
            const handler = (msg) => {
                let parsed;
                try {
                    parsed = typeof msg === 'string' ? JSON.parse(msg) : JSON.parse(msg.toString());
                } catch (e) {
                    // not JSON — ignore
                    return;
                }
                const value = (parsed.value ?? '') + '\n';
                try { child.stdin.write(value); }
                catch (e) { /* child might be closed */ }
            };
            ws.once('message', handler);
        }

        rl.on('line', (line) => {
            if (line.startsWith(INPUT_MARKER)) {
                sendJsonSafe(ws, { type: 'input_prompt' });
                setupOneTimeInputListener();
            } else {
                sendJsonSafe(ws, { type: 'output', content: line + '\n' });
            }
        });

        let stderrBuf = '';
        child.stderr.on('data', (d) => { stderrBuf += d.toString(); });

        child.on('close', (codeExit, signal) => {
            if (stderrBuf) sendJsonSafe(ws, { type: 'stderr', message: stderrBuf });
            sendJsonSafe(ws, { type: 'executed' });
            if (fs.existsSync(srcPath)) fs.unlinkSync(srcPath);
            if (fs.existsSync(binPath)) fs.unlinkSync(binPath);
        });

        child.on('error', (err) => {
            sendJsonSafe(ws, { type: 'error', message: err.message });
        });

    } catch (err) {
        if (err && err.code === 'ETIMEDOUT') {
            console.log("Execution timed out.");
            sendJsonSafe(ws, { type: 'error', message: 'Timeout encountered.' });
        } else {
            console.error("Execution error:", err);
            sendJsonSafe(ws, { type: 'error', message: (err && err.message) || 'Execution failed.' });
        }
    }
}

module.exports = { executeRustCode };