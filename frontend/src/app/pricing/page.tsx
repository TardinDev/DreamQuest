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
    packs: [
      { credits: 25, price: 4.99 },
      { credits: 100, price: 14.99, savings: '25%' },
      { credits: 500, price: 59.99, savings: '40%' },
    ],
  },
  {
    type: 'Vidéos',
    icon: Video,
    packs: [
      { credits: 5, price: 4.99 },
      { credits: 25, price: 19.99, savings: '20%' },
      { credits: 100, price: 69.99, savings: '30%' },
    ],
  },
  {
    type: 'Jeux 3D',
    icon: Gamepad2,
    packs: [
      { credits: 3, price: 9.99 },
      { credits: 10, price: 29.99, savings: '10%' },
      { credits: 50, price: 124.99, savings: '25%' },
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 pt-24 sm:pt-32">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10 text-white/70 mb-6">
            <Sparkles className="w-3 h-3" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Tarification simple et transparente</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-6 leading-[1.05]">
            Choisissez votre <span className="italic text-white/70">plan</span>
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto">
            Commencez gratuitement, puis choisissez le plan qui correspond à vos besoins.
            Tous les plans incluent l’accès à nos dernières fonctionnalités.
          </p>
        </div>

        {/* Monthly Plans */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl text-white text-center mb-12">
            Plans mensuels
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <Card
                  key={plan.name}
                  className={`relative bg-white/[0.02] backdrop-blur-sm border-white/8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${
                    plan.popular ? 'border-white/30' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black border-0 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                      Le plus populaire
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="w-11 h-11 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="font-serif text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-white/55">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="font-serif text-5xl text-white">${plan.price}</span>
                      {plan.price !== 'Sur mesure' && <span className="text-white/45 ml-2 text-sm">/mois</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plan.credits && (
                      <div className="space-y-2 pb-4 border-b border-white/8">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">Images</span>
                          <span className="font-medium text-white">{plan.credits.images}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">Vidéos</span>
                          <span className="font-medium text-white">{plan.credits.videos}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">Jeux 3D</span>
                          <span className="font-medium text-white">{plan.credits.games}</span>
                        </div>
                      </div>
                    )}
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-white/80 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/75">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations?.map((limitation) => (
                        <li key={limitation} className="flex items-start gap-2">
                          <span className="w-4 h-4 flex-shrink-0 text-white/25 text-center">×</span>
                          <span className="text-sm text-white/35 line-through">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full rounded-full ${
                        plan.popular
                          ? 'bg-white text-black hover:bg-white/90'
                          : 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white'
                      } border-0`}
                    >
                      {plan.name === 'Gratuit' ? 'Commencer gratuitement' :
                       plan.name === 'Enterprise' ? 'Nous contacter' : 'Choisir ce plan'}
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
            <h2 className="font-serif text-3xl text-white mb-4">
              Packs de crédits à la carte
            </h2>
            <p className="text-white/55">
              Achetez uniquement ce dont vous avez besoin, sans abonnement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {creditPacks.map((pack) => {
              const Icon = pack.icon
              return (
                <Card key={pack.type} className="bg-white/[0.02] backdrop-blur-sm border-white/8">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-white" />
                      <CardTitle className="font-serif text-xl text-white">{pack.type}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pack.packs.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/8 rounded-xl hover:bg-white/[0.04] transition-colors"
                      >
                        <div>
                          <p className="font-medium text-white">{p.credits} crédits</p>
                          {p.savings && (
                            <Badge variant="outline" className="mt-1 text-[10px] border-white/15 bg-white/[0.03] text-white/70 uppercase tracking-[0.15em]">
                              Économisez {p.savings}
                            </Badge>
                          )}
                        </div>
                        <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-full border-0">
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
          <h2 className="font-serif text-3xl text-white text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            <Card className="bg-white/[0.02] backdrop-blur-sm border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white">Comment fonctionnent les crédits ?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/60">
                <p>Chaque création consomme un crédit du type correspondant. Les crédits n’expirent jamais
                et peuvent être utilisés à tout moment. Vous pouvez également acheter des packs à la carte.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] backdrop-blur-sm border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white">Puis-je annuler mon abonnement ?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/60">
                <p>Oui, vous pouvez annuler à tout moment. Vos crédits restants seront conservés et
                vous pourrez continuer à les utiliser même après l’annulation.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] backdrop-blur-sm border-white/8">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quels moyens de paiement acceptez-vous ?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/60">
                <p>Nous acceptons les cartes de crédit (Visa, Mastercard, Amex) via Stripe,
                ainsi que PayPal pour plus de flexibilité.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto bg-white/[0.02] backdrop-blur-sm border-white/10">
            <CardContent className="p-8 sm:p-12">
              <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h3 className="font-serif text-3xl sm:text-4xl text-white mb-4">
                Prêt à créer vos rêves ?
              </h3>
              <p className="text-white/60 mb-6">
                Essayez gratuitement, aucune carte de crédit requise
              </p>
              <Link href="/dreamquest">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-6 h-auto border-0"
                >
                  Commencer maintenant
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
