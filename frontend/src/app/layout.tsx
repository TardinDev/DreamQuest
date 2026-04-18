import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DreamQuest — Transformez vos rêves en réalité visuelle',
  description:
    'Décrivez votre rêve, l\'IA en fait une image, une vidéo cinématique ou un monde 3D interactif. Conçu pour les rêveurs, artistes et créateurs.',
  icons: { icon: '/logo.svg' },
  openGraph: {
    title: 'DreamQuest — Dreams, rendered.',
    description: 'Vos rêves, vivants. Images, vidéos et mondes 3D générés par IA.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`dark ${inter.variable} ${serif.variable}`}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
        <footer className="relative border-t border-white/10 bg-[#05030b]">
          <div className="bg-noise pointer-events-none absolute inset-0" />
          <div className="container relative mx-auto px-6 py-16 sm:py-20">
            <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-5 space-y-4">
                <h3 className="font-serif text-3xl italic text-white">
                  Dreams,<br /> rendered.
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/60">
                  DreamQuest transforme votre imagination nocturne en images,
                  vidéos et mondes 3D jouables grâce à une IA multi-étapes.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Tous systèmes opérationnels
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Produit
                </h4>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/dreamquest" className="text-white/70 transition-colors hover:text-white">Créer un rêve</Link></li>
                  <li><Link href="/dreamquest/gallery" className="text-white/70 transition-colors hover:text-white">Galerie</Link></li>
                  <li><Link href="/pricing" className="text-white/70 transition-colors hover:text-white">Tarifs</Link></li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Société
                </h4>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="#" className="text-white/70 transition-colors hover:text-white">À propos</a></li>
                  <li><a href="#" className="text-white/70 transition-colors hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-white/70 transition-colors hover:text-white">Carrières</a></li>
                </ul>
              </div>

              <div className="md:col-span-3 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Légal
                </h4>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="#" className="text-white/70 transition-colors hover:text-white">Confidentialité</a></li>
                  <li><a href="#" className="text-white/70 transition-colors hover:text-white">Conditions</a></li>
                  <li><a href="#" className="text-white/70 transition-colors hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center">
              <p>© 2026 DreamQuest · Conçu pour les rêveurs.</p>
              <p>
                Propulsé par{' '}
                <a
                  href="https://evoubap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  evoubap.com
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
