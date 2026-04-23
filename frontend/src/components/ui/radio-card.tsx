'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface RadioCardProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  selected?: boolean
}

export const RadioCard = React.forwardRef<HTMLLabelElement, RadioCardProps>(
  ({ className, selected, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'group relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border p-4 transition-all duration-300',
        selected
          ? 'border-white/35 bg-white/[0.05]'
          : 'border-white/8 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.035]',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  ),
)
RadioCard.displayName = 'RadioCard'
