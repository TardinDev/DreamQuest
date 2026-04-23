import Link from 'next/link'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowLeft,
  Gamepad2,
  Mountain,
  Play,
  Sparkles,
  Sunrise,
  Trees,
  Waves,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type GalleryItem = {
  id: string
  title: string
  description: string
  type: string
  mood: string
  length: string
  badge: string
  icon: LucideIcon
  mediaType: 'image' | 'video'
  mediaSrc: string
  mediaPoster?: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 'dream-wings',
    title: 'Les Ailes de l\u2019Aube',
    description:
      'Planez au-dessus d\u2019une cité flottante alors que l\u2019aube illumine les nuages de teintes dorées.',
    type: 'Vidéo générative',
    mood: 'Apaisant',
    length: '1 min',
    badge: 'Aventure céleste',
    icon: Sunrise,
    mediaType: 'image',
    mediaSrc:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'forest-lights',
    title: 'Forêt aux Lueurs éternelles',
    description:
      'Explorez une clairière mystique où chaque arbre murmure et où les lucioles dessinent des constellations mouvantes.',
    type: 'Image cinématographique',
    mood: 'Mystique',
    length: 'Instantané',
    badge: 'Nature vivante',
    icon: Trees,
    mediaType: 'image',
    mediaSrc:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'clockwork-city',
    title: 'Cité Horlogère',
    description:
      'Visitez une métropole steampunk alimentée par de gigantesques engrenages et des trains suspendus.',
    type: 'Monde jouable (démo)',
    mood: 'Énergique',
    length: '5 min',
    badge: 'Exploration 3D',
    icon: Gamepad2,
    mediaType: 'image',
    mediaSrc:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'ocean-mirage',
    title: 'Mirage Océanique',
    description:
      'Plongez dans des abysses lumineux peuplés de créatures translucides et de récifs cristallins mouvants.',
    type: 'Vidéo générative',
    mood: 'Contemplatif',
    length: '45 s',
    badge: 'Rêverie aquatique',
    icon: Waves,
    mediaType: 'image',
    mediaSrc:
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'crystalline-peak',
    title: 'Sommet Cristallin',
    description:
      'Escaladez une montagne sculptée dans la glace luminescente et contemplez les aurores au sommet.',
    type: 'Image panoramique',
    mood: 'Épique',
    length: 'Instantané',
    badge: 'Paysage épique',
    icon: Mountain,
    mediaType: 'image',
    mediaSrc:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'starlit-cascade',
    title: 'Cascade Astrale',
    description:
      'Traversez un sanctuaire où une rivière d\u2019étoiles scintillantes chute dans un lac miroité.',
    type: 'Vidéo générative',
    mood: 'Onirique',
    length: '30 s',
    badge: 'Rituels stellaires',
    icon: Sparkles,
    mediaType: 'video',
    mediaSrc: 'https://assets.mixkit.co/videos/preview/mixkit-blue-nebula-space-background-9730-large.mp4',
    mediaPoster:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              <Sparkles className="mr-2 h-3 w-3" />
              Galerie des rêves
            </span>
            <h1 className="font-serif text-4xl text-white sm:text-5xl">Inspiration pour votre prochain monde onirique</h1>
            <p className="max-w-2xl text-white/55">
              Explorez une sélection d\u2019expériences imaginaires générées avec DreamQuest. Inspirez-vous
              des styles, ambiances et formats pour créer votre propre aventure.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="ghost" className="rounded-full border border-white/10 bg-transparent text-white hover:bg-white/[0.04]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <Link href="/dreamquest">
              <Button className="rounded-full bg-white text-black hover:bg-white/90">
                Créer mon rêve
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.id} className="overflow-hidden border border-white/8 bg-white/[0.02] transition-all duration-300 hover:border-white/20">
                <div className="relative h-56 w-full overflow-hidden">
                  {item.mediaType === 'image' ? (
                    <Image
                      src={item.mediaSrc}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <video
                      className="h-full w-full object-cover"
                      src={item.mediaSrc}
                      poster={item.mediaPoster}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    <Icon className="h-3 w-3" />
                    {item.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
                    <span>Vision conceptuelle</span>
                    <span>{item.type}</span>
                  </div>
                </div>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h2 className="font-serif text-xl text-white">{item.title}</h2>
                    <p className="mt-2 text-sm text-white/60">{item.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/55">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                      Ambiance&nbsp;: {item.mood}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                      Durée&nbsp;: {item.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40">Prototype</span>
                    <Link
                      href="/dreamquest"
                      className="inline-flex items-center font-medium text-white transition hover:text-white/80"
                    >
                      Voir comment c’est créé
                      <Play className="ml-2 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
