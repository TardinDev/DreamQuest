# 📂 Structure du Projet DreamQuest

## 🎯 Architecture Monorepo

```
DreamQuest/
├── 📄 Configuration Racine
│   ├── package.json              # Scripts npm monorepo
│   ├── package-lock.json         # Lock file npm
│   ├── .gitignore               # Git ignore
│   ├── .prettierrc              # Prettier config
│   ├── .env.example             # Variables d'environnement exemple
│   └── Makefile                 # Commandes make (up, down, test)
│
├── 📚 Documentation
│   ├── README.md                # Documentation principale
│   ├── START.md                 # Guide démarrage rapide
│   ├── QUICKSTART.md            # Guide installation
│   ├── DEMARRAGE_LOCAL.md       # Guide local FR
│   ├── CONTRIBUTING.md          # Guide contribution
│   ├── LICENSE                  # Licence MIT
│   ├── PROJECT_SUMMARY.md       # Résumé du projet
│   └── STRUCTURE.md             # Ce fichier
│
├── 📁 docs/                     # Documentation détaillée
│   ├── ARCHITECTURE.md          # Architecture système
│   └── API.md                   # Documentation API
│
├── 🎨 frontend/                 # Application Next.js 15
│   ├── src/
│   │   ├── app/                 # Pages App Router
│   │   │   ├── page.tsx         # Page d'accueil
│   │   │   ├── layout.tsx       # Layout global
│   │   │   ├── globals.css      # Styles globaux
│   │   │   └── dreamquest/      # Pages DreamQuest
│   │   │       ├── page.tsx     # Page principale
│   │   │       ├── gallery/     # Galerie publique
│   │   │       └── play/[jobId] # Viewer partagé
│   │   │
│   │   ├── components/          # Composants React
│   │   │   ├── DreamForm.tsx    # Formulaire de rêve
│   │   │   ├── JobProgress.tsx  # Suivi de progression
│   │   │   ├── WebGLViewer.tsx  # Viewer WebGL
│   │   │   ├── DreamHistory.tsx # Historique
│   │   │   └── ui/              # Composants UI (shadcn/ui)
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input.tsx
│   │   │       └── ...
│   │   │
│   │   └── lib/                 # Utilities
│   │       ├── api.ts           # Client API + polling
│   │       ├── store.ts         # State Zustand
│   │       ├── validations.ts   # Schémas Zod
│   │       └── utils.ts         # Helpers
│   │
│   ├── tests/                   # Tests
│   │   ├── lib/                 # Tests unitaires
│   │   ├── e2e/                 # Tests E2E Playwright
│   │   └── setup.ts
│   │
│   ├── public/                  # Assets statiques
│   │   ├── webgl/               # Builds Unity WebGL
│   │   └── uploads/             # Uploads utilisateur
│   │
│   ├── package.json             # Dépendances frontend
│   ├── tsconfig.json            # TypeScript config
│   ├── next.config.ts           # Config Next.js
│   ├── tailwind.config.ts       # Config Tailwind
│   ├── vitest.config.ts         # Config Vitest
│   └── playwright.config.ts     # Config Playwright
│
├── ⚙️ api/                       # Backend FastAPI
│   ├── main.py                  # Point d'entrée
│   ├── schemas.py               # Modèles Pydantic
│   ├── routes/                  # Routes API
│   │   ├── __init__.py
│   │   ├── jobs.py              # POST/GET jobs
│   │   └── transcribe.py        # Transcription audio
│   ├── tests/                   # Tests pytest
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   └── test_api.py
│   ├── requirements.txt         # Dépendances Python
│   ├── pyproject.toml           # Config Ruff/mypy
│   └── pytest.ini               # Config pytest
│
├── 🔄 workers/                   # Workers asynchrones
│   ├── __init__.py
│   ├── orchestrator.py          # Pipeline de génération
│   └── requirements.txt         # Dépendances Python
│
├── 🎮 unity/                     # Projet Unity
│   ├── Assets/
│   │   └── Scripts/
│   │       └── BlueprintLoader.cs  # Loader blueprint C#
│   ├── StreamingAssets/
│   │   └── blueprint.json       # Blueprint test
│   └── README.md                # Doc Unity
│
├── 🐳 infra/                     # Infrastructure
│   ├── docker-compose.yml       # Compose production
│   ├── docker-compose.dev.yml   # Compose dev
│   ├── Dockerfile.frontend      # Image Next.js
│   ├── Dockerfile.api           # Image FastAPI
│   ├── Dockerfile.worker        # Image Worker
│   └── nginx.conf               # Config nginx
│
└── 🔧 .github/                   # CI/CD
    ├── workflows/
    │   ├── ci.yml               # Tests + lint
    │   └── deploy.yml           # Déploiement
    └── ISSUE_TEMPLATE/          # Templates issues
        ├── bug_report.md
        └── feature_request.md
```

## 📊 Statistiques

- **Fichiers TypeScript:** 29
- **Fichiers Python:** 8
- **Fichiers C#:** 1
- **Composants React:** 14
- **Pages Next.js:** 5
- **Tests:** 15+

## 🔗 Dépendances

### Frontend
- Next.js 15.5.4
- React 19.0.0
- TypeScript 5.7.3
- Tailwind CSS 3.4.17
- Zustand 5.0.2
- Zod 3.23.8

### Backend
- FastAPI 0.115.0
- Pydantic 2.9.0
- Redis 5.1.0
- RQ 1.16.2

### Outils
- Docker + docker-compose
- GitHub Actions
- Playwright + Vitest
- pytest

## ✅ Vérification

```bash
# Aucun doublon ✓
# Structure src/ correcte ✓
# Tests configurés ✓
# Docker ready ✓
# CI/CD configurée ✓
```

## 🚀 Commandes

```bash
# Frontend
npm run dev:frontend

# Backend complet
npm run dev

# Tests
npm run test

# Docker
make up
```

---

**Structure validée et nettoyée** ✨
