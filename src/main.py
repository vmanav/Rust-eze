import sys
sys.path.append("./src")

from fastapi import FastAPI as FAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.socket_routes import router as socket_router

app = FAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://thesis-fe-c06n.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(socket_router)
