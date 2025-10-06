"""
Dream-to-world orchestration pipeline
Handles the multi-step process of converting a dream description into a playable WebGL world
"""

import json
import os
import random
from typing import Any
from uuid import UUID

import redis


def get_redis() -> redis.Redis:
    """Get Redis connection"""
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    return redis.from_url(redis_url, decode_responses=True)


def update_job_status(
    r: redis.Redis,
    job_id: str,
    status: str,
    progress: int,
    result: dict[str, Any] | None = None,
    error: str | None = None
) -> None:
    """Update job status in Redis"""
    job_key = f"job:{job_id}"
    job_data_str = r.get(job_key)

    if not job_data_str:
        raise ValueError(f"Job {job_id} not found")

    job_data = json.loads(job_data_str)
    job_data["status"] = status
    job_data["progress"] = progress

    if result:
        job_data["result"] = result

    if error:
        job_data["error"] = error

    r.set(job_key, json.dumps(job_data), ex=86400)


def parse_dream_to_blueprint(dream_text: str, style: str, mood: str) -> dict[str, Any]:
    """
    Step A: Parse dream text into a blueprint JSON
    This is a deterministic stub - replace with LLM call (OpenAI/Anthropic/HF) in production
    """

    # Deterministic parsing based on keywords
    world_type = "forest"
    time_of_day = "night"
    weather = "clear"
    goal = "explore"
    characters = []

    # Simple keyword detection
    text_lower = dream_text.lower()

    # World detection
    if "forest" in text_lower or "tree" in text_lower or "woods" in text_lower:
        world_type = "forest"
    elif "city" in text_lower or "urban" in text_lower or "street" in text_lower:
        world_type = "city"
    elif "ocean" in text_lower or "sea" in text_lower or "water" in text_lower:
        world_type = "ocean"
    elif "desert" in text_lower or "sand" in text_lower:
        world_type = "desert"
    elif "space" in text_lower or "stars" in text_lower or "galaxy" in text_lower:
        world_type = "space"

    # Time detection
    if "night" in text_lower or "dark" in text_lower or "moon" in text_lower:
        time_of_day = "night"
    elif "day" in text_lower or "sun" in text_lower or "bright" in text_lower:
        time_of_day = "day"
    elif "sunset" in text_lower or "dusk" in text_lower:
        time_of_day = "sunset"
    elif "dawn" in text_lower or "sunrise" in text_lower:
        time_of_day = "dawn"

    # Weather detection
    if "rain" in text_lower or "feather" in text_lower:
        weather = "feathers_rain"
    elif "fog" in text_lower or "mist" in text_lower:
        weather = "fog"
    elif "storm" in text_lower:
        weather = "storm"

    # Characters detection
    if "bird" in text_lower:
        characters.append({"type": "bird", "role": "guide"})

    if "house" in text_lower and ("float" in text_lower or "flying" in text_lower):
        characters.append({"type": "house", "float": True})
    elif "house" in text_lower:
        characters.append({"type": "house", "float": False})

    if "person" in text_lower or "figure" in text_lower or "someone" in text_lower:
        characters.append({"type": "person", "role": "mysterious"})

    # Goal detection
    if "follow" in text_lower:
        goal = "follow_bird_to_flying_house"
    elif "find" in text_lower or "search" in text_lower:
        goal = "find_hidden_object"
    elif "escape" in text_lower or "run" in text_lower:
        goal = "escape_danger"
    else:
        goal = "explore_world"

    blueprint = {
        "world": world_type,
        "time": time_of_day,
        "weather": weather,
        "goal": goal,
        "characters": characters,
        "style": style,
        "mood": mood
    }

    return blueprint


def generate_assets_mock(blueprint: dict[str, Any]) -> dict[str, Any]:
    """
    Step B: Generate asset placeholders
    In production, this would call SDXL for images, procedural generators, etc.
    """

    assets = {
        "models": [],
        "textures": [],
        "audio": []
    }

    # Mock asset generation based on blueprint
    for character in blueprint.get("characters", []):
        assets["models"].append({
            "type": character["type"],
            "file": f"/assets/models/{character['type']}.glb"
        })

    # Environment assets
    assets["models"].append({
        "type": "terrain",
        "file": f"/assets/models/terrain_{blueprint['world']}.glb"
    })

    # Audio
    assets["audio"].append({
        "type": "ambient",
        "file": f"/assets/audio/ambient_{blueprint['mood']}.mp3"
    })

    return assets


def build_webgl_world(job_id: str, blueprint: dict[str, Any]) -> str:
    """
    Step C: Build WebGL world
    In a real implementation, this would:
    1. Write blueprint.json to Unity StreamingAssets or pass via URL
    2. Trigger Unity Cloud Build or local build
    3. Export WebGL to /frontend/public/webgl/{job_id}/

    For this stub, we create a mock structure
    """

    # Create directory structure (in production, this would be handled by Unity build)
    webgl_dir = f"/frontend/public/webgl/{job_id}"
    os.makedirs(webgl_dir, exist_ok=True)

    # Write blueprint
    with open(f"{webgl_dir}/blueprint.json", "w") as f:
        json.dump(blueprint, f, indent=2)

    # In production, Unity would generate:
    # - index.html
    # - Build/Build.wasm
    # - Build/Build.data
    # - Build/Build.framework.js
    # - Build/Build.loader.js

    # For now, return the URL
    webgl_url = f"/webgl/{job_id}/index.html"

    return webgl_url


def process_dream(job_id: str) -> None:
    """
    Main orchestration function
    Processes a dream through all pipeline stages
    """

    r = get_redis()

    try:
        # Get job data
        job_data_str = r.get(f"job:{job_id}")
        if not job_data_str:
            raise ValueError(f"Job {job_id} not found")

        job_data = json.loads(job_data_str)

        dream_text = job_data.get("dream_text", "")
        style = job_data.get("style", "lowpoly")
        mood = job_data.get("mood", "mystic")

        # Step A: Analyzing - Parse dream to blueprint
        update_job_status(r, job_id, "analyzing", 25)

        blueprint = parse_dream_to_blueprint(dream_text, style, mood)

        # Step B: Generating - Generate assets
        update_job_status(r, job_id, "generating", 50)

        assets = generate_assets_mock(blueprint)

        # Step C: Building - Build WebGL world
        update_job_status(r, job_id, "building", 75)

        webgl_url = build_webgl_world(job_id, blueprint)

        # Step D: Ready - Job complete
        result = {
            "webgl_url": webgl_url,
            "blueprint": blueprint
        }

        update_job_status(r, job_id, "ready", 100, result=result)

    except Exception as e:
        # Handle errors
        update_job_status(r, job_id, "failed", 0, error=str(e))
        raise


# For testing
if __name__ == "__main__":
    test_job_id = "test-job-123"
    r = get_redis()

    # Create test job
    test_job = {
        "job_id": test_job_id,
        "status": "queued",
        "progress": 0,
        "dream_text": "I was flying over a magical forest at night. A glowing bird appeared and guided me to a floating house. Feathers were falling from the sky like rain.",
        "style": "lowpoly",
        "mood": "mystic",
        "length": "short"
    }

    r.set(f"job:{test_job_id}", json.dumps(test_job))

    # Process it
    process_dream(test_job_id)

    # Check result
    result = r.get(f"job:{test_job_id}")
    print(json.dumps(json.loads(result), indent=2))
