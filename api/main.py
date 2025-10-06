import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

import redis.asyncio as redis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import jobs, transcribe


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    # Startup
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    app.state.redis = await redis.from_url(redis_url, decode_responses=True)

    yield

    # Shutdown
    await app.state.redis.close()


app = FastAPI(
    title="DreamQuest API",
    version="1.0.0",
    description="API for generating playable worlds from dreams",
    lifespan=lifespan,
)

# CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(jobs.router, prefix="/v1", tags=["jobs"])
app.include_router(transcribe.router, prefix="/v1", tags=["transcribe"])


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "DreamQuest API", "version": "1.0.0"}


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "healthy"}
