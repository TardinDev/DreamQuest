'use client'

import { useState } from 'react'
import Image from 'next/image'
import { JobResponse } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Share2, Eye, Play } from 'lucide-react'
import { WebGLViewer } from './WebGLViewer'

interface DreamResultProps {
  job: JobResponse
}

function blueprintField(bp: Record<string, unknown> | undefined, key: string): string {
  if (!bp) return '—'
  const v = bp[key]
  return typeof v === 'string' || typeof v === 'number' ? String(v) : '—'
}

export function DreamResult({ job }: DreamResultProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!job.result) {
    return null
  }

  const { result } = job
  const { outputType } = result

  return (
    <div className="space-y-6">
      {/* Image Output */}
      {outputType === 'image' && result.imageUrl && (
        <Card className="overflow-hidden border-white/8 bg-white/[0.02]">
          <div className="relative aspect-square w-full bg-black/40">
            <Image
              src={result.imageUrl}
              alt="Visualisation du rêve"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 600px"
              unoptimized
            />
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-serif text-2xl text-white">Votre rêve, visualisé</h3>
            {result.prompt && (
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/8">
                <p className="text-sm text-white/70 leading-relaxed">{result.prompt}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button className="flex-1 rounded-full bg-white text-black hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button variant="outline" className="flex-1 rounded-full border-white/10 bg-transparent text-white hover:bg-white/[0.04]">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Video Output */}
      {outputType === 'video' && result.videoUrl && (
        <Card className="overflow-hidden border-white/8 bg-white/[0.02]">
          <div className="relative aspect-video w-full bg-black/40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/[0.06] border border-white/15 rounded-full flex items-center justify-center">
                  <Play className="w-7 h-7 text-white ml-1" />
                </div>
                <p className="text-white/70 text-sm uppercase tracking-[0.2em]">Vidéo de rêve générée</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-serif text-2xl text-white">Votre rêve en mouvement</h3>
            {result.storyboard && (
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/8 max-h-64 overflow-y-auto">
                <h4 className="font-medium text-white mb-2 text-xs uppercase tracking-[0.2em] text-white/55">Storyboard</h4>
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{result.storyboard}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button className="flex-1 rounded-full bg-white text-black hover:bg-white/90">
                <Eye className="mr-2 h-4 w-4" />
                Regarder
              </Button>
              <Button variant="outline" className="flex-1 rounded-full border-white/10 bg-transparent text-white hover:bg-white/[0.04]">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-white hover:bg-white/[0.04]">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Game Output */}
      {outputType === 'game' && result.webglUrl && (
        <Card className="overflow-hidden border-white/8 bg-white/[0.02]">
          <div className="relative aspect-video w-full bg-black/40">
            {isFullscreen ? (
              <div className="fixed inset-0 z-50 bg-black">
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 z-10 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm backdrop-blur-sm border border-white/10"
                >
                  Quitter le plein écran
                </button>
                <WebGLViewer webglUrl={result.webglUrl} jobId={job.jobId} />
              </div>
            ) : (
              <WebGLViewer webglUrl={result.webglUrl} jobId={job.jobId} />
            )}
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-serif text-2xl text-white">Votre monde de rêve interactif</h3>
            {result.blueprint && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/8">
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Monde</p>
                  <p className="text-sm font-medium text-white capitalize">{blueprintField(result.blueprint, 'world')}</p>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/8">
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Moment</p>
                  <p className="text-sm font-medium text-white capitalize">{blueprintField(result.blueprint, 'time')}</p>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/8">
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Météo</p>
                  <p className="text-sm font-medium text-white capitalize">{blueprintField(result.blueprint, 'weather')}</p>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/8">
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Ambiance</p>
                  <p className="text-sm font-medium text-white capitalize">{blueprintField(result.blueprint, 'mood')}</p>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                className="flex-1 rounded-full bg-white text-black hover:bg-white/90"
                onClick={() => setIsFullscreen(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Plein écran
              </Button>
              <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-white hover:bg-white/[0.04]">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
