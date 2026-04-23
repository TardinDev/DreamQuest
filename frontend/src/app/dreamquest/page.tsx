'use client'

import { useDreamQuestStore } from '@/lib/store'
import { DreamFormWithSteps } from '@/components/DreamFormWithSteps'
import { JobProgress } from '@/components/JobProgress'
import { DreamResult } from '@/components/DreamResult'
import { DreamHistory } from '@/components/DreamHistory'
import { ShareButton } from '@/components/ShareButton'
import { Header } from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, Plus } from 'lucide-react'

export default function DreamQuestPage() {
  const currentJob = useDreamQuestStore((state) => state.currentJob)
  const clearCurrentJob = useDreamQuestStore((state) => state.clearCurrentJob)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <Header />

      <div className="spotlight opacity-60" aria-hidden />
      <div className="bg-noise pointer-events-none fixed inset-0" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[100svh] bg-grid bg-grid-fade opacity-40" aria-hidden />

      <div className="relative container mx-auto px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-20">
          <Badge variant="outline" className="mb-6 border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/60">
            <Sparkles className="mr-2 h-3 w-3" />
            Atelier
          </Badge>
          <h1 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Créez votre <span className="italic text-white/70">rêve.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/55 sm:text-lg">
            Trois étapes, zéro friction. Votre narration devient image, vidéo
            ou monde interactif en moins d’une minute.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="lg:col-span-8">
            {!currentJob && (
              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-10">
                <DreamFormWithSteps />
              </div>
            )}

            {currentJob && currentJob.status !== 'ready' && (
              <div className="space-y-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <h2 className="font-serif text-3xl italic text-white">
                    Interprétation en cours<span className="animate-pulse">.</span>
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={clearCurrentJob}
                    className="cursor-pointer rounded-full border border-white/10 bg-transparent px-4 text-white hover:bg-white/[0.04]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau rêve
                  </Button>
                </div>
                <JobProgress jobId={currentJob.jobId} />
              </div>
            )}

            {currentJob?.status === 'ready' && currentJob.result && (
              <div className="space-y-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <h2 className="font-serif text-3xl italic text-white">
                    Votre rêve <span className="text-white/70">rendu.</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <ShareButton jobId={currentJob.jobId} />
                    <Button
                      variant="ghost"
                      onClick={clearCurrentJob}
                      className="cursor-pointer rounded-full border border-white/10 bg-transparent px-4 text-white hover:bg-white/[0.04]"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau
                    </Button>
                  </div>
                </div>
                <DreamResult job={currentJob} />
              </div>
            )}
          </section>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm">
              <DreamHistory />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
