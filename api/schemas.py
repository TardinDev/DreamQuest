from enum import Enum
from typing import Any, Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator


class StyleEnum(str, Enum):
    LOWPOLY = "lowpoly"
    REALISTIC = "realistic"
    TOON = "toon"
    SURREAL = "surreal"


class MoodEnum(str, Enum):
    CALM = "calm"
    TENSE = "tense"
    MYSTIC = "mystic"
    NOSTALGIC = "nostalgic"


class LengthEnum(str, Enum):
    SHORT = "short"
    LONG = "long"


class OutputTypeEnum(str, Enum):
    IMAGE = "image"
    VIDEO = "video"
    GAME = "game"


class JobStatusEnum(str, Enum):
    QUEUED = "queued"
    ANALYZING = "analyzing"
    GENERATING = "generating"
    BUILDING = "building"
    READY = "ready"
    FAILED = "failed"


class CreateJobRequest(BaseModel):
    dream_text: Optional[str] = Field(None, min_length=30, max_length=2000)
    audio_url: Optional[str] = None
    output_type: OutputTypeEnum = Field(..., description="Type of output: image, video, or game")
    style: StyleEnum = Field(..., description="Visual style of the world")
    mood: MoodEnum = Field(..., description="Emotional mood of the world")
    length: LengthEnum = Field(..., description="Duration of the experience")
    user_id: Optional[str] = None

    @field_validator("dream_text", "audio_url")
    @classmethod
    def validate_dream_input(cls, v: Optional[str], info: Any) -> Optional[str]:
        # At least one of dream_text or audio_url must be provided
        return v


class CreateJobResponse(BaseModel):
    job_id: UUID
    status: JobStatusEnum


class BlueprintCharacter(BaseModel):
    type: str
    role: Optional[str] = None
    float: Optional[bool] = None


class Blueprint(BaseModel):
    world: str
    time: str
    weather: str
    goal: str
    characters: list[BlueprintCharacter]
    style: str
    mood: str


class JobResult(BaseModel):
    output_type: OutputTypeEnum
    webgl_url: Optional[str] = None  # For game output
    image_url: Optional[str] = None  # For image output
    video_url: Optional[str] = None  # For video output
    blueprint: Optional[Blueprint] = None  # For game output


class GetJobResponse(BaseModel):
    job_id: UUID
    status: JobStatusEnum
    progress: int = Field(ge=0, le=100)
    result: Optional[JobResult] = None
    error: Optional[str] = None


class TranscribeRequest(BaseModel):
    audio_url: str


class TranscribeResponse(BaseModel):
    text: str


class ErrorResponse(BaseModel):
    detail: str
