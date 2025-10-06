from fastapi import APIRouter, HTTPException

from schemas import TranscribeRequest, TranscribeResponse

router = APIRouter()


@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe_audio(body: TranscribeRequest) -> TranscribeResponse:
    """Transcribe audio to text (stub implementation)"""

    # TODO: Replace with actual Whisper/HuggingFace API call
    # For now, return a stub response

    if not body.audio_url:
        raise HTTPException(status_code=400, detail="audio_url is required")

    # Stub: return a fixed text for demonstration
    stub_text = (
        "I was flying over a magical forest at night. "
        "A glowing bird appeared and guided me to a floating house. "
        "Feathers were falling from the sky like rain."
    )

    return TranscribeResponse(text=stub_text)
