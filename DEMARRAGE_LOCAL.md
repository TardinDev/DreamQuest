# 🚀 Démarrage Local - DreamQuest

## ✅ Le serveur frontend est déjà lancé !

**URL:** http://localhost:3000

## 📋 Commandes pour démarrer

### Option 1: Démarrer uniquement le frontend (RECOMMANDÉ pour tester l'UI)

```bash
# Depuis la racine du projet
npm run dev:frontend
```

Le site sera accessible sur: **http://localhost:3000**

### Option 2: Démarrer frontend + backend (complet)

Pour que l'application fonctionne complètement, tu as besoin de 3 services :

**Terminal 1 - Redis:**
```bash
redis-server
# Si pas installé: brew install redis (macOS)
```

**Terminal 2 - Backend API:**
```bash
cd api
pip install -r requirements.txt  # première fois seulement
uvicorn main:app --reload --port 8000
```

**Terminal 3 - Frontend:**
```bash
npm run dev:frontend
```

**Terminal 4 - Worker (optionnel pour génération de mondes):**
```bash
cd workers
pip install -r requirements.txt  # première fois seulement
rq worker --url redis://localhost:6379 dreamquest
```

### Option 3: Tout en une commande (avec concurrently)

```bash
npm run dev
# Lance frontend + backend ensemble
```

## 🧪 Tester le site

1. **Ouvre ton navigateur:** http://localhost:3000

2. **Page d'accueil:**
   - Tu verras "DreamQuest" avec 2 boutons
   - Clique sur "Start Dreaming"

3. **Page Dream Creation:**
   - Entre un rêve (min 30 caractères)
   - Choisis style/mood/durée
   - Clique "Generate My Dream World"

**Note:** Sans le backend lancé, tu verras une erreur réseau. C'est normal ! L'UI fonctionne quand même.

## 🔍 Vérifier que ça marche

### Frontend seul (UI)
- ✅ Page d'accueil charge
- ✅ Navigation fonctionne
- ✅ Formulaire s'affiche
- ✅ Validation Zod fonctionne

### Avec Backend
- ✅ Création de job API
- ✅ Polling status
- ✅ Génération blueprint

## 📁 Structure simplifiée

```
DreamQuest/
├── frontend/          # Code Next.js (ce qui tourne sur :3000)
│   ├── app/          # Pages
│   ├── components/   # Composants React
│   └── lib/          # Utils, API client
│
├── api/              # Backend FastAPI (lance sur :8000)
├── workers/          # Jobs asynchrones
└── package.json      # Scripts npm racine
```

## 🛠️ Commandes utiles

```bash
# Installer toutes les dépendances
npm install

# Linter le code
npm run lint:frontend

# Lancer les tests
npm run test:frontend

# Build pour production
npm run build:frontend
```

## ❌ Arrêter le serveur

Si lancé en background:
```bash
# Trouve le processus
lsof -ti:3000

# Tue le processus
kill -9 <PID>
```

Si lancé en terminal:
- Appuie sur `Ctrl+C`

## 🐛 Problèmes courants

### "Port 3000 already in use"
```bash
lsof -ti:3000 | xargs kill -9
```

### "Module not found"
```bash
npm install
```

### "Redis connection failed"
Le backend nécessite Redis. Lance `redis-server` dans un terminal séparé.

## 📍 Prochaines étapes

1. ✅ Teste l'UI sur http://localhost:3000
2. 🔧 Lance le backend si tu veux tester le flow complet
3. 📖 Lis `README.md` pour plus de détails
4. 🎨 Commence à customiser !

---

**Le serveur est prêt ! Ouvre http://localhost:3000 dans ton navigateur** 🎉
