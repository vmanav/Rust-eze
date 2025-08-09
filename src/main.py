import sys
sys.path.append("./src")

from fastapi import FastAPI as FAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.socket_routes import router as socket_router

app = FAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(socket_router)
