'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { api, type JobResponse } from '@/lib/api'
import { useDreamQuestStore } from '@/lib/store'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Simple loading animation data (you'd use a real Lottie JSON in production)
const loadingAnimation = {
  v: '5.5.7',
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  nm: 'Loading',
  ddd: 0,
  assets: [],
  layers: [],
}

interface JobProgressProps {
  jobId: string
}

const STATUS_MESSAGES = {
  queued: 'Your dream is queued for processing...',
  analyzing: 'Analyzing your dream and extracting key elements...',
  generating: 'Generating world assets and environment...',
  building: 'Building your playable WebGL world...',
  ready: 'Your dream world is ready!',
  failed: 'Failed to generate dream world',
}

export function JobProgress({ jobId }: JobProgressProps) {
  const [job, setJob] = useState<JobResponse | null>(null)
  const updateJob = useDreamQuestStore((state) => state.updateJob)

  useEffect(() => {
    let cancelled = false

    const poll = async () => {
      try {
        for await (const update of api.pollJob(jobId)) {
          if (cancelled) break

          setJob(update)
          updateJob(jobId, update)

          if (update.status === 'ready' || update.status === 'failed') {
            break
          }
        }
      } catch (error) {
        console.error('Failed to poll job:', error)
      }
    }

    poll()

    return () => {
      cancelled = true
    }
  }, [jobId, updateJob])

  if (!job) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {job.status === 'ready' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          {job.status === 'failed' && <XCircle className="h-5 w-5 text-red-600" />}
          {job.status !== 'ready' && job.status !== 'failed' && (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}
          {STATUS_MESSAGES[job.status]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {job.status !== 'ready' && job.status !== 'failed' && (
          <>
            <div className="w-full max-w-xs mx-auto">
              <Lottie
                animationData={loadingAnimation}
                loop={true}
                style={{ width: 200, height: 200 }}
              />
            </div>
            <Progress value={job.progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              {job.progress}% complete
            </p>
          </>
        )}

        {job.status === 'failed' && job.error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{job.error}</AlertDescription>
          </Alert>
        )}

        {job.status === 'ready' && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your dream world has been generated and is ready to explore.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
