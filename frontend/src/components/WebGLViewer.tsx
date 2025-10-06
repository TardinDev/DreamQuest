'use client'

import { useState } from 'react'
import { RefreshCw, Share2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface WebGLViewerProps {
  webglUrl: string
  jobId: string
}

export function WebGLViewer({ webglUrl, jobId }: WebGLViewerProps) {
  const [hasError, setHasError] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  const handleReload = () => {
    setIframeKey((prev) => prev + 1)
    setHasError(false)
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/dreamquest/play/${jobId}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Dream World',
          text: 'Check out this dream world I created!',
          url: shareUrl,
        })
      } catch (error) {
        // User cancelled or error
        console.error('Share failed:', error)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        {hasError && (
          <div className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load the WebGL world. Your browser may not support WebGL or the
                content may be blocked. Try reloading or use a different browser.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="relative w-full aspect-video bg-black">
          <iframe
            key={iframeKey}
            src={webglUrl}
            className="w-full h-full border-0"
            allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking"
            allowFullScreen
            onError={() => setHasError(true)}
            title="Dream World WebGL Player"
          />
        </div>

        <div className="p-4 bg-muted/50 text-sm text-muted-foreground">
          <p>
            <strong>Controls:</strong> WASD or Arrow Keys to move • Mouse to look around •
            Spacebar to jump
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={handleReload}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reload
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}
