import { describe, it, expect } from 'vitest'
import { dreamFormSchema } from '@/lib/validations'

describe('dreamFormSchema', () => {
  it('should accept valid dream text', () => {
    const result = dreamFormSchema.safeParse({
      dreamText: 'I was flying over a magical forest at night.',
      style: 'lowpoly',
      mood: 'mystic',
      length: 'short',
    })

    expect(result.success).toBe(true)
  })

  it('should reject dream text that is too short', () => {
    const result = dreamFormSchema.safeParse({
      dreamText: 'Short',
      style: 'lowpoly',
      mood: 'mystic',
      length: 'short',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 30 characters')
    }
  })

  it('should reject dream text that is too long', () => {
    const longText = 'A'.repeat(2001)
    const result = dreamFormSchema.safeParse({
      dreamText: longText,
      style: 'lowpoly',
      mood: 'mystic',
      length: 'short',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('less than 2000 characters')
    }
  })

  it('should accept valid enum values', () => {
    const result = dreamFormSchema.safeParse({
      dreamText: 'I was flying over a magical forest at night.',
      style: 'realistic',
      mood: 'calm',
      length: 'long',
    })

    expect(result.success).toBe(true)
  })

  it('should reject invalid enum values', () => {
    const result = dreamFormSchema.safeParse({
      dreamText: 'I was flying over a magical forest at night.',
      style: 'invalid_style',
      mood: 'mystic',
      length: 'short',
    })

    expect(result.success).toBe(false)
  })
})
