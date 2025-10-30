# Guide de Configuration - Authentification et Paiements DreamQuest

Ce guide vous aidera à configurer l'authentification Supabase et les paiements Stripe/PayPal pour DreamQuest.

## Table des matières

1. [Configuration Supabase](#1-configuration-supabase)
2. [Configuration Stripe](#2-configuration-stripe)
3. [Configuration PayPal](#3-configuration-paypal)
4. [Structure de la base de données](#4-structure-de-la-base-de-données)
5. [Variables d'environnement](#5-variables-denvironnement)
6. [Test du système](#6-test-du-système)

---

## 1. Configuration Supabase

### Étape 1 : Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte et un nouveau projet
3. Notez votre **URL du projet** et votre **clé anon (publique)**

### Étape 2 : Configurer l'authentification

1. Dans votre dashboard Supabase, allez dans **Authentication** → **Providers**
2. Activez **Email** (activé par défaut)
3. Pour **Google OAuth** :
   - Activez Google
   - Suivez les instructions pour créer un OAuth App dans Google Cloud Console
   - Ajoutez les credentials dans Supabase

### Étape 3 : Créer les tables de base de données

Exécutez ce SQL dans l'éditeur SQL de Supabase :

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

-- Table de l'usage gratuit (pour visiteurs)
CREATE TABLE free_usage (
  session_id TEXT PRIMARY KEY,
  ip_address TEXT,
  images_used INTEGER DEFAULT 0,
  videos_used INTEGER DEFAULT 0,
  last_used TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes pour performances
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_free_usage_ip ON free_usage(ip_address);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credits_updated_at BEFORE UPDATE ON user_credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer automatiquement un profil et des crédits
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

  INSERT INTO public.user_credits (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour appeler la fonction à chaque nouvel utilisateur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Policies RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies pour profiles
CREATE POLICY "Utilisateurs peuvent voir leur propre profil"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Utilisateurs peuvent mettre à jour leur propre profil"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies pour user_credits
CREATE POLICY "Utilisateurs peuvent voir leurs propres crédits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

-- Policies pour transactions
CREATE POLICY "Utilisateurs peuvent voir leurs propres transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 2. Configuration Stripe

### Étape 1 : Créer un compte Stripe

1. Allez sur [https://stripe.com](https://stripe.com)
2. Créez un compte et activez les paiements test
3. Dans le dashboard, allez dans **Developers** → **API keys**
4. Notez votre **Publishable key** et **Secret key**

### Étape 2 : Créer les produits

Dans le dashboard Stripe :

1. Allez dans **Products** → **Add product**
2. Créez les produits suivants :

**Plan Starter - 9,99 $/mois**
- Type : Recurring
- Prix : 9.99 USD
- Intervalle : Mensuel

**Plan Pro - 29,99 $/mois**
- Type : Recurring
- Prix : 29.99 USD
- Intervalle : Mensuel

**Packs de crédits** (créez plusieurs produits)
- 25 images - 4.99 USD
- 100 images - 14.99 USD
- etc.

3. Notez les **Price IDs** de chaque produit

### Étape 3 : Configurer les webhooks

1. Dans Stripe, allez dans **Developers** → **Webhooks**
2. Ajoutez un endpoint : `https://votre-domaine.com/api/webhooks/stripe`
3. Sélectionnez les événements :
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Notez le **Signing secret**

---

## 3. Configuration PayPal

### Étape 1 : Créer un compte développeur

1. Allez sur [https://developer.paypal.com](https://developer.paypal.com)
2. Créez un compte et accédez au dashboard
3. Créez une application dans **My Apps & Credentials**
4. Notez votre **Client ID** et **Secret**

### Étape 2 : Configurer les produits PayPal

Utilisez l'API PayPal pour créer des plans d'abonnement similaires à Stripe.

---

## 4. Structure de la base de données

### Tables principales

- **profiles** : Informations utilisateurs
- **user_credits** : Crédits de chaque utilisateur
- **transactions** : Historique des achats
- **free_usage** : Suivi de l'usage gratuit par session/IP

### Relations

```
auth.users (Supabase Auth)
    ↓
profiles (1:1)
    ↓
user_credits (1:1)
    ↓
transactions (1:N)
```

---

## 5. Variables d'environnement

Créez un fichier `.env.local` dans `/frontend` :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs Stripe
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=votre-client-id
PAYPAL_SECRET=votre-secret

# API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 6. Test du système

### Test de l'authentification

1. Lancez le serveur : `npm run dev`
2. Ouvrez http://localhost:3001
3. Cliquez sur "Connexion" dans le header
4. Testez l'inscription avec email
5. Testez la connexion Google OAuth
6. Vérifiez que le profil et les crédits sont créés dans Supabase

### Test du système de crédits

1. Connectez-vous avec un utilisateur
2. Vérifiez que les crédits sont affichés dans le menu utilisateur
3. Créez une image (simulée) et vérifiez que les crédits diminuent
4. Testez les limites gratuites en mode déconnecté

### Test des paiements (mode test Stripe)

1. Allez sur `/pricing`
2. Cliquez sur "Choisir ce Plan" pour un plan payant
3. Utilisez une carte de test Stripe :
   - Numéro : 4242 4242 4242 4242
   - Date : N'importe quelle date future
   - CVC : N'importe quel 3 chiffres
4. Vérifiez que la transaction apparaît dans le dashboard Stripe
5. Vérifiez que les crédits sont ajoutés dans la base de données

---

## Prochaines étapes

1. **Créer les endpoints API** pour gérer les paiements
2. **Implémenter le dashboard utilisateur** pour voir l'historique
3. **Ajouter la logique de déduction de crédits** lors de la génération
4. **Mettre en production** avec les vraies clés Stripe/PayPal
5. **Configurer les webhooks** en production

---

## Support

Pour toute question, consultez :
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)
- [Documentation PayPal](https://developer.paypal.com/docs/)
