'use client'

import { useDreamQuestStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const STATUS_COLORS = {
  queued: 'bg-gray-500',
  analyzing: 'bg-blue-500',
  generating: 'bg-purple-500',
  building: 'bg-orange-500',
  ready: 'bg-green-500',
  failed: 'bg-red-500',
} as const

export function DreamHistory() {
  const jobs = useDreamQuestStore((state) => state.jobs)
  const setCurrentJobId = useDreamQuestStore((state) => state.setCurrentJobId)

  if (jobs.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Dreams</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {jobs.map((job) => (
              <button
                key={job.jobId}
                onClick={() => setCurrentJobId(job.jobId)}
                className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Dream {job.jobId.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {job.status === 'ready' && job.result?.blueprint
                        ? `${job.result.blueprint.world} - ${job.result.blueprint.mood}`
                        : 'Processing...'}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={STATUS_COLORS[job.status]}
                  >
                    {job.status}
                  </Badge>
                </div>
                {job.status !== 'ready' && job.status !== 'failed' && (
                  <div className="mt-2">
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
