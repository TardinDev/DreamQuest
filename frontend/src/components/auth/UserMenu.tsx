'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AuthModal } from './AuthModal'
import { useAuthStore } from '@/lib/auth-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogIn, CreditCard, Image as ImageIcon, Video, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function UserMenu() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { freeUsage } = useAuthStore()

  // Demo mode - no authentication yet
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Mode Démo</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-gray-900 border-white/10" align="end">
          <DropdownMenuLabel className="text-white">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Visiteur</p>
              <p className="text-xs text-white/60">Mode démo actif</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />

          <div className="px-2 py-3 space-y-2">
            <p className="text-xs font-semibold text-white/80 uppercase">Usage Gratuit</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  Images
                </span>
                <span className="font-semibold text-white">{freeUsage.images}/1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70">
                  <Video className="w-4 h-4 text-cyan-400" />
                  Vidéos 10s
                </span>
                <span className="font-semibold text-white">{freeUsage.videos}/1</span>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem asChild className="text-white hover:bg-white/10 cursor-pointer">
            <Link href="/pricing" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Voir les tarifs
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem
            onClick={() => setAuthModalOpen(true)}
            className="text-blue-400 hover:bg-blue-500/10 cursor-pointer"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Se connecter (bientôt)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
