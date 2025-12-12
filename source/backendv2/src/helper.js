const INPUT_MARKER = '[INPUT]';

function augmentCode(code) {
    const lines = code.split(/\r?\n/);
    const output = [];

    for (let line of lines) {
        const stripped = line.trim();
        // Ignore lines that are comments
        if (!stripped.startsWith('//') && line.includes('.read_line(') && line.includes('stdin')) {
            output.push(`println!("${INPUT_MARKER}");`);
        }
        output.push(line);
    }
    return output.join('\n')
}

module.exports = { augmentCode, INPUT_MARKER };