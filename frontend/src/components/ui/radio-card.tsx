'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface RadioCardProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  selected?: boolean
  accent?: string
}

export const RadioCard = React.forwardRef<HTMLLabelElement, RadioCardProps>(
  ({ className, selected, accent = 'from-sky-400 via-fuchsia-400 to-amber-300', children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'group relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-2xl border p-4 transition-all duration-300',
        selected
          ? 'border-white/40 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_12px_32px_-12px_rgba(99,102,241,0.6)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r opacity-0 transition-opacity duration-500',
          accent,
          selected ? 'opacity-100' : 'group-hover:opacity-60',
        )}
      />
      {children}
    </label>
  ),
)
RadioCard.displayName = 'RadioCard'
