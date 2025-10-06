/**
 * API client for DreamQuest backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface CreateJobPayload {
  dreamText?: string
  audioUrl?: string
  style: 'lowpoly' | 'realistic' | 'toon' | 'surreal'
  mood: 'calm' | 'tense' | 'mystic' | 'nostalgic'
  length: 'short' | 'long'
  userId?: string
}

export interface JobResponse {
  jobId: string
  status: 'queued' | 'analyzing' | 'generating' | 'building' | 'ready' | 'failed'
  progress: number
  result?: {
    webglUrl: string
    blueprint: any
  }
  error?: string
}

export interface TranscribePayload {
  audioUrl: string
}

export interface TranscribeResponse {
  text: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async createJob(payload: CreateJobPayload): Promise<{ jobId: string; status: string }> {
    return this.request('/v1/jobs', {
      method: 'POST',
      body: JSON.stringify({
        dream_text: payload.dreamText,
        audio_url: payload.audioUrl,
        style: payload.style,
        mood: payload.mood,
        length: payload.length,
        user_id: payload.userId,
      }),
    })
  }

  async getJob(jobId: string): Promise<JobResponse> {
    const response = await this.request<any>(`/v1/jobs/${jobId}`)

    return {
      jobId: response.job_id,
      status: response.status,
      progress: response.progress,
      result: response.result,
      error: response.error,
    }
  }

  async transcribeAudio(payload: TranscribePayload): Promise<TranscribeResponse> {
    return this.request('/v1/transcribe', {
      method: 'POST',
      body: JSON.stringify({
        audio_url: payload.audioUrl,
      }),
    })
  }

  /**
   * Poll job status with SSE-like pattern
   */
  async *pollJob(jobId: string, interval = 1000): AsyncGenerator<JobResponse> {
    while (true) {
      const job = await this.getJob(jobId)
      yield job

      if (job.status === 'ready' || job.status === 'failed') {
        break
      }

      await new Promise((resolve) => setTimeout(resolve, interval))
    }
  }
}

export const api = new ApiClient()
