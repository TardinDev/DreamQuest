'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Mic,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Image as ImageIcon,
  Video as VideoIcon,
  Gamepad2 as GamepadIcon,
  Check,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { dreamFormSchema, type DreamFormValues } from '@/lib/validations'
import { api, type JobResponse } from '@/lib/api'
import { useDreamQuestStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { RadioCard } from '@/components/ui/radio-card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type OutputType = DreamFormValues['outputType']
type StyleType = DreamFormValues['style']
type MoodType = DreamFormValues['mood']
type LengthType = DreamFormValues['length']

const OUTPUTS: Array<{
  id: OutputType
  label: string
  tagline: string
  icon: typeof ImageIcon
}> = [
  { id: 'image', label: 'Image', tagline: 'Still HD 1024px', icon: ImageIcon },
  { id: 'video', label: 'Vidéo', tagline: 'Storyboard 6 plans', icon: VideoIcon },
  { id: 'game', label: 'Monde 3D', tagline: 'Unity WebGL jouable', icon: GamepadIcon },
]

const STYLES: Array<{ id: StyleType; label: string; hint: string; palette: string[] }> = [
  { id: 'lowpoly',   label: 'Low poly',  hint: 'Géométrie facettée', palette: ['#1E293B', '#38BDF8', '#F472B6'] },
  { id: 'realistic', label: 'Réaliste',  hint: 'Photoréalisme ciné',  palette: ['#0B1220', '#2563EB', '#F97316'] },
  { id: 'toon',      label: 'Cartoon',   hint: 'Cel-shading gouache', palette: ['#FFF7ED', '#F43F5E', '#8B5CF6'] },
  { id: 'surreal',   label: 'Surréel',   hint: 'Dalí · Moebius',     palette: ['#0F0A1F', '#C026D3', '#06B6D4'] },
]

const MOODS: Array<{ id: MoodType; label: string; hint: string }> = [
  { id: 'calm',       label: 'Apaisé',    hint: 'Drones ambient' },
  { id: 'tense',      label: 'Tendu',     hint: 'Cordes dissonantes' },
  { id: 'mystic',     label: 'Mystique',  hint: 'Chœurs cristallins' },
  { id: 'nostalgic',  label: 'Nostalgique', hint: 'Piano lo-fi' },
]

const LENGTHS: Array<{ id: LengthType; label: string; hint: string }> = [
  { id: 'short', label: 'Court',  hint: '5 — 10 min' },
  { id: 'long',  label: 'Étendu', hint: '15 — 30 min' },
]

const STEPS = [
  { n: 1, title: 'Le rêve', hint: 'Racontez' },
  { n: 2, title: 'L’esthétique', hint: 'Sculptez' },
  { n: 3, title: 'Le lancement', hint: 'Rendez' },
]

const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ?  60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d > 0 ? -60 :  60, opacity: 0 }),
}

export function DreamFormWithSteps() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addJob = useDreamQuestStore((state) => state.addJob)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<DreamFormValues>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      outputType: 'image',
      style: 'surreal',
      mood: 'mystic',
      length: 'short',
    },
  })

  const dreamText = watch('dreamText')
  const outputType = watch('outputType')
  const style = watch('style')
  const mood = watch('mood')
  const length = watch('length')

  const handleRecordClick = async () => {
    if (isRecording) {
      setIsRecording(false)
      setAudioUrl('/uploads/sample-audio.mp3')
    } else {
      setIsRecording(true)
    }
  }

  const nextStep = async () => {
    setDirection(1)
    if (step === 1) {
      const ok = await trigger('dreamText')
      if (ok || audioUrl) setStep(2)
    } else if (step === 2) {
      const ok = await trigger(['outputType', 'style', 'mood', 'length'])
      if (ok) setStep(3)
    }
  }

  const prevStep = () => {
    setDirection(-1)
    setStep((s) => Math.max(1, s - 1))
  }

  const onSubmit = async (data: DreamFormValues) => {
    setError(null)
    setIsSubmitting(true)
    try {
      if (!data.dreamText && !audioUrl) {
        throw new Error('Décrivez votre rêve ou enregistrez votre voix pour continuer.')
      }
      let finalDreamText = data.dreamText
      if (audioUrl && !finalDreamText) {
        const t = await api.transcribeAudio({ audioUrl })
        finalDreamText = t.text
      }
      const response = await api.createJob({
        dreamText: finalDreamText,
        audioUrl: audioUrl || undefined,
        outputType: data.outputType,
        style: data.style,
        mood: data.mood,
        length: data.length,
      })
      addJob({
        jobId: response.jobId,
        status: response.status as JobResponse['status'],
        progress: 0,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la création du rêve.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const charCount = dreamText?.length ?? 0
  const charProgress = Math.min(100, (charCount / 30) * 100)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {error && (
        <Alert variant="destructive" className="border-rose-500/30 bg-rose-950/40 backdrop-blur-sm">
          <AlertDescription className="text-rose-100">{error}</AlertDescription>
        </Alert>
      )}

      {/* Step indicator */}
      <nav aria-label="Étapes" className="flex items-center justify-between gap-2">
        {STEPS.map((s, i) => {
          const done = step > s.n
          const active = step === s.n
          return (
            <div key={s.n} className="flex flex-1 items-center gap-3">
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300',
                  done && 'border-white/30 bg-white text-black',
                  active && 'border-white/30 bg-white/[0.06] text-white',
                  !done && !active && 'border-white/8 bg-white/[0.02] text-white/35',
                )}
              >
                {done ? <Check className="h-4 w-4" /> : s.n}
              </div>
              <div className="hidden flex-col sm:flex">
                <span className={cn('text-xs uppercase tracking-[0.18em]', active ? 'text-white' : 'text-white/40')}>
                  {s.hint}
                </span>
                <span className={cn('font-serif text-lg italic', active || done ? 'text-white' : 'text-white/30')}>
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="h-px flex-1 bg-white/8" />
              )}
            </div>
          )
        })}
      </nav>

      <AnimatePresence mode="wait" custom={direction}>
        {/* ── STEP 1 ─────────────────────────────────────── */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <header className="space-y-3">
              <Badge variant="outline" className="border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.25em] text-white/60">
                01 — Le rêve
              </Badge>
              <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
                Racontez-nous votre <span className="italic text-white/70">rêve.</span>
              </h2>
              <p className="text-white/55">
                Soyez spécifique : symboles, lieux, personnages, émotions.
                L’IA interprète les détails comme un scénariste.
              </p>
            </header>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="dreamText" className="text-sm text-white/70">Description</Label>
                <span className={cn('font-mono text-xs', charCount < 30 ? 'text-white/40' : 'text-emerald-400')}>
                  {charCount} / 2000
                </span>
              </div>

              <div className="relative">
                <Textarea
                  id="dreamText"
                  placeholder="Je volais au-dessus d'une forêt phosphorescente. Un oiseau de lumière m'a guidé vers une maison flottante où le temps s'était arrêté…"
                  rows={8}
                  {...register('dreamText')}
                  aria-invalid={errors.dreamText ? 'true' : 'false'}
                  className="min-h-[200px] resize-none rounded-xl border-white/8 bg-white/[0.02] text-base leading-relaxed text-white placeholder:text-white/25 focus-visible:ring-white/20"
                />
                <div className="pointer-events-none absolute inset-x-4 bottom-3 h-0.5 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className="h-full rounded-full bg-white/60 transition-all duration-500"
                    style={{ width: `${charProgress}%` }}
                  />
                </div>
              </div>

              {errors.dreamText && (
                <p className="text-sm text-rose-400">{errors.dreamText.message}</p>
              )}
              <p className="text-xs text-white/40">Minimum 30 caractères pour une bonne interprétation.</p>
            </div>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">ou</span>
              <Separator className="flex-1" />
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-white/70">Enregistrement audio</Label>
              <Button
                type="button"
                variant="ghost"
                onClick={handleRecordClick}
                className={cn(
                  'group relative h-14 w-full cursor-pointer rounded-xl border text-base transition-all duration-300',
                  isRecording
                    ? 'border-white/40 bg-white/[0.06] text-white hover:bg-white/[0.09]'
                    : 'border-white/8 bg-white/[0.02] text-white hover:border-white/20 hover:bg-white/[0.04]',
                )}
              >
                <Mic className={cn('mr-2 h-4 w-4', isRecording && 'animate-pulse')} />
                {isRecording ? 'Arrêter l’enregistrement' : 'Démarrer l’enregistrement'}
              </Button>
              {audioUrl && (
                <p className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="h-4 w-4" /> Audio enregistré avec succès
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={nextStep}
              size="lg"
              disabled={(!dreamText || dreamText.length < 30) && !audioUrl}
              className="group h-14 w-full cursor-pointer rounded-xl bg-white text-base font-semibold text-black transition-all duration-300 hover:bg-white/90 disabled:opacity-40"
            >
              Continuer vers l’esthétique
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}

        {/* ── STEP 2 ─────────────────────────────────────── */}
        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <header className="space-y-3">
              <Badge variant="outline" className="border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.25em] text-white/60">
                02 — L’esthétique
              </Badge>
              <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
                Sculptez l’<span className="italic text-white/70">atmosphère.</span>
              </h2>
              <p className="text-white/55">
                Chaque choix pilote l’éclairage, la palette et le tempo du rendu final.
              </p>
            </header>

            {/* Output type */}
            <fieldset className="space-y-3">
              <legend className="text-xs uppercase tracking-[0.25em] text-white/45">Format de sortie</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {OUTPUTS.map((o) => {
                  const Icon = o.icon
                  const selected = outputType === o.id
                  return (
                    <RadioCard key={o.id} selected={selected} onClick={() => setValue('outputType', o.id)}>
                      <input type="radio" value={o.id} {...register('outputType')} className="sr-only" />
                      <Icon className={cn('h-6 w-6 transition-colors', selected ? 'text-white' : 'text-white/55')} />
                      <div className="mt-2">
                        <div className="font-serif text-2xl text-white">{o.label}</div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">{o.tagline}</div>
                      </div>
                    </RadioCard>
                  )
                })}
              </div>
            </fieldset>

            {/* Visual Style */}
            <fieldset className="space-y-3">
              <legend className="text-xs uppercase tracking-[0.25em] text-white/45">Style visuel</legend>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {STYLES.map((s) => {
                  const selected = style === s.id
                  return (
                    <RadioCard key={s.id} selected={selected} onClick={() => setValue('style', s.id)}>
                      <input type="radio" value={s.id} {...register('style')} className="sr-only" />
                      <div className="font-serif text-xl text-white">{s.label}</div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">{s.hint}</div>
                      <div className="mt-3 flex gap-1">
                        {s.palette.map((c) => (
                          <span
                            key={c}
                            className="h-3 w-5 rounded-full ring-1 ring-white/10"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </RadioCard>
                  )
                })}
              </div>
            </fieldset>

            {/* Mood */}
            <fieldset className="space-y-3">
              <legend className="text-xs uppercase tracking-[0.25em] text-white/45">Humeur</legend>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {MOODS.map((m) => {
                  const selected = mood === m.id
                  return (
                    <RadioCard key={m.id} selected={selected} onClick={() => setValue('mood', m.id)}>
                      <input type="radio" value={m.id} {...register('mood')} className="sr-only" />
                      <div className="relative z-10">
                        <div className="font-serif text-xl text-white">{m.label}</div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">{m.hint}</div>
                      </div>
                    </RadioCard>
                  )
                })}
              </div>
            </fieldset>

            {/* Length */}
            <fieldset className="space-y-3">
              <legend className="text-xs uppercase tracking-[0.25em] text-white/45">Durée</legend>
              <div className="grid grid-cols-2 gap-3">
                {LENGTHS.map((l) => {
                  const selected = length === l.id
                  return (
                    <RadioCard key={l.id} selected={selected} onClick={() => setValue('length', l.id)}>
                      <input type="radio" value={l.id} {...register('length')} className="sr-only" />
                      <div className="font-serif text-xl text-white">{l.label}</div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">{l.hint}</div>
                    </RadioCard>
                  )
                })}
              </div>
            </fieldset>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                size="lg"
                variant="ghost"
                className="h-14 flex-1 cursor-pointer rounded-xl border border-white/8 bg-white/[0.02] text-white hover:bg-white/[0.04]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                size="lg"
                className="group h-14 flex-[2] cursor-pointer rounded-xl bg-white text-base font-semibold text-black hover:bg-white/90"
              >
                Revoir avant rendu
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3 ─────────────────────────────────────── */}
        {step === 3 && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <header className="space-y-3">
              <Badge variant="outline" className="border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.25em] text-white/60">
                03 — Le lancement
              </Badge>
              <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
                Prêt à <span className="italic text-white/70">rêver ?</span>
              </h2>
            </header>

            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-8">
              <div className="hidden" aria-hidden />
              <div className="relative space-y-6">
                <div>
                  <div className="mb-2 text-xs uppercase tracking-[0.25em] text-white/45">Votre rêve</div>
                  <p className="font-serif text-xl leading-relaxed text-white/90 sm:text-2xl">
                    « {dreamText?.slice(0, 220) || 'Audio enregistré'}{dreamText && dreamText.length > 220 ? '…' : ''} »
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <SummaryChip label="Format" value={outputType} />
                  <SummaryChip label="Style" value={style} />
                  <SummaryChip label="Humeur" value={mood} />
                  <SummaryChip label="Durée" value={length} />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                size="lg"
                variant="ghost"
                className="h-14 flex-1 cursor-pointer rounded-xl border border-white/8 bg-white/[0.02] text-white hover:bg-white/[0.04]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Modifier
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group relative h-14 flex-[2] cursor-pointer overflow-hidden rounded-xl bg-white text-base font-semibold text-black transition-all duration-300 hover:bg-white/90"
              >
                <span className="relative z-10 inline-flex items-center">
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  )}
                  {isSubmitting ? 'Génération en cours…' : 'Générer le rêve'}
                </span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</div>
      <div className="font-serif text-lg capitalize text-white">{value}</div>
    </div>
  )
}
