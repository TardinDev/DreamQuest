import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DreamQuest - Transform Dreams into Playable Worlds',
  description: 'Describe your dream and watch it become a playable 3D world',
  icons: {
    icon: '/iconDreamQuest.png',
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
        <footer className="border-t border-white/10 py-6 mt-auto bg-black">
          <div className="container mx-auto px-4 text-center text-sm text-white/60">
            Développé par{' '}
            <a
              href="https://evoubap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              evoubap.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
