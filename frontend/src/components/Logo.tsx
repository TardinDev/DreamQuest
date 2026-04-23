'use client'

import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'full' | 'icon'
}

function Mark({ size = 'w-9 h-9' }: { size?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} transition-transform duration-300`}
    >
      <circle cx="20" cy="20" r="19" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="20" cy="20" r="12" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="20" cy="20" r="3" fill="white" />
      <path d="M20 2 L20 7" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
      <path d="M20 33 L20 38" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
      <path d="M2 20 L7 20" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
      <path d="M33 20 L38 20" stroke="white" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ className = '', variant = 'full' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <span className={className}>
        <Mark />
      </span>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className} group`}>
      <Mark />
      <span className="font-serif text-xl leading-none tracking-tight text-white">
        Dream<span className="italic text-white/70">Quest</span>
      </span>
    </div>
  )
}
