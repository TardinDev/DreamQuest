import json
import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

from main import app


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def mock_redis():
    with patch("routes.jobs.Request.app.state.redis") as mock:
        mock.set = AsyncMock()
        mock.get = AsyncMock()
        yield mock


def test_root_endpoint(client):
    """Test root endpoint returns expected message"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "DreamQuest API", "version": "1.0.0"}


def test_health_endpoint(client):
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_create_job_with_valid_data(client, mock_redis):
    """Test creating a job with valid dream text"""
    payload = {
        "dream_text": "I was flying over a magical forest at night. A bird guided me.",
        "style": "lowpoly",
        "mood": "mystic",
        "length": "short",
    }

    response = client.post("/v1/jobs", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert "job_id" in data
    assert data["status"] == "queued"


def test_create_job_without_dream_text_or_audio(client):
    """Test creating a job without dream text or audio fails"""
    payload = {
        "style": "lowpoly",
        "mood": "mystic",
        "length": "short",
    }

    response = client.post("/v1/jobs", json=payload)

    assert response.status_code == 400
    assert "dream_text or audio_url must be provided" in response.json()["detail"]


def test_create_job_with_short_dream_text(client):
    """Test creating a job with too short dream text"""
    payload = {
        "dream_text": "Short",
        "style": "lowpoly",
        "mood": "mystic",
        "length": "short",
    }

    response = client.post("/v1/jobs", json=payload)

    # Should fail validation
    assert response.status_code == 422


def test_create_job_with_invalid_style(client):
    """Test creating a job with invalid style enum"""
    payload = {
        "dream_text": "I was flying over a magical forest at night.",
        "style": "invalid_style",
        "mood": "mystic",
        "length": "short",
    }

    response = client.post("/v1/jobs", json=payload)

    assert response.status_code == 422


def test_get_job_not_found(client, mock_redis):
    """Test getting a non-existent job"""
    mock_redis.get.return_value = None

    response = client.get("/v1/jobs/00000000-0000-0000-0000-000000000000")

    assert response.status_code == 404
    assert response.json()["detail"] == "Job not found"


def test_get_job_success(client, mock_redis):
    """Test getting an existing job"""
    job_id = "12345678-1234-1234-1234-123456789012"
    job_data = {
        "job_id": job_id,
        "status": "ready",
        "progress": 100,
        "result": {
            "webgl_url": f"/webgl/{job_id}/index.html",
            "blueprint": {
                "world": "forest",
                "time": "night",
                "weather": "clear",
                "goal": "explore",
                "characters": [],
                "style": "lowpoly",
                "mood": "mystic",
            },
        },
    }

    mock_redis.get.return_value = json.dumps(job_data)

    response = client.get(f"/v1/jobs/{job_id}")

    assert response.status_code == 200
    data = response.json()
    assert data["job_id"] == job_id
    assert data["status"] == "ready"
    assert data["progress"] == 100


def test_transcribe_audio(client):
    """Test audio transcription endpoint"""
    payload = {"audio_url": "http://example.com/audio.mp3"}

    response = client.post("/v1/transcribe", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert "text" in data
    assert len(data["text"]) > 0
