'use client'

import { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface ShareButtonProps {
  jobId: string
  title?: string
}

export function ShareButton({ jobId, title = 'Share Your Dream World' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/dreamquest/play/${jobId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DreamQuest - My Dream World',
          text: 'Check out my dream world created with DreamQuest!',
          url: shareUrl,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to view your dream world
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input value={shareUrl} readOnly className="h-9" />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span className="sr-only">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </>
            )}
          </Button>
        </div>
        {navigator.share && (
          <Button onClick={shareNative} variant="secondary" className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share via...
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
