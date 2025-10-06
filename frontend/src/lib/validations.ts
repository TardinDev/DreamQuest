import { z } from 'zod'

export const dreamFormSchema = z.object({
  dreamText: z
    .string()
    .min(30, 'Dream description must be at least 30 characters')
    .max(2000, 'Dream description must be less than 2000 characters')
    .optional(),

  audioFile: z
    .any()
    .refine((files) => !files || files?.length === 0 || files?.[0]?.size <= 30 * 1024 * 1024, {
      message: 'Audio file must be less than 30MB',
    })
    .optional(),

  style: z.enum(['lowpoly', 'realistic', 'toon', 'surreal']),

  mood: z.enum(['calm', 'tense', 'mystic', 'nostalgic']),

  length: z.enum(['short', 'long']),
})

export type DreamFormValues = z.infer<typeof dreamFormSchema>
