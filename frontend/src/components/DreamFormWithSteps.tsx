'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mic, Loader2, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { dreamFormSchema, type DreamFormValues } from '@/lib/validations'
import { api } from '@/lib/api'
import { useDreamQuestStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'

const stylePreviewImages = {
  lowpoly: '🔷',
  realistic: '🌄',
  toon: '🎨',
  surreal: '🌀',
}

const moodPreviewColors = {
  calm: 'from-blue-500/20 to-purple-500/20',
  tense: 'from-red-500/20 to-orange-500/20',
  mystic: 'from-purple-500/20 to-pink-500/20',
  nostalgic: 'from-amber-500/20 to-yellow-500/20',
}

export function DreamFormWithSteps() {
  const [step, setStep] = useState(1)
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
  } = useForm<DreamFormValues>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      style: 'lowpoly',
      mood: 'mystic',
      length: 'short',
    },
  })

  const dreamText = watch('dreamText')
  const selectedStyle = watch('style')
  const selectedMood = watch('mood')

  const handleRecordClick = async () => {
    if (isRecording) {
      setIsRecording(false)
      setAudioUrl('/uploads/sample-audio.mp3')
    } else {
      setIsRecording(true)
    }
  }

  const nextStep = async () => {
    let valid = false
    if (step === 1) {
      valid = await trigger('dreamText')
      if (valid || audioUrl) {
        setStep(2)
      }
    } else if (step === 2) {
      valid = await trigger(['style', 'mood', 'length'])
      if (valid) {
        setStep(3)
      }
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  const onSubmit = async (data: DreamFormValues) => {
    setError(null)
    setIsSubmitting(true)

    try {
      if (!data.dreamText && !audioUrl) {
        throw new Error('Please provide either a dream description or audio recording')
      }

      let finalDreamText = data.dreamText

      if (audioUrl && !finalDreamText) {
        const transcription = await api.transcribeAudio({ audioUrl })
        finalDreamText = transcription.text
      }

      const response = await api.createJob({
        dreamText: finalDreamText,
        audioUrl: audioUrl || undefined,
        style: data.style,
        mood: data.mood,
        length: data.length,
      })

      addJob({
        jobId: response.jobId,
        status: response.status as any,
        progress: 0,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create dream world')
    } finally {
      setIsSubmitting(false)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? 'w-12 bg-primary' : i < step ? 'w-8 bg-primary/50' : 'w-8 bg-border'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={step}>
        {/* Step 1: Dream Input */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Share Your Dream</h2>
              <p className="text-muted-foreground">Describe it in words or record your voice</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dreamText">Describe your dream</Label>
              <Textarea
                id="dreamText"
                placeholder="I was flying over a magical forest at night, with glowing butterflies guiding my way..."
                rows={8}
                {...register('dreamText')}
                aria-invalid={errors.dreamText ? 'true' : 'false'}
              />
              {errors.dreamText && (
                <p className="text-sm text-destructive">{errors.dreamText.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {dreamText?.length || 0} / 2000 characters (min 30)
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-2">
              <Label>Record audio</Label>
              <Button
                type="button"
                variant={isRecording ? 'destructive' : 'outline'}
                onClick={handleRecordClick}
                className="w-full"
              >
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              {audioUrl && (
                <p className="text-sm text-green-600">✓ Audio recorded successfully</p>
              )}
            </div>

            <Button
              type="button"
              onClick={nextStep}
              size="lg"
              className="w-full"
              disabled={!dreamText && !audioUrl}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Style Selection with Preview */}
        {step === 2 && (
          <motion.div
            key="step2"
            custom={2}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Choose Your Style</h2>
              <p className="text-muted-foreground">Customize the look and feel of your world</p>
            </div>

            {/* Interactive Style Preview */}
            <div
              className={`relative h-40 rounded-lg bg-gradient-to-br ${moodPreviewColors[selectedMood]} border border-border transition-all duration-500 flex items-center justify-center overflow-hidden`}
            >
              <motion.div
                key={selectedStyle}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-6xl"
              >
                {stylePreviewImages[selectedStyle]}
              </motion.div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
                  <span className="font-semibold capitalize">{selectedStyle}</span> ·{' '}
                  <span className="capitalize">{selectedMood}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="style">Visual Style</Label>
                <Select id="style" {...register('style')}>
                  <option value="lowpoly">Low Poly</option>
                  <option value="realistic">Realistic</option>
                  <option value="toon">Cartoon</option>
                  <option value="surreal">Surreal</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Mood</Label>
                <Select id="mood" {...register('mood')}>
                  <option value="calm">Calm</option>
                  <option value="tense">Tense</option>
                  <option value="mystic">Mystic</option>
                  <option value="nostalgic">Nostalgic</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Duration</Label>
                <Select id="length" {...register('length')}>
                  <option value="short">Short (5-10 min)</option>
                  <option value="long">Long (15-30 min)</option>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" onClick={prevStep} variant="outline" size="lg" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="button" onClick={nextStep} size="lg" className="flex-1">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <motion.div
            key="step3"
            custom={3}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Ready to Dream?</h2>
              <p className="text-muted-foreground">Review your settings and launch</p>
            </div>

            <div className="space-y-4 p-6 rounded-lg border border-border bg-card/50">
              <div>
                <h3 className="font-semibold mb-2">Your Dream:</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {dreamText || 'Audio recording provided'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {selectedStyle}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {selectedMood}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {watch('length')}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" onClick={prevStep} variant="outline" size="lg" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate My Dream World
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
