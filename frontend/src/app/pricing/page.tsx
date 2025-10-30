'use client'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles, Zap, Crown, Image, Video, Gamepad2 } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Gratuit',
    price: '0',
    description: 'Pour découvrir DreamQuest',
    icon: Sparkles,
    color: 'from-gray-500 to-gray-600',
    features: [
      '1 image gratuite',
      '1 vidéo de 10 secondes',
      'Qualité standard',
      'Watermark sur les créations',
    ],
    limitations: [
      'Pas de jeux 3D',
      'Pas de téléchargement HD',
    ],
    popular: false,
  },
  {
    name: 'Starter',
    price: '9.99',
    description: 'Parfait pour les créateurs occasionnels',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    credits: {
      images: 50,
      videos: 10,
      games: 0,
    },
    features: [
      '50 crédits images',
      '10 crédits vidéos (jusqu\'à 30s)',
      'Qualité HD',
      'Sans watermark',
      'Téléchargement illimité',
      'Support par email',
    ],
    popular: true,
  },
  {
    name: 'Pro',
    price: '29.99',
    description: 'Pour les professionnels créatifs',
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
    credits: {
      images: 200,
      videos: 50,
      games: 10,
    },
    features: [
      '200 crédits images',
      '50 crédits vidéos (jusqu\'à 60s)',
      '10 crédits jeux 3D',
      'Qualité 4K',
      'Sans watermark',
      'API Access',
      'Génération prioritaire',
      'Support prioritaire 24/7',
    ],
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Sur mesure',
    description: 'Pour les équipes et entreprises',
    icon: Crown,
    color: 'from-orange-500 to-red-500',
    features: [
      'Crédits illimités',
      'Vidéos jusqu\'à 5 minutes',
      'Jeux 3D illimités',
      'Qualité 8K',
      'API dédiée',
      'White-label disponible',
      'Manager de compte dédié',
      'SLA garanti',
      'Formation sur mesure',
    ],
    popular: false,
  },
]

const creditPacks = [
  {
    type: 'Images',
    icon: Image,
    color: 'text-blue-400',
    packs: [
      { credits: 25, price: 4.99 },
      { credits: 100, price: 14.99, savings: '25%' },
      { credits: 500, price: 59.99, savings: '40%' },
    ],
  },
  {
    type: 'Vidéos',
    icon: Video,
    color: 'text-cyan-400',
    packs: [
      { credits: 5, price: 4.99 },
      { credits: 25, price: 19.99, savings: '20%' },
      { credits: 100, price: 69.99, savings: '30%' },
    ],
  },
  {
    type: 'Jeux 3D',
    icon: Gamepad2,
    color: 'text-teal-400',
    packs: [
      { credits: 3, price: 9.99 },
      { credits: 10, price: 29.99, savings: '10%' },
      { credits: 50, price: 124.99, savings: '25%' },
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 pt-24 sm:pt-32">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 text-blue-300 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Tarification Simple et Transparente</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Choisissez votre plan
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Commencez gratuitement, puis choisissez le plan qui correspond à vos besoins.
            Tous les plans incluent l’accès à nos dernières fonctionnalités.
          </p>
        </div>

        {/* Monthly Plans */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Plans Mensuels
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <Card
                  key={plan.name}
                  className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    plan.popular ? 'border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                      Le plus populaire
                    </Badge>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-white/60">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      {plan.price !== 'Sur mesure' && <span className="text-white/50 ml-2">/mois</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plan.credits && (
                      <div className="space-y-2 pb-4 border-b border-white/10">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/70">Images</span>
                          <span className="font-semibold text-white">{plan.credits.images}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/70">Vidéos</span>
                          <span className="font-semibold text-white">{plan.credits.videos}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/70">Jeux 3D</span>
                          <span className="font-semibold text-white">{plan.credits.games}</span>
                        </div>
                      </div>
                    )}
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations?.map((limitation) => (
                        <li key={limitation} className="flex items-start gap-2">
                          <span className="w-5 h-5 flex-shrink-0 text-white/30 text-center">×</span>
                          <span className="text-sm text-white/40 line-through">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                          : 'bg-white/10 hover:bg-white/20'
                      } text-white border-0`}
                    >
                      {plan.name === 'Gratuit' ? 'Commencer Gratuitement' :
                       plan.name === 'Enterprise' ? 'Nous Contacter' : 'Choisir ce Plan'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Credit Packs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Packs de Crédits à la Carte
            </h2>
            <p className="text-white/70">
              Achetez uniquement ce dont vous avez besoin, sans abonnement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {creditPacks.map((pack) => {
              const Icon = pack.icon
              return (
                <Card key={pack.type} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-6 h-6 ${pack.color}`} />
                      <CardTitle className="text-xl text-white">{pack.type}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pack.packs.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-white">{p.credits} crédits</p>
                          {p.savings && (
                            <Badge variant="outline" className="mt-1 text-xs border-green-500/50 text-green-400">
                              Économisez {p.savings}
                            </Badge>
                          )}
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                          ${p.price}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Comment fonctionnent les crédits ?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                <p>Chaque création consomme un crédit du type correspondant. Les crédits n’expirent jamais
                et peuvent être utilisés à tout moment. Vous pouvez également acheter des packs à la carte.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Puis-je annuler mon abonnement ?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                <p>Oui, vous pouvez annuler à tout moment. Vos crédits restants seront conservés et
                vous pourrez continuer à les utiliser même après l’annulation.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quels moyens de paiement acceptez-vous ?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                <p>Nous acceptons les cartes de crédit (Visa, Mastercard, Amex) via Stripe,
                ainsi que PayPal pour plus de flexibilité.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-8 sm:p-12">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Prêt à créer vos rêves ?
              </h3>
              <p className="text-white/70 mb-6">
                Essayez gratuitement, aucune carte de crédit requise
              </p>
              <Link href="/dreamquest">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg px-10 py-7 h-auto shadow-2xl shadow-blue-500/30 border-0"
                >
                  Commencer Maintenant
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
