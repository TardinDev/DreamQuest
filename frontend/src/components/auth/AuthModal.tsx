'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  // Demo mode - authentication not configured yet
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0a0a0a] border-white/10">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-white/80" />
            Mode démo
          </DialogTitle>
          <DialogDescription className="text-white/55">
            L’authentification sera disponible prochainement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Alert className="bg-white/[0.03] border-white/10">
            <AlertDescription className="text-white/75">
              <strong className="text-white">Le site fonctionne en mode démo.</strong>
              <br /><br />
              Vous pouvez créer des rêves sans authentification.
              <br /><br />
              <strong className="text-white">Limites gratuites actuelles :</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>1 image gratuite</li>
                <li>1 vidéo de 10 secondes</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="bg-white/[0.02] border border-white/8 rounded-xl p-4 space-y-3 text-sm text-white/65">
            <p className="font-medium text-white">Configuration à venir</p>
            <div className="space-y-1.5">
              <p>Authentification via <strong className="text-white">Clerk</strong></p>
              <p>Backend avec <strong className="text-white">Supabase</strong></p>
              <p>Paiements via <strong className="text-white">Stripe</strong> &amp; <strong className="text-white">PayPal</strong></p>
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full bg-white text-black hover:bg-white/90 border-0"
          >
            Continuer en mode démo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
