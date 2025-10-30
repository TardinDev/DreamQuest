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
  gradient: string
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
    gradient: 'from-orange-500/80 via-rose-500/70 to-indigo-500/70',
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
    gradient: 'from-emerald-500/80 via-teal-500/70 to-purple-600/60',
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
    gradient: 'from-amber-500/70 via-red-500/60 to-slate-800/80',
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
    gradient: 'from-cyan-500/80 via-blue-500/70 to-indigo-600/70',
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
    gradient: 'from-sky-500/80 via-violet-500/70 to-fuchsia-600/60',
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
    gradient: 'from-blue-600/80 via-purple-600/70 to-black/80',
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Galerie des rêves
            </span>
            <h1 className="text-4xl font-bold">Inspiration pour votre prochain monde onirique</h1>
            <p className="max-w-2xl text-muted-foreground">
              Explorez une sélection d\u2019expériences imaginaires générées avec DreamQuest. Inspirez-vous
              des styles, ambiances et formats pour créer votre propre aventure.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <Link href="/dreamquest">
              <Button>
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
              <Card key={item.id} className="overflow-hidden border border-white/10 bg-black/40">
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40`} />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    <Icon className="h-4 w-4" />
                    {item.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white drop-shadow-md">
                    <span>Vision conceptuelle</span>
                    <span>{item.type}</span>
                  </div>
                </div>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase text-white/60">
                    <span className="rounded-full bg-white/10 px-3 py-1 tracking-wide">
                      Ambiance&nbsp;: {item.mood}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 tracking-wide">
                      Durée&nbsp;: {item.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Prototype</span>
                    <Link
                      href="/dreamquest"
                      className="inline-flex items-center font-medium text-primary transition hover:text-primary/80"
                    >
                      Voir comment c’est créé
                      <Play className="ml-2 h-4 w-4" />
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
