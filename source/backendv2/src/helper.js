const INPUT_MARKER = '[INPUT]';

function augmentCode(code) {
    const lines = code.split(/\r?\n/);
    const output = [];

    for (let line of lines) {
        const stripped = line.trim();
        // preserve commented lines beginning with // (Rust single-line comment)
        if (!stripped.startsWith('//') && line.includes('.read_line(') && line.includes('stdin')) {
            // insert println! marker before the line where stdin is read
            out.push(`println!("${INPUT_MARKER}");`);
        }
        output.push(line);
    }
    return output.join('\n')
}

module.exports = { augmentCode, INPUT_MARKER };