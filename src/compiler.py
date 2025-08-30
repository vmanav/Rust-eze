import asyncio as asc
from fastapi import WebSocket
import os
import subprocess, uuid, os

from helper import augment_code

TEMP_DIRECTORY = "src/temp"
INPUT_MARKET = "[INPUT]"
os.makedirs(TEMP_DIRECTORY, exist_ok=True)

async def run_rust_code(code_snippet: str, websocket: WebSocket):
    identifier = str(uuid.uuid4())
    rust_source = f"{TEMP_DIRECTORY}/{identifier}.rs"
    rust_binary = f"{TEMP_DIRECTORY}/{identifier}"

    try:
        augmented_code_snippet = augment_code(code_snippet)
        # print("augmented code: ", augmented_code_snippet);

        with open(rust_source, "w") as file:
            file.write(augmented_code_snippet)

        compiled_process = subprocess.run(
            ["rustc", rust_source, "-o", rust_binary],
            capture_output=True, text=True, timeout=10
        )
        compiled_process_status = compiled_process.returncode

        if compiled_process_status != 0:
            await websocket.send_json({
                "type": "stderr", 
                "message": compiled_process.stderr,
            })
            return

        main_process = await asc.create_subprocess_exec(
            f"./{rust_binary}",
            stdin=asc.subprocess.PIPE,
            stdout=asc.subprocess.PIPE,
            stderr=asc.subprocess.PIPE,
        )
        main_process_status = main_process.returncode


        while True:
            code_line = await main_process.stdout.readline()
            code_line = code_line.decode()
            # print("Decoded line:", code_line)

            if not code_line:
                if main_process_status is not None:
                    break

            if code_line.startswith(INPUT_MARKET):
                await websocket.send_json({"type": "input_prompt" })
                
                terminal_input = await websocket.receive_json()
                terminal_input_value = terminal_input.get("value", "") + "\n"
                
                main_process.stdin.write(terminal_input_value.encode())
                await main_process.stdin.drain()
            else:
                await websocket.send_json({"type": "output", "content": code_line})

        std_error = await main_process.stderr.read()
        if std_error:
            await websocket.send_json({"type": "stderr", "content": std_error})

        await websocket.send_json({"type": "executed"})

    except asc.TimeoutError:
        await websocket.send_json({"type": "error", "message": "Timeout encountered."})

    finally:
        if os.path.exists(rust_source): os.remove(rust_source)
        if os.path.exists(rust_binary): os.remove(rust_binary)
