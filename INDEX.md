# 📚 DreamQuest - Index de Documentation

## 🚀 Démarrage Rapide

1. **[START.md](START.md)** ⭐
   - Commandes de démarrage
   - Frontend seul vs complet
   - Dépannage rapide

2. **[FINAL_SETUP.md](FINAL_SETUP.md)** ✅
   - Validation de la structure
   - Fichiers supprimés
   - Points de contrôle

3. **[check-structure.sh](check-structure.sh)** 🔍
   - Script de vérification automatique
   - `./check-structure.sh`

## 📖 Documentation Principale

### Pour Commencer
- **[README.md](README.md)** - Documentation complète du projet
- **[QUICKSTART.md](QUICKSTART.md)** - Guide d'installation rapide
- **[DEMARRAGE_LOCAL.md](DEMARRAGE_LOCAL.md)** - Guide local en français

### Structure & Architecture
- **[STRUCTURE.md](STRUCTURE.md)** - Structure détaillée du projet
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Architecture système
- **[docs/API.md](docs/API.md)** - Documentation API complète

### Développement
- **[TODO.md](TODO.md)** - État du projet et prochaines étapes
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guide de contribution
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Résumé exécutif

### Technique
- **[unity/README.md](unity/README.md)** - Configuration Unity
- **[Makefile](Makefile)** - Commandes make disponibles

## 🎯 Par Cas d'Usage

### "Je veux tester le site"
→ Lis [START.md](START.md)
```bash
npm run dev:frontend
```

### "Je veux comprendre l'architecture"
→ Lis [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

### "Je veux voir la structure des fichiers"
→ Lis [STRUCTURE.md](STRUCTURE.md) ou lance `./check-structure.sh`

### "Je veux développer une feature"
→ Lis [CONTRIBUTING.md](CONTRIBUTING.md) et [TODO.md](TODO.md)

### "Je veux déployer en production"
→ Lis [README.md](README.md) section Deployment

### "Je veux utiliser l'API"
→ Lis [docs/API.md](docs/API.md)

### "Je veux configurer Unity"
→ Lis [unity/README.md](unity/README.md)

## 📋 Checklist Rapide

```bash
# 1. Vérifier la structure
./check-structure.sh

# 2. Installer les dépendances (si pas fait)
npm install

# 3. Lancer le frontend
npm run dev:frontend

# 4. Ouvrir le navigateur
open http://localhost:3000
```

## 🗂️ Organisation des Fichiers

```
📄 Documentation Utilisateur
├── README.md              # Point d'entrée principal
├── START.md              # Démarrage rapide
├── QUICKSTART.md         # Installation
└── DEMARRAGE_LOCAL.md    # Guide FR

📂 Documentation Technique
├── STRUCTURE.md          # Structure projet
├── docs/ARCHITECTURE.md  # Architecture
├── docs/API.md          # API endpoints
└── unity/README.md      # Unity setup

🛠️ Documentation Développeur
├── TODO.md              # État & roadmap
├── CONTRIBUTING.md      # Contribution
├── PROJECT_SUMMARY.md   # Résumé complet
└── FINAL_SETUP.md      # Setup validé

🔧 Outils
├── check-structure.sh   # Vérification auto
├── Makefile            # Commandes make
└── INDEX.md            # Ce fichier
```

## 🔗 Liens Rapides

- **Démarrer:** [START.md](START.md)
- **API Docs:** [docs/API.md](docs/API.md)
- **Architecture:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Structure:** [STRUCTURE.md](STRUCTURE.md)
- **Validation:** `./check-structure.sh`

---

**Commencez par [START.md](START.md) !** 🚀
