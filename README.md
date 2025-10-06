# 🌙 DreamQuest

Transform your dreams into playable 3D worlds using AI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![CI](https://github.com/yourusername/dreamquest/workflows/CI/badge.svg)

## 🎯 Overview

DreamQuest is a full-stack application that allows users to describe their dreams (via text or audio) and generates playable WebGL worlds based on the description. The system uses AI to parse dream narratives, generate world blueprints, and dynamically construct Unity-based 3D environments.

**Live Demo:** [dreamquest.example.com](https://dreamquest.example.com)

### Key Features

- 📝 **Text or Audio Input** - Describe dreams via text or voice recording
- 🎨 **Customizable Styles** - Low-poly, realistic, cartoon, or surreal visuals
- 🎭 **Mood Settings** - Calm, tense, mystic, or nostalgic atmospheres
- 🎮 **Real-time WebGL** - Fully playable 3D worlds in the browser
- 📊 **Progress Tracking** - Live job status with animated loading states
- 🔗 **Shareable Worlds** - Public links to share generated experiences
- 📱 **Responsive Design** - Works on desktop and mobile

## 🏗️ Architecture

```
/dreamquest
  /frontend       # Next.js 15 App Router + TypeScript + Tailwind
  /api            # FastAPI + Pydantic + Redis
  /workers        # Background job orchestration (RQ)
  /unity          # Unity project + WebGL export scripts
  /infra          # Docker, docker-compose, nginx
  /docs           # Documentation
```

**Tech Stack:**
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand, Zod
- **Backend:** FastAPI, Pydantic, Redis, RQ
- **Unity:** Unity 2022.3 LTS (WebGL export)
- **Infrastructure:** Docker, nginx, GitHub Actions
- **Deployment:** Vercel (frontend), Render/Railway (API)

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed architecture documentation.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- Redis
- Docker & Docker Compose (optional)
- Unity 2022.3+ (for WebGL builds)

### Local Development (without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dreamquest.git
   cd dreamquest
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   cd api && pip install -r requirements.txt && cd ..
   cd workers && pip install -r requirements.txt && cd ..
   ```

3. **Start Redis**
   ```bash
   redis-server
   ```

4. **Start the backend**
   ```bash
   cd api
   uvicorn main:app --reload --port 8000
   ```

5. **Start the worker**
   ```bash
   cd workers
   rq worker --url redis://localhost:6379 dreamquest
   ```

6. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   ```
   http://localhost:3000
   ```

### Docker Development

```bash
# Start all services
make up
# or
docker-compose -f infra/docker-compose.yml up -d

# View logs
make logs

# Stop services
make down
```

## 📖 Usage

1. **Navigate to** `/dreamquest`
2. **Describe your dream** in the text area (minimum 30 characters)
   - Example: "I was flying over a magical forest at night. A glowing bird appeared and guided me to a floating house."
3. **Choose settings:**
   - Visual style: Low-poly, Realistic, Cartoon, or Surreal
   - Mood: Calm, Tense, Mystic, or Nostalgic
   - Duration: Short (5-10 min) or Long (15-30 min)
4. **Click "Generate My Dream World"**
5. **Wait for processing** (analyzing → generating → building → ready)
6. **Play your world** in the embedded WebGL viewer
7. **Share** your creation with a public link

## 🧪 Testing

### Frontend Tests

```bash
cd frontend

# Unit tests (Vitest)
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Lint
npm run lint
```

### Backend Tests

```bash
cd api

# Run pytest
pytest -v

# Lint
ruff check .

# Type check
mypy .
```

## 📦 Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

Set environment variables:
- `NEXT_PUBLIC_API_URL` - Your API URL

### Backend (Render/Railway)

1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r api/requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `REDIS_URL`
   - `CORS_ORIGINS`

### Worker (Render Background Worker)

1. Create a new Background Worker
2. Set start command: `rq worker --url $REDIS_URL dreamquest`

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment guides.

## 🔌 API Documentation

Full API documentation is available at `/docs/API.md` or via FastAPI's built-in docs:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Main Endpoints

- `POST /v1/jobs` - Create new dream generation job
- `GET /v1/jobs/{jobId}` - Get job status and result
- `GET /v1/jobs/{jobId}/blueprint` - Get JSON blueprint for Unity
- `POST /v1/transcribe` - Transcribe audio to text

## 🎨 Unity WebGL Build

1. Open `/unity` folder in Unity 2022.3+
2. Assign prefabs in `BlueprintLoader` component
3. Build Settings → WebGL
4. Build to `/frontend/public/webgl/{jobId}/`

See [unity/README.md](./unity/README.md) for Unity setup details.

## 🛠️ Development

### Project Structure

```
frontend/
  app/              # Next.js App Router pages
  components/       # React components
    ui/            # shadcn/ui base components
    DreamForm.tsx  # Main dream input form
    JobProgress.tsx # Job status tracker
    WebGLViewer.tsx # WebGL iframe wrapper
  lib/              # Utilities, API client, state management
  tests/            # Vitest + Playwright tests

api/
  routes/           # FastAPI route handlers
  schemas.py        # Pydantic models
  main.py           # FastAPI app entrypoint

workers/
  orchestrator.py   # Dream-to-world pipeline

unity/
  Assets/Scripts/   # Unity C# scripts
  StreamingAssets/  # Blueprint JSON files
```

### Code Quality

The project uses:
- **ESLint** + **Prettier** for frontend
- **Ruff** + **mypy** for backend
- **Commitlint** for commit message conventions
- **Husky** for pre-commit hooks

```bash
# Format all code
npm run format

# Lint all code
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Unity for WebGL export capabilities
- FastAPI for the excellent Python framework
- Next.js team for App Router
- shadcn/ui for beautiful components

## 📞 Support

- 📧 Email: support@dreamquest.example.com
- 💬 Discord: [Join our community](https://discord.gg/dreamquest)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/dreamquest/issues)

## 🗺️ Roadmap

- [ ] Real AI integration (OpenAI/Anthropic for parsing, Whisper for transcription)
- [ ] 3D asset generation with SDXL/Stable Diffusion
- [ ] Procedural music generation with MusicGen
- [ ] User authentication with Supabase
- [ ] Public gallery of shared dreams
- [ ] VR support for Oculus/Meta Quest
- [ ] Mobile app (React Native)
- [ ] Multiplayer dream exploration

---

**Made with ❤️ by the DreamQuest team**
