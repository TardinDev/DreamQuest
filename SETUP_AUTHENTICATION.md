# Configuration de l'Authentification et des Paiements - DreamQuest

Ce guide explique comment configurer l'authentification avec Clerk et le backend avec Supabase.

## État actuel : Mode Démo

Le site fonctionne actuellement en **mode démo** sans nécessiter de configuration. Les utilisateurs peuvent :
- Créer 1 image gratuitement
- Créer 1 vidéo de 10 secondes gratuitement
- Explorer toutes les fonctionnalités du site

## Configuration future

### 1. Authentification avec Clerk

#### Pourquoi Clerk ?
- Interface utilisateur prête à l'emploi
- Support de Google OAuth, email/password, etc.
- Gestion complète des sessions
- Facile à intégrer avec Next.js

#### Installation

```bash
npm install @clerk/nextjs
```

#### Configuration

1. Créez un compte sur [https://clerk.com](https://clerk.com)
2. Créez une nouvelle application
3. Copiez vos clés dans `.env.local` :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

4. Modifiez `frontend/src/app/layout.tsx` :

```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="fr" className="dark">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

5. Activez le UserMenu avec authentification dans `frontend/src/components/auth/UserMenu.tsx` :

Remplacez l'export par défaut par le code commenté qui utilise Clerk.

### 2. Backend avec Supabase

#### Pourquoi Supabase ?
- Base de données PostgreSQL gratuite
- API REST automatique
- Row Level Security (RLS)
- Stockage de fichiers intégré

#### Installation

Les packages sont déjà installés. Créez simplement votre projet.

#### Configuration

1. Créez un compte sur [https://supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Copiez vos clés dans `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
```

4. Exécutez le SQL suivant dans l'éditeur SQL de Supabase :

```sql
-- Table des profils utilisateurs
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des crédits utilisateurs
CREATE TABLE user_credits (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  image_credits INTEGER DEFAULT 0,
  video_credits INTEGER DEFAULT 0,
  game_credits INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des transactions
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  credits_purchased INTEGER NOT NULL,
  credit_type TEXT NOT NULL CHECK (credit_type IN ('image', 'video', 'game', 'bundle')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('stripe', 'paypal')),
  payment_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);
```

### 3. Paiements avec Stripe

#### Installation

```bash
npm install @stripe/stripe-js stripe
```

#### Configuration

1. Créez un compte sur [https://stripe.com](https://stripe.com)
2. Activez le mode test
3. Copiez vos clés dans `.env.local` :

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

4. Créez les produits dans le dashboard Stripe :
   - Plan Starter : $9.99/mois
   - Plan Pro : $29.99/mois
   - Packs de crédits à la carte

#### API Routes pour Stripe

Créez `frontend/src/app/api/checkout/route.ts` :

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  const { priceId, userId } = await request.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription', // ou 'payment' pour les packs
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: { userId },
  })

  return NextResponse.json({ url: session.url })
}
```

Créez également `frontend/src/app/api/webhooks/stripe/route.ts` pour gérer les webhooks.

### 4. Synchronisation Clerk + Supabase

Pour synchroniser les utilisateurs de Clerk avec Supabase :

1. Dans Clerk Dashboard, allez dans Webhooks
2. Créez un webhook pour `user.created`
3. URL : `https://votre-api.com/webhooks/clerk`
4. Dans votre API, créez l'endpoint qui :
   - Reçoit l'événement de création d'utilisateur
   - Crée le profil dans Supabase
   - Initialise les crédits

## Architecture finale

```
┌─────────────┐
│  Clerk      │  ← Authentification
│  (Auth)     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Next.js    │  ← Frontend
│  Frontend   │
└──────┬──────┘
       │
       ├──────────────────┐
       ↓                  ↓
┌─────────────┐    ┌─────────────┐
│  Stripe     │    │  Supabase   │
│  (Payment)  │    │  (Database) │
└─────────────┘    └─────────────┘
```

## Mode Démo vs Mode Production

### Mode Démo (actuel)
- ✅ Fonctionne sans configuration
- ✅ 1 image + 1 vidéo gratuites
- ✅ Toutes les fonctionnalités visibles
- ❌ Pas de persistance des données
- ❌ Pas de paiements réels

### Mode Production (après config)
- ✅ Authentification complète avec Clerk
- ✅ Stockage persistant avec Supabase
- ✅ Paiements réels avec Stripe
- ✅ Gestion des crédits
- ✅ Historique des transactions

## Prochaines étapes

1. **Immédiat** : Tester le site en mode démo
2. **Court terme** : Configurer Clerk pour l'authentification
3. **Moyen terme** : Configurer Supabase pour la persistance
4. **Long terme** : Activer Stripe pour les paiements réels

## Support

Pour toute question :
- [Documentation Clerk](https://clerk.com/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)
