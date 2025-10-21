'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { UserMenu } from '@/components/auth/UserMenu'
import { Logo } from '@/components/Logo'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-purple-500/10'
          : 'bg-black/60 backdrop-blur-md border-b border-white/10'
      }`}
    >
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="relative group">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Accueil</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/dreamquest"
              className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Créer</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/dreamquest/gallery"
              className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Galerie</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/pricing"
              className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Tarifs</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
          </nav>

          {/* User Menu / Auth Button */}
          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
            {mobileMenuOpen ? (
              <X className="w-6 h-6 relative z-10 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-6 h-6 relative z-10 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10 animate-in slide-in-from-top-5 duration-300">
            <Link
              href="/"
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full" />
                Accueil
              </span>
            </Link>
            <Link
              href="/dreamquest"
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-full" />
                Créer
              </span>
            </Link>
            <Link
              href="/dreamquest/gallery"
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full" />
                Galerie
              </span>
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full" />
                Tarifs
              </span>
            </Link>
            <div className="pt-2 px-4">
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
