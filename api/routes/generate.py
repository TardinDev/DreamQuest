"""Dream-to-world generation pipeline.

Two-stage AI pipeline:
  1. Dream analysis — extract symbols, archetypes, emotions, sensory imagery
     strictly grounded in what the user actually wrote.
  2. Output synthesis — craft a rich prompt, storyboard, or 3D blueprint
     grounded in the structured analysis, then enrich with style/mood presets.

The analysis stage runs once and feeds every output type, so the same
dream yields coherent image/video/game variants instead of three
independent takes.

Design principle: fidelity to the user's text. The model is explicitly
forbidden from inventing elements that aren't implied by what the user
wrote. Style and mood are aesthetic overlays, never narrative licence.
"""

from __future__ import annotations

import asyncio
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

MODEL_ID = "claude-opus-4-7"

# Semantic presets shared between the analysis and synthesis stages.
# Keeping these here (not in the prompt) lets the LLM focus on *interpretation*
# while the backend enforces deterministic, brand-consistent styling.
STYLE_PRESETS: dict[str, dict[str, Any]] = {
    "lowpoly": {
        "render": "low-poly geometry, flat-shaded faceted surfaces, crisp silhouettes",
        "palette": ["#1E293B", "#38BDF8", "#F472B6", "#FDE68A"],
        "reference": "Monument Valley, Alto's Odyssey",
    },
    "realistic": {
        "render": "photoreal cinematography, volumetric light, physically-based materials, 35mm depth of field",
        "palette": ["#0B1220", "#2563EB", "#F97316", "#E2E8F0"],
        "reference": "Unreal Engine 5 showcases, Roger Deakins lighting",
    },
    "toon": {
        "render": "hand-painted cel-shaded, thick ink outlines, saturated gouache colors, 2.5D parallax",
        "palette": ["#FFF7ED", "#F43F5E", "#8B5CF6", "#22D3EE"],
        "reference": "Studio Ghibli, Arcane, Spider-Verse",
    },
    "surreal": {
        "render": "impossible architecture, liquid geometry, refracting chromatic aberration, dream logic",
        "palette": ["#0F0A1F", "#C026D3", "#06B6D4", "#FBBF24"],
        "reference": "Dalí, Moebius, Beksinski",
    },
}

MOOD_PRESETS: dict[str, dict[str, Any]] = {
    "calm":       {"lighting": {"ambient": 0.55, "directional": 0.45, "fog_density": 0.15}, "tempo": "slow", "audio": "ambient drones, soft pads"},
    "tense":      {"lighting": {"ambient": 0.15, "directional": 0.85, "fog_density": 0.55}, "tempo": "staccato", "audio": "dissonant strings, low rumble"},
    "mystic":     {"lighting": {"ambient": 0.30, "directional": 0.60, "fog_density": 0.45}, "tempo": "hypnotic", "audio": "ethereal choir, crystalline bells"},
    "nostalgic":  {"lighting": {"ambient": 0.45, "directional": 0.50, "fog_density": 0.30}, "tempo": "flowing", "audio": "lo-fi piano, warm tape hiss"},
}


FIDELITY_RULES = """FIDELITY RULES (non-negotiable):
- Every concrete element (place, creature, object, action, colour, feeling) MUST be traceable to the user's text or be a restrained, named symbolic reading of it. If the dream says "forêt", do not output "ocean". If the dream says "oiseau de lumière", keep the bird — don't replace it with a dragon.
- Preserve proper nouns, named characters and distinctive phrases verbatim.
- Preserve the sequence of events in the order the user described them.
- Preserve the language register of the user (poetic, matter-of-fact, first-person, etc.).
- Do NOT invent new story beats, locations, or characters. If the dream is short, let the output be tightly scoped — better faithful than padded.
- Style and mood are aesthetic overlays on top of the user's scene. They colour the scene; they never replace it.
"""


def _get_client() -> anthropic.Anthropic:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY is not configured")
    return anthropic.Anthropic(api_key=api_key)


def _extract_json(text: str) -> dict[str, Any]:
    """Robustly pull a JSON object out of an LLM response."""
    cleaned = text.strip()
    if "```json" in cleaned:
        cleaned = cleaned.split("```json", 1)[1].split("```", 1)[0]
    elif "```" in cleaned:
        cleaned = cleaned.split("```", 1)[1].split("```", 1)[0]
    cleaned = cleaned.strip()
    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start != -1 and end != -1:
        cleaned = cleaned[start : end + 1]
    return json.loads(cleaned)


def _collect_text(resp: anthropic.types.Message) -> str:
    """Concatenate every text block — adaptive thinking interleaves thinking + text blocks."""
    parts = [b.text for b in resp.content if getattr(b, "type", None) == "text"]
    return "\n".join(parts).strip()


async def analyze_dream(dream_text: str, style: str, mood: str) -> dict[str, Any]:
    """Stage 1 — structured dream interpretation.

    Returns a dict with: title, summary, symbols, archetypes, emotions,
    setting, characters, sensory_details, narrative_arc, color_story.
    """
    client = _get_client()

    system = (
        "You are a dream interpreter fluent in Jungian symbolism, cinematic "
        "worldbuilding, and sensory writing. You translate messy first-person "
        "dream memories into rigorous, evocative creative briefs.\n\n"
        + FIDELITY_RULES
        + "\nYou may name unstated atmospheres, archetypes, and symbolic resonance — "
        "but every concrete noun in your output must be either present in the user's "
        "text, or clearly a symbolic reading of something that IS in the text. "
        "When in doubt, stay literal. Return STRICT JSON only, no prose, no fences."
    )

    user = f"""Analyze the following dream. Return STRICT JSON — no prose, no markdown fences.

DREAM (verbatim — every detail here is load-bearing):
\"\"\"{dream_text}\"\"\"

USER-CHOSEN AESTHETIC (style & mood are overlays, NOT story replacements):
- style: {style}
- mood: {mood}

Return this exact shape:
{{
  "title": "short evocative title, 2–5 words, drawn from the dream's imagery",
  "logline": "one sentence capturing the dream's essence — faithful to what the user described",
  "symbols": ["3–6 symbols pulled DIRECTLY from the dream text, each a word or short phrase the user actually used or clearly implied"],
  "archetypes": ["Jungian archetypes present, e.g. shadow, guide, threshold — only those the dream actually supports"],
  "emotions": ["primary emotional beats as they appear in the dream, ordered by intensity"],
  "setting": {{
    "biome": "forest | desert | ocean | city | cosmos | liminal | domestic | ... — MUST match what the user described",
    "time_of_day": "dawn | day | dusk | night | timeless",
    "weather": "clear | rain | snow | fog | storm | aurora | ...",
    "scale": "intimate | grand | cosmic"
  }},
  "characters": [
    {{"name": "use the user's name for them if given, else a short descriptive label",
      "role": "guide | shadow | companion | threshold-guardian | stranger",
      "description": "one vivid sentence faithful to how the user described them"}}
  ],
  "sensory_details": {{
    "sight": ["concrete visuals from the dream"],
    "sound": ["sounds the dream implies or names"],
    "touch": ["tactile impressions"],
    "smell_or_taste": ["only if the dream supports it; else empty array"]
  }},
  "narrative_arc": ["beat 1 — as the dream opens", "beat 2 — middle", "beat 3 — how it ends or dissolves"],
  "color_story": ["3–5 hex codes that capture the dream's palette, informed by the chosen style"],
  "tagline": "short poetic phrase, <=10 words, echoing the dream's voice"
}}"""

    def _call() -> anthropic.types.Message:
        return client.messages.create(
            model=MODEL_ID,
            max_tokens=4000,
            thinking={"type": "adaptive"},
            system=system,
            messages=[{"role": "user", "content": user}],
        )

    resp = await asyncio.to_thread(_call)
    raw = _collect_text(resp)
    try:
        return _extract_json(raw)
    except (json.JSONDecodeError, ValueError):
        return {
            "title": "Untitled Dream",
            "logline": dream_text[:120],
            "symbols": [],
            "archetypes": [],
            "emotions": [mood],
            "setting": {"biome": "liminal", "time_of_day": "night", "weather": "fog", "scale": "intimate"},
            "characters": [],
            "sensory_details": {"sight": [], "sound": [], "touch": [], "smell_or_taste": []},
            "narrative_arc": [],
            "color_story": STYLE_PRESETS.get(style, {}).get("palette", []),
            "tagline": "A dream remembered.",
        }


async def generate_image_prompt(
    analysis: dict[str, Any], style: str, mood: str, dream_text: str
) -> dict[str, Any]:
    client = _get_client()
    preset = STYLE_PRESETS.get(style, STYLE_PRESETS["surreal"])

    system = (
        "You are a senior concept artist who writes precise, single-paragraph "
        "image-generation prompts. You work from the user's dream and its "
        "structured analysis. You do NOT invent subjects that aren't in the "
        "user's text. You DO translate abstract feelings into specific "
        "visual choices (framing, materials, light, palette).\n\n"
        + FIDELITY_RULES
    )

    user = f"""Write ONE flowing paragraph (150–220 words) of image-generation prompt for this dream.

USER'S DREAM (verbatim — the image must depict THIS scene, not a generic one):
\"\"\"{dream_text}\"\"\"

STRUCTURED ANALYSIS:
{json.dumps(analysis, indent=2, ensure_ascii=False)}

RENDER DIRECTIVES:
- Visual style: {preset['render']}
- Reference look: {preset['reference']}
- Mood: {mood}

Rules:
- Start with the specific subject + action from the user's dream, then setting, then lighting, then material detail, then camera.
- Name specific colors from analysis.color_story.
- Include at least two symbols from analysis.symbols, by name.
- If the dream named a character, place them in frame with their described appearance.
- End the paragraph with: "—no text, no watermarks, no borders."
- Do NOT use bullet points. One flowing paragraph only.
- Do NOT introduce elements the user did not describe."""

    def _call() -> anthropic.types.Message:
        return client.messages.create(
            model=MODEL_ID,
            max_tokens=2000,
            thinking={"type": "adaptive"},
            system=system,
            messages=[{"role": "user", "content": user}],
        )

    resp = await asyncio.to_thread(_call)
    prompt = _collect_text(resp)

    return {
        "prompt": prompt,
        "negative_prompt": "text, watermark, signature, border, low quality, blurry, distorted anatomy, generic stock imagery, elements unrelated to the source dream",
        "aspect_ratio": "1:1",
        "placeholder_url": "https://placehold.co/1024x1024/0B1220/E2E8F0?text=Dream+Image",
    }


async def generate_video_storyboard(
    analysis: dict[str, Any], style: str, mood: str, dream_text: str
) -> dict[str, Any]:
    client = _get_client()
    preset = STYLE_PRESETS.get(style, STYLE_PRESETS["surreal"])
    mood_preset = MOOD_PRESETS.get(mood, MOOD_PRESETS["mystic"])

    system = (
        "You are a cinematic director who storyboards dream sequences. "
        "Your 6 shots MUST tell the user's dream in the order they described it — "
        "not a generic cinematic arc. Every subject, setting and action in a shot "
        "must be traceable to the user's text or the structured analysis.\n\n"
        + FIDELITY_RULES
        + "\nReturn STRICT JSON only. No prose. No markdown fences."
    )

    user = f"""Produce a 6-shot storyboard as STRICT JSON.

USER'S DREAM (the sequence of shots must follow the events here, in order):
\"\"\"{dream_text}\"\"\"

STRUCTURED ANALYSIS:
{json.dumps(analysis, indent=2, ensure_ascii=False)}

RENDER: {preset['render']}
TEMPO: {mood_preset['tempo']}
AUDIO PALETTE: {mood_preset['audio']}

Shot allocation rule: map the 6 shots onto analysis.narrative_arc when possible.
If the dream has 3 narrative beats, devote roughly 2 shots per beat. If it has
fewer, linger on what the user described rather than inventing new moments.

Schema:
{{
  "title": "use analysis.title",
  "runtime_seconds": 30,
  "aspect_ratio": "16:9",
  "shots": [
    {{
      "index": 1,
      "duration_s": 5,
      "composition": "wide | medium | close | extreme-close | aerial | POV",
      "camera_move": "static | dolly-in | pan-left | crane-up | orbit | handheld",
      "subject": "the specific subject from the user's dream at this moment",
      "action": "what the subject does, per the user's text",
      "lighting": "concrete lighting that matches the setting and mood",
      "color_notes": "dominant hex + accent, drawn from analysis.color_story",
      "sound_design": "sounds faithful to the dream + mood audio palette",
      "transition_out": "cut | dissolve | whip-pan | match-cut"
    }}
  ],
  "score": "one-sentence description of the music bed"
}}"""

    def _call() -> anthropic.types.Message:
        return client.messages.create(
            model=MODEL_ID,
            max_tokens=4000,
            thinking={"type": "adaptive"},
            system=system,
            messages=[{"role": "user", "content": user}],
        )

    resp = await asyncio.to_thread(_call)
    raw = _collect_text(resp)
    try:
        storyboard = _extract_json(raw)
    except (json.JSONDecodeError, ValueError):
        storyboard = {"title": analysis.get("title", "Dream"), "shots": [], "score": mood_preset["audio"]}

    return {
        "storyboard": storyboard,
        "placeholder_url": "https://placehold.co/1920x1080/0B1220/E2E8F0?text=Dream+Video",
    }


async def generate_game_blueprint(
    analysis: dict[str, Any], style: str, mood: str, length: str, dream_text: str
) -> dict[str, Any]:
    client = _get_client()
    preset = STYLE_PRESETS.get(style, STYLE_PRESETS["surreal"])
    mood_preset = MOOD_PRESETS.get(mood, MOOD_PRESETS["mystic"])

    system = (
        "You are a 3D game designer translating dreams into playable Unity "
        "WebGL blueprints. The world you design must match the dream the user "
        "described — its biome, its objects, its characters, its emotional arc. "
        "You do NOT pad the blueprint with generic game tropes.\n\n"
        + FIDELITY_RULES
        + "\nReturn STRICT JSON only. No prose. No markdown fences."
    )

    user = f"""Design a playable 3D world blueprint for Unity. STRICT JSON only.

USER'S DREAM (the world is THIS place, not a generic dreamscape):
\"\"\"{dream_text}\"\"\"

STRUCTURED ANALYSIS:
{json.dumps(analysis, indent=2, ensure_ascii=False)}

CONSTRAINTS:
- Style directive: {preset['render']}
- Target length: {length} (short=5–10min loop, long=15–30min)
- Palette hint: {preset['palette']}

Rules:
- world / biome_tags MUST match analysis.setting.biome — don't substitute "forest" with "space" just because space sounds more cinematic.
- characters MUST mirror analysis.characters. If the dream has no characters, the characters array stays empty.
- interactive_elements should pick up on analysis.symbols — the items the user mentioned should be touchable things in the world.
- progression zones should reflect analysis.narrative_arc, in order.

Schema (all fields required):
{{
  "world": "forest | city | ocean | space | desert | dreamscape | liminal | ...",
  "biome_tags": ["..."],
  "time": "dawn | day | dusk | night",
  "weather": "clear | rain | snow | fog | storm | aurora",
  "mood": "{mood}",
  "goal": "explore_freely | find_object | escape | reach_destination | solve_puzzle | memory_recovery",
  "terrain": {{"type": "organic | geometric | hybrid", "elevation": "flat | medium | mountainous", "water": true|false}},
  "characters": [{{"type": "...", "role": "friendly | neutral | mysterious | hostile", "behavior": "patrol | idle | follow | flee"}}],
  "lighting": {{"ambient": 0.0-1.0, "directional": 0.0-1.0, "fog_density": 0.0-1.0, "color_temperature_k": 2000-10000}},
  "interactive_elements": [{{"id": "...", "type": "pickup | door | lore | mechanism", "description": "faithful to one of the user's symbols"}}],
  "special_effects": ["particles", "volumetric_fog", "bloom", "..."],
  "soundscape": {{"ambient": "...", "music_style": "...", "key_sfx": ["..."]}},
  "progression": [{{"zone": "...", "objective": "...", "unlocks": "..."}}]
}}"""

    def _call() -> anthropic.types.Message:
        return client.messages.create(
            model=MODEL_ID,
            max_tokens=5000,
            thinking={"type": "adaptive"},
            system=system,
            messages=[{"role": "user", "content": user}],
        )

    resp = await asyncio.to_thread(_call)
    raw = _collect_text(resp)
    try:
        blueprint = _extract_json(raw)
    except (json.JSONDecodeError, ValueError):
        blueprint = {
            "world": analysis.get("setting", {}).get("biome", "dreamscape"),
            "biome_tags": analysis.get("symbols", [])[:3],
            "time": analysis.get("setting", {}).get("time_of_day", "night"),
            "weather": analysis.get("setting", {}).get("weather", "fog"),
            "mood": mood,
            "goal": "explore_freely",
            "terrain": {"type": "organic", "elevation": "medium", "water": False},
            "characters": [{"type": c.get("role", "stranger"), "role": "mysterious", "behavior": "idle"}
                           for c in analysis.get("characters", [])[:3]],
            "lighting": {**mood_preset["lighting"], "color_temperature_k": 5500},
            "interactive_elements": [],
            "special_effects": ["volumetric_fog", "bloom"],
            "soundscape": {"ambient": mood_preset["audio"], "music_style": mood_preset["tempo"], "key_sfx": []},
            "progression": [],
        }

    blueprint.setdefault("lighting", {}).update({
        k: v for k, v in mood_preset["lighting"].items()
        if k not in blueprint.get("lighting", {})
    })
    return blueprint


@router.post("/generate", response_model=CreateJobResponse)
async def generate_dream_output(request: Request, body: CreateJobRequest) -> CreateJobResponse:
    """Create a dream job and run the 2-stage AI pipeline."""
    if not body.dream_text and not body.audio_url:
        raise HTTPException(
            status_code=400,
            detail="Either dream_text or audio_url must be provided",
        )

    job_id = uuid.uuid4()
    job_data: dict[str, Any] = {
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
    await request.app.state.redis.set(f"job:{job_id}", json.dumps(job_data), ex=86400)

    async def _persist() -> None:
        await request.app.state.redis.set(f"job:{job_id}", json.dumps(job_data), ex=86400)

    try:
        job_data["status"] = JobStatusEnum.ANALYZING.value
        job_data["progress"] = 15
        await _persist()

        final_dream_text = body.dream_text or "A mysterious dream world"
        analysis = await analyze_dream(final_dream_text, body.style.value, body.mood.value)
        job_data["analysis"] = analysis
        job_data["progress"] = 45
        await _persist()

        job_data["status"] = JobStatusEnum.GENERATING.value
        job_data["progress"] = 60
        await _persist()

        if body.output_type == OutputTypeEnum.IMAGE:
            image = await generate_image_prompt(analysis, body.style.value, body.mood.value, final_dream_text)
            job_data["result"] = {
                "output_type": "image",
                "image_url": image["placeholder_url"],
                "prompt": image["prompt"],
                "negative_prompt": image["negative_prompt"],
                "analysis": analysis,
            }
        elif body.output_type == OutputTypeEnum.VIDEO:
            video = await generate_video_storyboard(analysis, body.style.value, body.mood.value, final_dream_text)
            job_data["result"] = {
                "output_type": "video",
                "video_url": video["placeholder_url"],
                "storyboard": video["storyboard"],
                "analysis": analysis,
            }
        elif body.output_type == OutputTypeEnum.GAME:
            job_data["status"] = JobStatusEnum.BUILDING.value
            job_data["progress"] = 80
            await _persist()
            blueprint = await generate_game_blueprint(
                analysis, body.style.value, body.mood.value, body.length.value, final_dream_text
            )
            job_data["result"] = {
                "output_type": "game",
                "webgl_url": "/webgl/demo/index.html",
                "blueprint": blueprint,
                "analysis": analysis,
            }

        job_data["status"] = JobStatusEnum.READY.value
        job_data["progress"] = 100
        await _persist()
    except Exception as e:  # noqa: BLE001 — surface all failures to the job record
        job_data["status"] = JobStatusEnum.FAILED.value
        job_data["error"] = str(e)
        await _persist()

    return CreateJobResponse(job_id=job_id, status=JobStatusEnum.QUEUED)
