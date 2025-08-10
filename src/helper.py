def augment_code(code: str) -> str:
    code_lines = code.splitlines()
    new_code_lines = []

    for index, line_of_code in enumerate(code_lines):

        if ".read_line(" in line_of_code and "stdin" in line_of_code:

            # Comment not actuall code
            if line_of_code.strip().startswith("//"):
                new_code_lines.append(line_of_code)
                continue

            marker = f'println!("[INPUT]");'
            new_code_lines.append(marker)

        new_code_lines.append(line_of_code)

    return "\n".join(new_code_lines)

