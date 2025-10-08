/**
 * API client for DreamQuest backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface CreateJobPayload {
  dreamText?: string
  audioUrl?: string
  outputType: 'image' | 'video' | 'game'
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
    outputType: 'image' | 'video' | 'game'
    imageUrl?: string
    videoUrl?: string
    webglUrl?: string
    blueprint?: any
    prompt?: string
    storyboard?: string
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
  private useMock: boolean

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    // Use mock mode if API_URL is not set or backend is not available
    this.useMock = !process.env.NEXT_PUBLIC_API_URL
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
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
    } catch (error) {
      // If fetch fails, automatically switch to mock mode
      console.warn('API unavailable, using mock data')
      this.useMock = true
      throw error
    }
  }

  async createJob(payload: CreateJobPayload): Promise<{ jobId: string; status: string }> {
    // Mock mode: simulate job creation
    if (this.useMock) {
      const mockJobId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      return {
        jobId: mockJobId,
        status: 'queued',
      }
    }

    try {
      return await this.request('/v1/generate', {
        method: 'POST',
        body: JSON.stringify({
          dream_text: payload.dreamText,
          audio_url: payload.audioUrl,
          output_type: payload.outputType,
          style: payload.style,
          mood: payload.mood,
          length: payload.length,
          user_id: payload.userId,
        }),
      })
    } catch (error) {
      // Fallback to mock
      const mockJobId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      return {
        jobId: mockJobId,
        status: 'queued',
      }
    }
  }

  async getJob(jobId: string): Promise<JobResponse> {
    // Mock mode: simulate progressive job updates
    if (this.useMock || jobId.startsWith('mock-')) {
      return this.getMockJobStatus(jobId)
    }

    try {
      const response = await this.request<any>(`/v1/jobs/${jobId}`)

      return {
        jobId: response.job_id,
        status: response.status,
        progress: response.progress,
        result: response.result,
        error: response.error,
      }
    } catch (error) {
      // Fallback to mock
      return this.getMockJobStatus(jobId)
    }
  }

  private mockJobData: Map<string, { startTime: number; progress: number }> = new Map()

  private getMockJobStatus(jobId: string): JobResponse {
    // Initialize job data if not exists
    if (!this.mockJobData.has(jobId)) {
      this.mockJobData.set(jobId, { startTime: Date.now(), progress: 0 })
    }

    const jobData = this.mockJobData.get(jobId)!
    const elapsed = Date.now() - jobData.startTime

    // Simulate progression over 8 seconds
    let status: JobResponse['status'] = 'queued'
    let progress = 0

    if (elapsed < 2000) {
      status = 'analyzing'
      progress = Math.min(25, (elapsed / 2000) * 25)
    } else if (elapsed < 4000) {
      status = 'generating'
      progress = 25 + Math.min(25, ((elapsed - 2000) / 2000) * 25)
    } else if (elapsed < 6000) {
      status = 'building'
      progress = 50 + Math.min(25, ((elapsed - 4000) / 2000) * 25)
    } else if (elapsed < 8000) {
      status = 'building'
      progress = 75 + Math.min(25, ((elapsed - 6000) / 2000) * 25)
    } else {
      status = 'ready'
      progress = 100
    }

    // Update stored progress
    jobData.progress = progress

    const response: JobResponse = {
      jobId,
      status,
      progress: Math.round(progress),
    }

    if (status === 'ready') {
      // Mock different output types based on jobId hash
      const outputTypes: Array<'image' | 'video' | 'game'> = ['image', 'video', 'game']
      const outputType = outputTypes[Math.abs(jobId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 3]

      response.result = {
        outputType,
        imageUrl: outputType === 'image' ? 'https://placehold.co/1024x1024/1a1a2e/white?text=Dream+Image' : undefined,
        videoUrl: outputType === 'video' ? 'https://placehold.co/1920x1080/1a1a2e/white?text=Dream+Video' : undefined,
        webglUrl: outputType === 'game' ? '/webgl/demo/index.html' : undefined,
        blueprint: outputType === 'game' ? {
          world: 'forest',
          time: 'night',
          weather: 'clear',
          mood: 'mystic',
          goal: 'explore_freely',
          terrain: { type: 'organic', elevation: 'medium' },
          characters: [{ type: 'guide', role: 'friendly' }],
          lighting: { ambient: 0.3, directional: 0.7 },
        } : undefined,
      }
    }

    return response
  }

  async transcribeAudio(payload: TranscribePayload): Promise<TranscribeResponse> {
    // Mock mode: return sample transcription
    if (this.useMock) {
      return {
        text: 'I was flying over a magical forest at night, with glowing butterflies guiding my way through ancient trees.',
      }
    }

    try {
      return await this.request('/v1/transcribe', {
        method: 'POST',
        body: JSON.stringify({
          audio_url: payload.audioUrl,
        }),
      })
    } catch (error) {
      // Fallback to mock
      return {
        text: 'I was flying over a magical forest at night, with glowing butterflies guiding my way through ancient trees.',
      }
    }
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
