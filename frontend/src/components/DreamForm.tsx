'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mic, Loader2, Image, Video, Gamepad2 } from 'lucide-react'
import { dreamFormSchema, type DreamFormValues } from '@/lib/validations'
import { api } from '@/lib/api'
import { useDreamQuestStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function DreamForm() {
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
  } = useForm<DreamFormValues>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      outputType: 'image',
      style: 'lowpoly',
      mood: 'mystic',
      length: 'short',
    },
  })

  const dreamText = watch('dreamText')

  const handleRecordClick = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      // TODO: Implement actual recording logic with WebAudio API
      setAudioUrl('/uploads/sample-audio.mp3')
    } else {
      // Start recording
      setIsRecording(true)
      // TODO: Implement actual recording logic
    }
  }

  const onSubmit = async (data: DreamFormValues) => {
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate at least one input method
      if (!data.dreamText && !audioUrl) {
        throw new Error('Please provide either a dream description or audio recording')
      }

      // If audio is provided, transcribe first
      let finalDreamText = data.dreamText

      if (audioUrl && !finalDreamText) {
        const transcription = await api.transcribeAudio({ audioUrl })
        finalDreamText = transcription.text
      }

      // Create job
      const response = await api.createJob({
        dreamText: finalDreamText,
        audioUrl: audioUrl || undefined,
        outputType: data.outputType,
        style: data.style,
        mood: data.mood,
        length: data.length,
      })

      // Add to store (this will trigger JobProgress polling)
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="outputType">Type de sortie</Label>
        <div className="grid grid-cols-3 gap-3">
          <label className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${watch('outputType') === 'image' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
            <input
              type="radio"
              value="image"
              {...register('outputType')}
              className="sr-only"
            />
            <Image className="w-8 h-8" />
            <span className="text-sm font-medium">Image</span>
          </label>
          <label className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${watch('outputType') === 'video' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
            <input
              type="radio"
              value="video"
              {...register('outputType')}
              className="sr-only"
            />
            <Video className="w-8 h-8" />
            <span className="text-sm font-medium">Vidéo</span>
          </label>
          <label className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${watch('outputType') === 'game' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
            <input
              type="radio"
              value="game"
              {...register('outputType')}
              className="sr-only"
            />
            <Gamepad2 className="w-8 h-8" />
            <span className="text-sm font-medium">Jeu 3D</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dreamText">Décrivez votre rêve</Label>
        <Textarea
          id="dreamText"
          placeholder="Je volais au-dessus d'une forêt magique la nuit, avec des papillons lumineux qui me guidaient à travers des arbres ancestraux..."
          rows={6}
          {...register('dreamText')}
          aria-invalid={errors.dreamText ? 'true' : 'false'}
        />
        {errors.dreamText && (
          <p className="text-sm text-destructive">{errors.dreamText.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {dreamText?.length || 0} / 2000 caractères (min 30)
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
          <p className="text-sm text-green-600">Audio recorded successfully</p>
        )}
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

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {watch('outputType') === 'image' && 'Générer mon Image de Rêve'}
        {watch('outputType') === 'video' && 'Générer ma Vidéo de Rêve'}
        {watch('outputType') === 'game' && 'Générer mon Monde de Rêve'}
      </Button>
    </form>
  )
}
