'use client'

import { useDreamQuestStore } from '@/lib/store'
import { DreamFormWithSteps } from '@/components/DreamFormWithSteps'
import { JobProgress } from '@/components/JobProgress'
import { WebGLViewer } from '@/components/WebGLViewer'
import { DreamHistory } from '@/components/DreamHistory'
import { ShareButton } from '@/components/ShareButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DreamQuestPage() {
  const currentJob = useDreamQuestStore((state) => state.currentJob)
  const clearCurrentJob = useDreamQuestStore((state) => state.clearCurrentJob)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">DreamQuest</h1>
            <p className="text-muted-foreground">
              Transform your dreams into playable 3D worlds
            </p>
          </div>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {!currentJob && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Dream World</CardTitle>
                  <CardDescription>
                    Describe your dream or record it with audio, and we'll generate a
                    playable 3D world
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DreamFormWithSteps />
                </CardContent>
              </Card>
            )}

            {currentJob && currentJob.status !== 'ready' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Generating Your World</h2>
                  <Button variant="outline" onClick={clearCurrentJob}>
                    New Dream
                  </Button>
                </div>
                <JobProgress jobId={currentJob.jobId} />
              </div>
            )}

            {currentJob?.status === 'ready' && currentJob.result && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Your Dream World</h2>
                  <div className="flex gap-2">
                    <ShareButton jobId={currentJob.jobId} />
                    <Button variant="outline" onClick={clearCurrentJob}>
                      Create Another
                    </Button>
                  </div>
                </div>
                <WebGLViewer
                  webglUrl={currentJob.result.webglUrl}
                  jobId={currentJob.jobId}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>World Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="font-medium text-muted-foreground">World Type</dt>
                        <dd className="capitalize">
                          {currentJob.result.blueprint.world}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">Time</dt>
                        <dd className="capitalize">
                          {currentJob.result.blueprint.time}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">Weather</dt>
                        <dd className="capitalize">
                          {currentJob.result.blueprint.weather}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">Mood</dt>
                        <dd className="capitalize">
                          {currentJob.result.blueprint.mood}
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="font-medium text-muted-foreground">Goal</dt>
                        <dd className="capitalize">
                          {currentJob.result.blueprint.goal.replace(/_/g, ' ')}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DreamHistory />
          </div>
        </div>
      </div>
    </div>
  )
}
