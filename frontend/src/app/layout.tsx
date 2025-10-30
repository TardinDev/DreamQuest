import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DreamQuest - Transformez vos rêves en réalité visuelle',
  description: 'Décrivez votre rêve et notre IA le transforme en image, vidéo ou jeu 3D interactif',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} min-h-screen`}>
        {children}
        <footer className="relative border-t border-white/10 bg-black">
          <div className="container mx-auto px-6 py-12 sm:py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-8">
              {/* Marque */}
              <div className="md:col-span-1 space-y-4">
                <h3 className="text-xl font-bold text-white">DreamQuest</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Transformez vos rêves en réalité visuelle grâce à l&apos;intelligence artificielle.
                </p>
              </div>

              {/* Produit */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider">Produit</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/dreamquest" className="text-white/60 hover:text-white transition-colors">
                      Créer un rêve
                    </a>
                  </li>
                  <li>
                    <a href="/dreamquest/gallery" className="text-white/60 hover:text-white transition-colors">
                      Galerie
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Tarifs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Entreprise */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider">Entreprise</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">À propos</a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Carrières
                    </a>
                  </li>
                </ul>
              </div>

              {/* Légal */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider">Légal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Confidentialité
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Barre inférieure */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
                <p>© 2025 DreamQuest. Tous droits réservés.</p>
                <p>
                  Développé avec passion par{' '}
                  <a
                    href="https://evoubap.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    evoubap.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
