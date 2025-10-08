'use client'

import { useDreamQuestStore } from '@/lib/store'
import { DreamFormWithSteps } from '@/components/DreamFormWithSteps'
import { JobProgress } from '@/components/JobProgress'
import { DreamResult } from '@/components/DreamResult'
import { DreamHistory } from '@/components/DreamHistory'
import { ShareButton } from '@/components/ShareButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function DreamQuestPage() {
  const currentJob = useDreamQuestStore((state) => state.currentJob)
  const clearCurrentJob = useDreamQuestStore((state) => state.clearCurrentJob)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white">DreamQuest</h1>
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-blue-200">
              Transformez vos rêves en créations visuelles
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Accueil
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {!currentJob && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Créez votre Monde de Rêve</CardTitle>
                  <CardDescription className="text-blue-200">
                    Décrivez votre rêve et choisissez comment le visualiser : image, vidéo ou jeu 3D interactif
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
                  <h2 className="text-2xl font-semibold text-white">Génération en cours...</h2>
                  <Button
                    variant="outline"
                    onClick={clearCurrentJob}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Nouveau Rêve
                  </Button>
                </div>
                <JobProgress jobId={currentJob.jobId} />
              </div>
            )}

            {currentJob?.status === 'ready' && currentJob.result && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-white">Votre Rêve est Prêt !</h2>
                  <div className="flex gap-2">
                    <ShareButton jobId={currentJob.jobId} />
                    <Button
                      variant="outline"
                      onClick={clearCurrentJob}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Créer un Autre
                    </Button>
                  </div>
                </div>
                <DreamResult job={currentJob} />
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
