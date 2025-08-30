from compiler import run_rust_code
from fastapi import APIRouter, WebSocket, WebSocketDisconnect as disconnected

router = APIRouter()

@router.websocket("/execute")
async def execute(socket: WebSocket):
    await socket.accept()
    try:
        while True:
            data = await socket.receive_json()
            code_snippet = data.get("code", "")

            if code_snippet:
                await run_rust_code(code_snippet, socket)
            else:
                await socket.send_json({"type": "error", "message": "You haven't entered any code."})
                continue
    except disconnected:
        print("Socket Lost")
