import json
import os
import uuid
from typing import Any

import anthropic
from fastapi import APIRouter, HTTPException, Request

from schemas import (
    CreateJobRequest,
    CreateJobResponse,
    JobStatusEnum,
    OutputTypeEnum,
)

router = APIRouter()


async def generate_image_with_claude(dream_text: str, style: str, mood: str) -> str:
    """Generate an image URL using Claude and image generation API"""
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    # Use Claude to create a detailed image prompt
    prompt_response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": f"""Based on this dream description, create a detailed visual prompt for an AI image generator.
Dream: {dream_text}
Style: {style}
Mood: {mood}

Create a vivid, detailed prompt that captures the essence, atmosphere, and visual details of this dream. Focus on composition, lighting, colors, and key elements."""
        }]
    )

    image_prompt = prompt_response.content[0].text

    # In production, integrate with DALL-E, Midjourney, or Stable Diffusion
    # For now, return a placeholder that includes the prompt
    image_data = {
        "prompt": image_prompt,
        "placeholder": f"https://placehold.co/1024x1024/1a1a2e/white?text=Dream+Image"
    }

    return image_data


async def generate_video_with_claude(dream_text: str, style: str, mood: str) -> str:
    """Generate a video concept using Claude"""
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    # Use Claude to create a detailed video storyboard
    storyboard_response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1000,
        messages=[{
            "role": "user",
            "content": f"""Based on this dream description, create a detailed video storyboard with 5-8 key scenes.
Dream: {dream_text}
Style: {style}
Mood: {mood}

For each scene, describe:
- Visual composition
- Camera movement
- Lighting and atmosphere
- Key elements and actions
- Duration (in seconds)
- Transitions

Create a cinematic experience that brings this dream to life."""
        }]
    )

    storyboard = storyboard_response.content[0].text

    # In production, integrate with RunwayML, Pika, or similar video generation API
    # For now, return a placeholder
    video_data = {
        "storyboard": storyboard,
        "placeholder": f"https://placehold.co/1920x1080/1a1a2e/white?text=Dream+Video"
    }

    return video_data


async def generate_game_blueprint(dream_text: str, style: str, mood: str, length: str) -> dict[str, Any]:
    """Generate a game blueprint using Claude"""
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    blueprint_response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=2000,
        messages=[{
            "role": "user",
            "content": f"""Based on this dream description, create a detailed game world blueprint in JSON format.
Dream: {dream_text}
Style: {style}
Mood: {mood}
Length: {length}

Create a JSON structure with:
- world: type of environment (forest, city, ocean, space, desert, etc.)
- time: time of day (dawn, day, dusk, night)
- weather: weather condition (clear, rain, snow, fog, storm)
- goal: player objective (explore_freely, find_object, escape, reach_destination, solve_puzzle)
- terrain: {{type: (organic/geometric), elevation: (flat/medium/mountainous)}}
- characters: array of {{type: (guide/friend/mysterious/creature), role: (friendly/neutral/mysterious)}}
- lighting: {{ambient: 0-1, directional: 0-1, fog_density: 0-1}}
- interactive_elements: array of objects the player can interact with
- special_effects: array of visual effects (particles, glows, etc.)

Return ONLY valid JSON, no other text."""
        }]
    )

    blueprint_text = blueprint_response.content[0].text.strip()

    # Extract JSON from markdown code blocks if present
    if "```json" in blueprint_text:
        blueprint_text = blueprint_text.split("```json")[1].split("```")[0].strip()
    elif "```" in blueprint_text:
        blueprint_text = blueprint_text.split("```")[1].split("```")[0].strip()

    try:
        blueprint = json.loads(blueprint_text)
    except json.JSONDecodeError:
        # Fallback blueprint
        blueprint = {
            "world": "forest",
            "time": "night",
            "weather": "clear",
            "mood": mood,
            "goal": "explore_freely",
            "terrain": {"type": "organic", "elevation": "medium"},
            "characters": [{"type": "guide", "role": "friendly"}],
            "lighting": {"ambient": 0.3, "directional": 0.7, "fog_density": 0.2},
            "interactive_elements": ["glowing_mushrooms", "ancient_tree", "floating_crystals"],
            "special_effects": ["fireflies", "light_beams", "particle_trails"]
        }

    return blueprint


@router.post("/generate", response_model=CreateJobResponse)
async def generate_dream_output(request: Request, body: CreateJobRequest) -> CreateJobResponse:
    """Generate image, video, or game from dream description"""

    # Validate that either dream_text or audio_url is provided
    if not body.dream_text and not body.audio_url:
        raise HTTPException(
            status_code=400,
            detail="Either dream_text or audio_url must be provided"
        )

    # Create job
    job_id = uuid.uuid4()

    # Store initial job data
    job_data = {
        "job_id": str(job_id),
        "status": JobStatusEnum.QUEUED.value,
        "progress": 0,
        "dream_text": body.dream_text,
        "audio_url": body.audio_url,
        "output_type": body.output_type.value,
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

    # Process generation asynchronously (in production, use background task)
    # For now, we'll process synchronously for demo
    try:
        # Update status to analyzing
        job_data["status"] = JobStatusEnum.ANALYZING.value
        job_data["progress"] = 10
        await request.app.state.redis.set(f"job:{job_id}", json.dumps(job_data), ex=86400)

        # Get final dream text (transcribe audio if needed)
        final_dream_text = body.dream_text or "A mysterious dream world"

        # Update status to generating
        job_data["status"] = JobStatusEnum.GENERATING.value
        job_data["progress"] = 30
        await request.app.state.redis.set(f"job:{job_id}", json.dumps(job_data), ex=86400)

        # Generate based on output type
        if body.output_type == OutputTypeEnum.IMAGE:
            result_data = await generate_image_with_claude(
                final_dream_text,
                body.style.value,
                body.mood.value
            )
            job_data["result"] = {
                "output_type": "image",
                "image_url": result_data.get("placeholder"),
                "prompt": result_data.get("prompt")
            }

        elif body.output_type == OutputTypeEnum.VIDEO:
            result_data = await generate_video_with_claude(
                final_dream_text,
                body.style.value,
                body.mood.value
            )
            job_data["result"] = {
                "output_type": "video",
                "video_url": result_data.get("placeholder"),
                "storyboard": result_data.get("storyboard")
            }

        elif body.output_type == OutputTypeEnum.GAME:
            blueprint = await generate_game_blueprint(
                final_dream_text,
                body.style.value,
                body.mood.value,
                body.length.value
            )
            job_data["result"] = {
                "output_type": "game",
                "webgl_url": "/webgl/demo/index.html",
                "blueprint": blueprint
            }

        # Update status to ready
        job_data["status"] = JobStatusEnum.READY.value
        job_data["progress"] = 100
        await request.app.state.redis.set(f"job:{job_id}", json.dumps(job_data), ex=86400)

    except Exception as e:
        job_data["status"] = JobStatusEnum.FAILED.value
        job_data["error"] = str(e)
        await request.app.state.redis.set(f"job:{job_id}", json.dumps(job_data), ex=86400)

    return CreateJobResponse(
        job_id=job_id,
        status=JobStatusEnum.QUEUED
    )
