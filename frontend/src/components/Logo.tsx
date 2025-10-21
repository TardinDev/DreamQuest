'use client'

import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'full' | 'icon'
}

export function Logo({ className = '', variant = 'full' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} transition-transform duration-300 hover:rotate-12`}
      >
        {/* Outer glow effect */}
        <circle cx="32" cy="32" r="30" fill="url(#glow)" opacity="0.3" />

        {/* Main circular background with animated gradient */}
        <circle cx="32" cy="32" r="28" fill="url(#mainGradient)" />

        {/* Inner rotating ring effect */}
        <circle cx="32" cy="32" r="26" fill="none" stroke="url(#ringGradient)" strokeWidth="0.5" opacity="0.4" />

        {/* Dream portal/gateway shape */}
        <path
          d="M32 8 L40 16 L48 12 L44 20 L52 24 L44 28 L48 36 L40 32 L32 40 L24 32 L16 36 L20 28 L12 24 L20 20 L16 12 L24 16 Z"
          fill="url(#portalGradient)"
          opacity="0.8"
          className="animate-pulse"
        />

        {/* Central mystical eye/portal */}
        <ellipse cx="32" cy="24" rx="12" ry="8" fill="url(#eyeGradient)" opacity="0.9" />
        <ellipse cx="32" cy="24" rx="6" ry="4" fill="url(#pupilGradient)" />
        <circle cx="32" cy="24" r="2" fill="white" opacity="0.9" />

        {/* Floating particles/sparkles */}
        <circle cx="18" cy="18" r="1.5" fill="#FBBF24" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="46" cy="22" r="1.2" fill="#60A5FA" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="26" cy="44" r="1" fill="#14B8A6" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="42" cy="46" r="1.3" fill="#A78BFA" opacity="0.8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
        </circle>

        {/* Mystical runes/symbols around the edge */}
        <path d="M32 4 L32 8" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />
        <path d="M50 14 L47 16" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />
        <path d="M60 32 L56 32" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />
        <path d="M50 50 L47 48" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />
        <path d="M32 60 L32 56" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />
        <path d="M14 50 L17 48" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />
        <path d="M4 32 L8 32" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />
        <path d="M14 14 L17 16" stroke="url(#runeGradient)" strokeWidth="1" strokeLinecap="round" />

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </radialGradient>

          <linearGradient id="mainGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="30%" stopColor="#8B5CF6" />
            <stop offset="60%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>

          <linearGradient id="ringGradient" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          <linearGradient id="portalGradient" x1="12" y1="8" x2="52" y2="40">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          <linearGradient id="eyeGradient" x1="20" y1="16" x2="44" y2="32">
            <stop offset="0%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          <linearGradient id="pupilGradient" x1="26" y1="20" x2="38" y2="28">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <linearGradient id="runeGradient" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className} group`}>
      {/* Icon with hover animation */}
      <div className="relative">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
        >
          {/* Outer glow effect */}
          <circle cx="32" cy="32" r="30" fill="url(#glow-full)" opacity="0.3" className="group-hover:opacity-50 transition-opacity duration-500" />

          {/* Main circular background */}
          <circle cx="32" cy="32" r="28" fill="url(#mainGradient-full)" />

          {/* Inner rotating ring */}
          <circle cx="32" cy="32" r="26" fill="none" stroke="url(#ringGradient-full)" strokeWidth="0.5" opacity="0.4" />

          {/* Dream portal/gateway shape */}
          <path
            d="M32 8 L40 16 L48 12 L44 20 L52 24 L44 28 L48 36 L40 32 L32 40 L24 32 L16 36 L20 28 L12 24 L20 20 L16 12 L24 16 Z"
            fill="url(#portalGradient-full)"
            opacity="0.8"
          />

          {/* Central mystical eye */}
          <ellipse cx="32" cy="24" rx="12" ry="8" fill="url(#eyeGradient-full)" opacity="0.9" />
          <ellipse cx="32" cy="24" rx="6" ry="4" fill="url(#pupilGradient-full)" />
          <circle cx="32" cy="24" r="2" fill="white" opacity="0.9" />

          {/* Floating particles */}
          <circle cx="18" cy="18" r="1.5" fill="#FBBF24" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="46" cy="22" r="1.2" fill="#60A5FA" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="26" cy="44" r="1" fill="#14B8A6" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="42" cy="46" r="1.3" fill="#A78BFA" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
          </circle>

          {/* Mystical runes */}
          <path d="M32 4 L32 8" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />
          <path d="M50 14 L47 16" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />
          <path d="M60 32 L56 32" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />
          <path d="M50 50 L47 48" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />
          <path d="M32 60 L32 56" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />
          <path d="M14 50 L17 48" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />
          <path d="M4 32 L8 32" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />
          <path d="M14 14 L17 16" stroke="url(#runeGradient-full)" strokeWidth="1" strokeLinecap="round" />

          <defs>
            <radialGradient id="glow-full" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </radialGradient>

            <linearGradient id="mainGradient-full" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="30%" stopColor="#8B5CF6" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>

            <linearGradient id="ringGradient-full" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>

            <linearGradient id="portalGradient-full" x1="12" y1="8" x2="52" y2="40">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>

            <linearGradient id="eyeGradient-full" x1="20" y1="16" x2="44" y2="32">
              <stop offset="0%" stopColor="#E0E7FF" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>

            <linearGradient id="pupilGradient-full" x1="26" y1="20" x2="38" y2="28">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            <linearGradient id="runeGradient-full" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated glow ring on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      </div>

      {/* Text with enhanced typography */}
      <div className="flex flex-col">
        <span className="text-2xl font-black leading-none tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-cyan-300 group-hover:to-teal-300 transition-all duration-500">
          Dream
        </span>
        <span className="text-2xl font-black leading-none tracking-tight text-white group-hover:text-cyan-100 transition-colors duration-500">
          Quest
        </span>
      </div>

      {/* Subtle animated underline */}
      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
