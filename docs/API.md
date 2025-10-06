# 📡 DreamQuest API Documentation

Base URL: `https://api.dreamquest.example.com` (production)
Local: `http://localhost:8000`

## Authentication

Currently, authentication is optional. Future versions will require JWT tokens for authenticated users.

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (optional, for authenticated users)
```

## Rate Limits

- **Anonymous users:** 3 concurrent jobs
- **Authenticated users:** 10 concurrent jobs

Exceeding limits returns `429 Too Many Requests`.

---

## Endpoints

### 1. Create Job

**POST** `/v1/jobs`

Create a new dream-to-world generation job.

#### Request Body

```json
{
  "dream_text": "I was flying over a magical forest at night...",
  "audio_url": null,
  "style": "lowpoly",
  "mood": "mystic",
  "length": "short",
  "user_id": null
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dream_text` | string | * | Dream description (30-2000 chars) |
| `audio_url` | string | * | URL to audio file (max 30 MB) |
| `style` | enum | ✓ | Visual style: `lowpoly`, `realistic`, `toon`, `surreal` |
| `mood` | enum | ✓ | Emotional mood: `calm`, `tense`, `mystic`, `nostalgic` |
| `length` | enum | ✓ | Duration: `short`, `long` |
| `user_id` | string | ✗ | User identifier (for authenticated users) |

\* At least one of `dream_text` or `audio_url` must be provided.

#### Response

**200 OK**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "queued"
}
```

**400 Bad Request**
```json
{
  "detail": "Either dream_text or audio_url must be provided"
}
```

**422 Unprocessable Entity**
```json
{
  "detail": [
    {
      "loc": ["body", "dream_text"],
      "msg": "String should have at least 30 characters",
      "type": "string_too_short"
    }
  ]
}
```

---

### 2. Get Job Status

**GET** `/v1/jobs/{job_id}`

Get the current status and result of a job.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `job_id` | UUID | Job identifier |

#### Response

**200 OK - Queued/In Progress**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "analyzing",
  "progress": 25,
  "result": null,
  "error": null
}
```

**200 OK - Ready**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "ready",
  "progress": 100,
  "result": {
    "webgl_url": "/webgl/550e8400-e29b-41d4-a716-446655440000/index.html",
    "blueprint": {
      "world": "forest",
      "time": "night",
      "weather": "feathers_rain",
      "goal": "follow_bird_to_flying_house",
      "characters": [
        {
          "type": "bird",
          "role": "guide"
        },
        {
          "type": "house",
          "float": true
        }
      ],
      "style": "lowpoly",
      "mood": "mystic"
    }
  },
  "error": null
}
```

**200 OK - Failed**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "failed",
  "progress": 0,
  "result": null,
  "error": "Failed to parse dream blueprint: Invalid JSON"
}
```

**404 Not Found**
```json
{
  "detail": "Job not found"
}
```

#### Job Status Values

| Status | Description | Progress |
|--------|-------------|----------|
| `queued` | Job is queued for processing | 0% |
| `analyzing` | Parsing dream with LLM | 25% |
| `generating` | Generating assets | 50% |
| `building` | Building WebGL world | 75% |
| `ready` | World is ready to play | 100% |
| `failed` | Job failed (see `error` field) | 0% |

---

### 3. Get Job Blueprint

**GET** `/v1/jobs/{job_id}/blueprint`

Get the JSON blueprint for a completed job. Used by Unity WebGL to load world data.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `job_id` | UUID | Job identifier |

#### Response

**200 OK**
```json
{
  "world": "forest",
  "time": "night",
  "weather": "feathers_rain",
  "goal": "follow_bird_to_flying_house",
  "characters": [
    {
      "type": "bird",
      "role": "guide"
    },
    {
      "type": "house",
      "float": true
    }
  ],
  "style": "lowpoly",
  "mood": "mystic"
}
```

**400 Bad Request**
```json
{
  "detail": "Job not ready"
}
```

**404 Not Found**
```json
{
  "detail": "Blueprint not found"
}
```

---

### 4. Transcribe Audio

**POST** `/v1/transcribe`

Transcribe audio to text. (Stub implementation - returns mock data)

#### Request Body

```json
{
  "audio_url": "https://example.com/dream-recording.mp3"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `audio_url` | string | ✓ | URL to audio file |

#### Response

**200 OK**
```json
{
  "text": "I was flying over a magical forest at night. A glowing bird appeared and guided me to a floating house. Feathers were falling from the sky like rain."
}
```

**400 Bad Request**
```json
{
  "detail": "audio_url is required"
}
```

---

### 5. Health Check

**GET** `/health`

Check if the API is healthy.

#### Response

**200 OK**
```json
{
  "status": "healthy"
}
```

---

## Blueprint Schema

The blueprint JSON is the contract between the worker and Unity.

```typescript
interface Blueprint {
  world: string;           // "forest" | "city" | "ocean" | "desert" | "space"
  time: string;            // "night" | "day" | "sunset" | "dawn"
  weather: string;         // "clear" | "feathers_rain" | "rain" | "fog" | "storm"
  goal: string;            // "explore_world" | "follow_bird_to_flying_house" | etc.
  characters: Character[];
  style: string;           // "lowpoly" | "realistic" | "toon" | "surreal"
  mood: string;            // "calm" | "tense" | "mystic" | "nostalgic"
}

interface Character {
  type: string;            // "bird" | "tree" | "house" | "person"
  role?: string;           // "guide" | "mysterious" | etc.
  float?: boolean;         // Whether object floats
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 404 | Resource not found |
| 422 | Unprocessable Entity (Pydantic validation) |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

---

## Example Usage

### JavaScript/TypeScript

```typescript
// Create a job
const response = await fetch('http://localhost:8000/v1/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dream_text: 'I was flying over a forest...',
    style: 'lowpoly',
    mood: 'mystic',
    length: 'short'
  })
});

const { job_id } = await response.json();

// Poll for status
const poll = setInterval(async () => {
  const job = await fetch(`http://localhost:8000/v1/jobs/${job_id}`).then(r => r.json());

  console.log(`Status: ${job.status}, Progress: ${job.progress}%`);

  if (job.status === 'ready') {
    console.log('WebGL URL:', job.result.webgl_url);
    clearInterval(poll);
  }

  if (job.status === 'failed') {
    console.error('Error:', job.error);
    clearInterval(poll);
  }
}, 1000);
```

### Python

```python
import requests
import time

# Create job
response = requests.post('http://localhost:8000/v1/jobs', json={
    'dream_text': 'I was flying over a forest...',
    'style': 'lowpoly',
    'mood': 'mystic',
    'length': 'short'
})

job_id = response.json()['job_id']

# Poll for status
while True:
    job = requests.get(f'http://localhost:8000/v1/jobs/{job_id}').json()

    print(f"Status: {job['status']}, Progress: {job['progress']}%")

    if job['status'] == 'ready':
        print(f"WebGL URL: {job['result']['webgl_url']}")
        break

    if job['status'] == 'failed':
        print(f"Error: {job['error']}")
        break

    time.sleep(1)
```

### cURL

```bash
# Create job
curl -X POST http://localhost:8000/v1/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "dream_text": "I was flying over a forest...",
    "style": "lowpoly",
    "mood": "mystic",
    "length": "short"
  }'

# Get job status
curl http://localhost:8000/v1/jobs/550e8400-e29b-41d4-a716-446655440000

# Get blueprint
curl http://localhost:8000/v1/jobs/550e8400-e29b-41d4-a716-446655440000/blueprint
```

---

## Interactive Documentation

FastAPI provides auto-generated interactive API documentation:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

**Last Updated:** 2025-01-06
