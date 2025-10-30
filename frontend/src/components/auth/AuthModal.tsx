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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-black border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
            Mode Démo
          </DialogTitle>
          <DialogDescription className="text-white/60">
            L’authentification sera disponible prochainement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Alert className="bg-blue-500/10 border-blue-500/50">
            <AlertDescription className="text-blue-300">
              <strong>Le site fonctionne en mode démo !</strong>
              <br /><br />
              Vous pouvez créer des rêves sans authentification.
              <br /><br />
              <strong>Limites gratuites actuelles :</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>1 image gratuite</li>
                <li>1 vidéo de 10 secondes</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="bg-white/5 rounded-lg p-4 space-y-3 text-sm text-white/70">
            <p className="font-semibold text-white flex items-center gap-2">
              <span>⚙️</span>
              Configuration à venir
            </p>
            <div className="space-y-1.5">
              <p>✅ Authentification via <strong className="text-white">Clerk</strong></p>
              <p>✅ Backend avec <strong className="text-white">Supabase</strong></p>
              <p>✅ Paiements via <strong className="text-white">Stripe</strong> & <strong className="text-white">PayPal</strong></p>
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
          >
            Continuer en mode démo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
