import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  Gamepad2,
  Brain,
  Wand2,
  Share2,
  Zap,
  Globe,
  Palette,
} from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 sm:py-40 overflow-hidden bg-black">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-5xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            Transformez vos rêves
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              en réalité visuelle
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Décrivez votre rêve et notre IA le transforme en image captivante,
            vidéo immersive ou expérience de jeu interactive en quelques secondes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/dreamquest">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 h-auto shadow-2xl shadow-blue-500/30 border-0 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Commencer Gratuitement
              </Button>
            </Link>
            <Link href="/dreamquest/gallery">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 h-auto backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Explorer la Galerie
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-28 px-6 bg-gradient-to-b from-black via-blue-950/5 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 text-blue-300 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Simple et Rapide</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Comment ça fonctionne ?
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Trois étapes simples pour donner vie à vos rêves
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="absolute top-6 right-6 text-7xl font-bold text-white/5">01</div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Décrivez votre rêve</h3>
                <p className="text-white/70 text-base leading-relaxed">
                  Racontez votre rêve en détail. Plus vous êtes descriptif,
                  plus le résultat sera précis et captivant.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="absolute top-6 right-6 text-7xl font-bold text-white/5">02</div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Personnalisez le style</h3>
                <p className="text-white/70 text-base leading-relaxed">
                  Sélectionnez le format de sortie : image, vidéo ou jeu 3D.
                  Choisissez le style et l’ambiance désirés.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20">
              <div className="absolute top-6 right-6 text-7xl font-bold text-white/5">03</div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Découvrez le résultat</h3>
                <p className="text-white/70 text-base leading-relaxed">
                  L’IA génère votre rêve en quelques secondes.
                  Contemplez, partagez ou explorez votre création.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Output Types Section */}
      <section className="relative py-20 sm:py-28 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-500/20 text-purple-300 mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Formats Multiples</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Trois façons de visualiser vos rêves
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Choisissez le format qui correspond le mieux à votre vision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Image */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-1 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30">
              <div className="h-full bg-black/40 backdrop-blur-sm rounded-3xl p-8">
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Images HD</h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    Des illustrations détaillées et artistiques qui capturent
                    l’essence visuelle de votre rêve en haute résolution.
                  </p>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-cyan-500 to-teal-500 p-1 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="h-full bg-black/40 backdrop-blur-sm rounded-3xl p-8">
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Vidéos 4K</h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    Des séquences animées cinématiques qui donnent vie à
                    votre rêve avec fluidité et immersion totale.
                  </p>
                </div>
              </div>
            </div>

            {/* Game */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 p-1 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/30">
              <div className="h-full bg-black/40 backdrop-blur-sm rounded-3xl p-8">
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Mondes 3D</h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    Des univers interactifs jouables où vous pouvez
                    explorer et vivre votre rêve en temps réel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-24 px-6 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Cas d’utilisation
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Use case 1 */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Exploration Créative</h3>
                  <p className="text-white/70 leading-relaxed">
                    Artistes et créatifs peuvent visualiser leurs idées abstraites et transformer
                    leurs rêves en références visuelles concrètes pour leurs projets.
                  </p>
                </div>
              </div>
            </div>

            {/* Use case 2 */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Storytelling Visuel</h3>
                  <p className="text-white/70 leading-relaxed">
                    Écrivains et scénaristes peuvent créer des storyboards et des vidéos
                    pour donner vie à leurs histoires et univers imaginaires.
                  </p>
                </div>
              </div>
            </div>

            {/* Use case 3 */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Développement de Jeux</h3>
                  <p className="text-white/70 leading-relaxed">
                    Game designers peuvent rapidement prototyper des environnements 3D
                    et tester des concepts de gameplay basés sur leurs visions.
                  </p>
                </div>
              </div>
            </div>

            {/* Use case 4 */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-teal-500/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Thérapie & Bien-être</h3>
                  <p className="text-white/70 leading-relaxed">
                    Psychologues et thérapeutes peuvent utiliser l’outil pour aider leurs
                    patients à explorer et comprendre leurs rêves de manière visuelle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                10K+
              </div>
              <p className="text-white/60">Rêves Créés</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                5K+
              </div>
              <p className="text-white/60">Utilisateurs Actifs</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                98%
              </div>
              <p className="text-white/60">Satisfaction</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                24/7
              </div>
              <p className="text-white/60">Disponibilité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-6 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Ce qu’en disent nos utilisateurs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 mb-4 leading-relaxed">
                « DreamQuest a complètement changé ma façon de conceptualiser mes projets artistiques.
                Je peux maintenant visualiser mes rêves en quelques secondes ! »
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />
                <div>
                  <p className="text-white font-semibold">Marie L.</p>
                  <p className="text-white/50 text-sm">Artiste Digital</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 mb-4 leading-relaxed">
                « Un outil incroyable pour le prototypage rapide de mondes de jeu.
                L’IA comprend vraiment l’ambiance que je veux créer. »
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full" />
                <div>
                  <p className="text-white font-semibold">Thomas K.</p>
                  <p className="text-white/50 text-sm">Game Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 mb-4 leading-relaxed">
                « Mes patients adorent pouvoir visualiser leurs rêves.
                C’est un excellent support pour nos séances de thérapie. »
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-full" />
                <div>
                  <p className="text-white font-semibold">Dr. Sophie M.</p>
                  <p className="text-white/50 text-sm">Psychologue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Questions Fréquentes
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Comment fonctionne la génération ?
              </h3>
              <p className="text-white/70 leading-relaxed">
                Notre IA analyse votre description de rêve, identifie les éléments clés (ambiance, objets, personnages)
                et génère une représentation visuelle adaptée au format que vous avez choisi (image, vidéo ou jeu 3D).
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Combien de temps prend la génération ?
              </h3>
              <p className="text-white/70 leading-relaxed">
                La génération prend généralement entre 30 secondes et 2 minutes selon le type de sortie choisi.
                Les images sont les plus rapides, suivies des vidéos, puis des jeux 3D interactifs.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Puis-je télécharger mes créations ?
              </h3>
              <p className="text-white/70 leading-relaxed">
                Oui ! Toutes vos créations peuvent être téléchargées et partagées. Les images sont disponibles en haute résolution,
                les vidéos en format MP4, et les jeux peuvent être exportés en WebGL.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                L’outil est-il gratuit ?
              </h3>
              <p className="text-white/70 leading-relaxed">
                Nous offrons une version gratuite avec des crédits limités par mois. Pour un usage illimité et des fonctionnalités
                avancées, découvrez nos plans premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-6 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Prêt à donner vie à vos rêves ?
          </h2>
          <p className="text-xl text-white/80">
            Rejoignez des milliers de rêveurs qui transforment leurs visions nocturnes en créations tangibles.
          </p>
          <Link href="/dreamquest">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg px-10 py-7 h-auto shadow-2xl shadow-blue-500/50 border-0">
              <Sparkles className="mr-2 h-5 w-5" />
              Créer Maintenant
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
