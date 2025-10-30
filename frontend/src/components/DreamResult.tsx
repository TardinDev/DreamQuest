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
        <Card className="overflow-hidden bg-black border-blue-500/20">
          <div className="relative aspect-square w-full bg-black/20">
            <Image
              src={result.imageUrl}
              alt="Visualisation du rêve"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 600px"
              unoptimized
            />
          </div>
          <div className="p-6 space-y-4 bg-gradient-to-t from-black/40 to-transparent">
            <h3 className="text-2xl font-bold text-white">Votre Rêve Visualisé</h3>
            {result.prompt && (
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-sm text-white/80 leading-relaxed">{result.prompt}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Video Output */}
      {outputType === 'video' && result.videoUrl && (
        <Card className="overflow-hidden bg-black border-blue-500/20">
          <div className="relative aspect-video w-full bg-black/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <p className="text-white/80">Vidéo de rêve générée</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4 bg-gradient-to-t from-black/40 to-transparent">
            <h3 className="text-2xl font-bold text-white">Votre Rêve en Mouvement</h3>
            {result.storyboard && (
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 max-h-64 overflow-y-auto">
                <h4 className="font-semibold text-white mb-2">Storyboard</h4>
                <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{result.storyboard}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Eye className="mr-2 h-4 w-4" />
                Regarder
              </Button>
              <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Game Output */}
      {outputType === 'game' && result.webglUrl && (
        <Card className="overflow-hidden bg-black border-green-500/20">
          <div className="relative aspect-video w-full bg-black/20">
            {isFullscreen ? (
              <div className="fixed inset-0 z-50 bg-black">
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 z-10 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm"
                >
                  Quitter le plein écran
                </button>
                <WebGLViewer url={result.webglUrl} />
              </div>
            ) : (
              <WebGLViewer url={result.webglUrl} />
            )}
          </div>
          <div className="p-6 space-y-4 bg-gradient-to-t from-black/40 to-transparent">
            <h3 className="text-2xl font-bold text-white">Votre Monde de Rêve Interactif</h3>
            {result.blueprint && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-xs text-white/60 uppercase">Monde</p>
                  <p className="text-sm font-semibold text-white">{result.blueprint.world}</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-xs text-white/60 uppercase">Moment</p>
                  <p className="text-sm font-semibold text-white">{result.blueprint.time}</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-xs text-white/60 uppercase">Météo</p>
                  <p className="text-sm font-semibold text-white">{result.blueprint.weather}</p>
                </div>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-xs text-white/60 uppercase">Ambiance</p>
                  <p className="text-sm font-semibold text-white">{result.blueprint.mood}</p>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => setIsFullscreen(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Plein Écran
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
