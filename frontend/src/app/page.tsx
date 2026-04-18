import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/Header'
import {
  ArrowUpRight,
  Sparkles,
  Brain,
  Wand2,
  Palette,
  ImageIcon,
  Video,
  Gamepad2,
  Zap,
  MoveRight,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    step: '01',
    title: 'Racontez le rêve',
    copy:
      'Décrivez-le en français, en images, ou enregistrez votre voix. L\'IA décode symboles, émotions et archétypes.',
  },
  {
    icon: Palette,
    step: '02',
    title: 'Sculptez l’atmosphère',
    copy:
      'Choisissez un style visuel, une humeur et un format. Chaque preset pilote éclairage, couleurs et tempo.',
  },
  {
    icon: Wand2,
    step: '03',
    title: 'Rendez-le vivant',
    copy:
      'Image 1024px, vidéo cinématique 6 plans ou monde 3D Unity WebGL. Prêt en moins d’une minute.',
  },
]

const outputs = [
  {
    icon: ImageIcon,
    title: 'Images',
    tagline: 'High-resolution stills',
    copy: 'Des visuels en 1024px taillés pour l’affiche, l’inspiration ou le moodboard.',
    gradient: 'from-fuchsia-500/40 via-purple-500/30 to-transparent',
    accent: 'text-fuchsia-200',
  },
  {
    icon: Video,
    title: 'Vidéos',
    tagline: 'Cinematic storyboards',
    copy: '6 plans storyboardés avec caméra, lumière, transitions et partition musicale.',
    gradient: 'from-sky-500/40 via-cyan-500/30 to-transparent',
    accent: 'text-sky-200',
  },
  {
    icon: Gamepad2,
    title: 'Mondes 3D',
    tagline: 'Playable Unity WebGL',
    copy: 'Blueprint complet : biome, météo, PNJ, objectifs, sound design, lumière cinématique.',
    gradient: 'from-amber-400/40 via-rose-400/30 to-transparent',
    accent: 'text-amber-100',
  },
]

const stats = [
  { k: '10K+', v: 'Rêves générés' },
  { k: '5K+', v: 'Rêveurs actifs' },
  { k: '< 60s', v: 'Temps de rendu' },
  { k: '98%', v: 'Fidélité aux symboles' },
]

const marqueeWords = [
  'Symboles', 'Archétypes', 'Émotions', 'Lumière', 'Palette', 'Narration',
  'Biome', 'Caméra', 'Tempo', 'Ambiance', 'Matière', 'Profondeur',
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05030b] text-white">
      <Header />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-32 pb-20 sm:pt-40">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden />
        <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <Badge
            variant="outline"
            className="mb-8 border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-3 w-3" />
            v1.0 · Claude Sonnet 4.5
          </Badge>

          <h1 className="reveal-up font-serif text-[14vw] font-normal leading-[0.9] tracking-tight text-white sm:text-[10vw] md:text-[8rem] lg:text-[10rem]">
            <span className="block">Rendez vos rêves</span>
            <span className="block italic">
              <span className="text-gradient">visibles.</span>
            </span>
          </h1>

          <p className="reveal-up mx-auto mt-10 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg md:text-xl" style={{ animationDelay: '120ms' }}>
            Une IA multi-étapes décode vos rêves — symboles, émotions, archétypes —
            et les sculpte en <em className="font-serif not-italic text-white">images</em>,{' '}
            <em className="font-serif not-italic text-white">vidéos</em> et{' '}
            <em className="font-serif not-italic text-white">mondes 3D interactifs</em>.
          </p>

          <div className="reveal-up mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
            <Link href="/dreamquest">
              <Button
                size="lg"
                className="group h-14 rounded-full bg-white px-7 text-base font-semibold text-black shadow-[0_20px_60px_-15px_rgba(255,255,255,0.4)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_30px_80px_-10px_rgba(192,132,252,0.6)]"
              >
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Commencer un rêve
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
            <Link href="/dreamquest/gallery">
              <Button
                size="lg"
                variant="ghost"
                className="h-14 rounded-full border border-white/15 bg-white/5 px-7 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/25"
              >
                Explorer la galerie
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="reveal-up mt-24 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40" style={{ animationDelay: '360ms' }}>
            <span className="h-px w-10 bg-white/20" />
            <span>Scrollez pour décoder</span>
            <span className="h-px w-10 bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-8">
        <div className="flex gap-12 whitespace-nowrap marquee">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="font-serif text-3xl italic text-white/50 sm:text-4xl">
              {w} <span className="mx-6 text-white/20">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="relative px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <Badge variant="outline" className="mb-6 border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/70">
                <Zap className="mr-2 h-3 w-3" /> Pipeline
              </Badge>
              <h2 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
                Trois étapes. <span className="italic text-gradient-static">Zéro friction.</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-white/60 md:col-span-5 md:col-start-8">
              Une pipeline IA à deux temps : interprétation structurée de votre rêve,
              puis synthèse cohérente vers le format choisi.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {features.map(({ icon: Icon, step, title, copy }) => (
              <article
                key={step}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 transition-all duration-500 hover-lift hover:border-white/25"
              >
                <div className="absolute -right-6 -top-6 font-serif text-[8rem] leading-none text-white/[0.04] transition-all duration-700 group-hover:text-white/10 group-hover:-translate-y-1">
                  {step}
                </div>
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/10">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-serif text-3xl text-white">{title}</h3>
                  <p className="text-[15px] leading-relaxed text-white/60">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTPUT FORMATS ─────────────────────────────────────── */}
      <section className="relative px-6 py-28 sm:py-36">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <Badge variant="outline" className="mb-6 border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/70">
              Formats
            </Badge>
            <h2 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
              Un rêve. <span className="italic">Trois rendus.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {outputs.map(({ icon: Icon, title, tagline, copy, gradient, accent }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0714] p-0 transition-all duration-500 hover:-translate-y-1 hover:border-white/25"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 transition-opacity duration-700 group-hover:opacity-80`}
                  aria-hidden
                />
                <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden />
                <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-8">
                  <div>
                    <Icon className={`h-10 w-10 ${accent}`} />
                    <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/50">{tagline}</p>
                    <h3 className="mt-2 font-serif text-5xl text-white">{title}</h3>
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <p className="max-w-[22ch] text-sm leading-relaxed text-white/70">{copy}</p>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="relative border-y border-white/10 bg-white/[0.02] px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map(({ k, v }) => (
            <div key={v} className="space-y-2">
              <div className="font-serif text-5xl leading-none text-white sm:text-6xl">{k}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/40">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ─────────────────────────────────────────── */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-3xl leading-[1.3] text-white/90 sm:text-4xl md:text-5xl">
            <span className="text-white/40">«</span> Un rêve n’est pas une image floue
            à reproduire. <span className="italic text-gradient-static">C’est une logique symbolique</span>{' '}
            qui demande à être entendue, puis rendue. <span className="text-white/40">»</span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            <span className="h-px w-8 bg-white/30" />
            <span>Manifeste DreamQuest</span>
            <span className="h-px w-8 bg-white/30" />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-32">
        <div className="aurora" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-6xl leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Prêt à <span className="italic text-gradient">rêver ?</span>
          </h2>
          <p className="mt-8 text-lg text-white/60 sm:text-xl">
            Rejoignez des milliers de rêveurs qui matérialisent leurs nuits.
          </p>
          <div className="mt-12">
            <Link href="/dreamquest">
              <Button
                size="lg"
                className="group h-16 rounded-full bg-white px-10 text-base font-semibold text-black shadow-[0_25px_80px_-20px_rgba(192,132,252,0.8)] transition-all duration-300 hover:shadow-[0_35px_120px_-20px_rgba(192,132,252,1)]"
              >
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Créer mon premier rêve
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
