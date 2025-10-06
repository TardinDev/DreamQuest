# 🚀 Démarrer DreamQuest

## ✅ Structure avec src/

```
frontend/
  src/
    app/          # Pages Next.js
    components/   # Composants React
    lib/          # Utils, API, store
```

## Option 1 : Frontend SEULEMENT (Recommandé pour tester l'UI)

```bash
npm run dev:frontend
```

✅ Ouvre http://localhost:3000

## Option 2 : Frontend + Backend complet

**1. Installer les dépendances Python (première fois):**
```bash
cd api
pip install -r requirements.txt
cd ..
```

**2. Démarrer Redis:**
```bash
# Nouveau terminal
redis-server
```

**3. Lancer frontend + backend:**
```bash
npm run dev
```

✅ Frontend: http://localhost:3000
✅ Backend API: http://localhost:8000

## ⚡ Commandes rapides

| Commande | Description |
|----------|-------------|
| `npm run dev:frontend` | Frontend seul (port 3000) |
| `npm run dev:api` | Backend seul (port 8000) |
| `npm run dev` | Frontend + Backend ensemble |
| `npm run lint` | Lint tout le code |
| `npm run test` | Lancer tous les tests |

## 🔧 Si tu as des erreurs

### "concurrently: command not found"
```bash
npm install
```

### "Redis connection failed"
```bash
# Installer Redis (macOS)
brew install redis
redis-server
```

### "Module 'fastapi' not found"
```bash
cd api
pip install -r requirements.txt
```

---

**Pour tester l'UI rapidement → `npm run dev:frontend`** ✨
