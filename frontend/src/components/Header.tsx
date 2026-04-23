'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { UserMenu } from '@/components/auth/UserMenu'
import { Logo } from '@/components/Logo'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/dreamquest', label: 'Créer' },
  { href: '/dreamquest/gallery', label: 'Galerie' },
  { href: '/pricing', label: 'Tarifs' },
]

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/8'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="relative group">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <span className="relative z-10">{label}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-5" />
              </Link>
            ))}
          </nav>

          {/* User Menu / Auth Button */}
          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative p-2 text-white hover:bg-white/[0.04] rounded-lg transition-colors duration-200"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-white/8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-3 text-sm font-medium text-white/75 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
