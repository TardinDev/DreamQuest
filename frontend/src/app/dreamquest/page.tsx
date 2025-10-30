'use client'

import { useDreamQuestStore } from '@/lib/store'
import { DreamFormWithSteps } from '@/components/DreamFormWithSteps'
import { JobProgress } from '@/components/JobProgress'
import { DreamResult } from '@/components/DreamResult'
import { DreamHistory } from '@/components/DreamHistory'
import { ShareButton } from '@/components/ShareButton'
import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function DreamQuestPage() {
  const currentJob = useDreamQuestStore((state) => state.currentJob)
  const clearCurrentJob = useDreamQuestStore((state) => state.clearCurrentJob)

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 pt-24 sm:pt-28">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Créez votre Rêve</h1>
          </div>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Transformez vos rêves en créations visuelles époustouflantes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {!currentJob && (
              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-white">Créez votre Monde de Rêve</CardTitle>
                  <CardDescription className="text-white/70 text-sm sm:text-base">
                    Décrivez votre rêve et choisissez comment le visualiser : image, vidéo ou jeu 3D interactif
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DreamFormWithSteps />
                </CardContent>
              </Card>
            )}

            {currentJob && currentJob.status !== 'ready' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Génération en cours...</h2>
                  <Button
                    variant="outline"
                    onClick={clearCurrentJob}
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all"
                  >
                    Nouveau Rêve
                  </Button>
                </div>
                <JobProgress jobId={currentJob.jobId} />
              </div>
            )}

            {currentJob?.status === 'ready' && currentJob.result && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Votre Rêve est Prêt !
                  </h2>
                  <div className="flex gap-2">
                    <ShareButton jobId={currentJob.jobId} />
                    <Button
                      variant="outline"
                      onClick={clearCurrentJob}
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all"
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
