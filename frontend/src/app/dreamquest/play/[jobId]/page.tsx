import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WebGLViewer } from '@/components/WebGLViewer'
import { ShareButton } from '@/components/ShareButton'
import { ArrowLeft } from 'lucide-react'

interface PlayPageProps {
  params: Promise<{
    jobId: string
  }>
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { jobId } = await params

  // In production, you'd fetch the job data from the API
  // For now, we'll just render the viewer with a constructed URL

  if (!jobId) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Shared Dream World</h1>
            <p className="text-muted-foreground text-sm">
              Job ID: {jobId}
            </p>
          </div>
          <div className="flex gap-2">
            <ShareButton jobId={jobId} title="Share This Dream" />
            <Link href="/dreamquest">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Create Your Own
              </Button>
            </Link>
          </div>
        </div>

        <WebGLViewer webglUrl={`/webgl/${jobId}/index.html`} jobId={jobId} />
      </div>
    </div>
  )
}
