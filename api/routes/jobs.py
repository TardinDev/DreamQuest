import json
import uuid
from typing import Any

from fastapi import APIRouter, HTTPException, Request
from rq import Queue
from rq.job import Job

from schemas import (
    CreateJobRequest,
    CreateJobResponse,
    GetJobResponse,
    JobResult,
    JobStatusEnum,
)

router = APIRouter()


def get_queue(request: Request) -> Queue:
    """Get RQ queue from Redis connection"""
    from redis import Redis

    redis_client = Redis.from_url(request.app.state.redis.connection_pool.connection_kwargs["host"])
    return Queue("dreamquest", connection=redis_client)


@router.post("/jobs", response_model=CreateJobResponse)
async def create_job(request: Request, body: CreateJobRequest) -> CreateJobResponse:
    """Create a new dream-to-world generation job"""

    # Validate that either dream_text or audio_url is provided
    if not body.dream_text and not body.audio_url:
        raise HTTPException(
            status_code=400,
            detail="Either dream_text or audio_url must be provided"
        )

    # Rate limiting check (simplified - should use Redis for production)
    # TODO: Implement proper rate limiting with Redis

    # Create job
    job_id = uuid.uuid4()

    # Store job data in Redis
    job_data = {
        "job_id": str(job_id),
        "status": JobStatusEnum.QUEUED.value,
        "progress": 0,
        "dream_text": body.dream_text,
        "audio_url": body.audio_url,
        "style": body.style.value,
        "mood": body.mood.value,
        "length": body.length.value,
        "user_id": body.user_id,
    }

    await request.app.state.redis.set(
        f"job:{job_id}",
        json.dumps(job_data),
        ex=86400  # 24h expiration
    )

    # Enqueue worker job
    # queue = get_queue(request)
    # queue.enqueue("workers.orchestrator.process_dream", job_id)

    return CreateJobResponse(
        job_id=job_id,
        status=JobStatusEnum.QUEUED
    )


@router.get("/jobs/{job_id}", response_model=GetJobResponse)
async def get_job(request: Request, job_id: uuid.UUID) -> GetJobResponse:
    """Get job status and result"""

    # Get job from Redis
    job_data_str = await request.app.state.redis.get(f"job:{job_id}")

    if not job_data_str:
        raise HTTPException(status_code=404, detail="Job not found")

    job_data = json.loads(job_data_str)

    # Build response
    response_data: dict[str, Any] = {
        "job_id": job_id,
        "status": job_data["status"],
        "progress": job_data.get("progress", 0),
    }

    # Add result if job is ready
    if job_data["status"] == JobStatusEnum.READY.value and "result" in job_data:
        response_data["result"] = job_data["result"]

    # Add error if job failed
    if job_data["status"] == JobStatusEnum.FAILED.value and "error" in job_data:
        response_data["error"] = job_data["error"]

    return GetJobResponse(**response_data)


@router.get("/jobs/{job_id}/blueprint")
async def get_job_blueprint(request: Request, job_id: uuid.UUID) -> dict[str, Any]:
    """Get job blueprint JSON for Unity"""

    job_data_str = await request.app.state.redis.get(f"job:{job_id}")

    if not job_data_str:
        raise HTTPException(status_code=404, detail="Job not found")

    job_data = json.loads(job_data_str)

    if job_data["status"] != JobStatusEnum.READY.value:
        raise HTTPException(status_code=400, detail="Job not ready")

    if "result" not in job_data or "blueprint" not in job_data["result"]:
        raise HTTPException(status_code=404, detail="Blueprint not found")

    return job_data["result"]["blueprint"]
