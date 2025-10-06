# 🚀 DreamQuest Quick Start Guide

Get DreamQuest running locally in 5 minutes!

## Prerequisites

- **Node.js 20+** - [Download](https://nodejs.org/)
- **Python 3.11+** - [Download](https://www.python.org/)
- **Redis** - [Installation guide](https://redis.io/docs/getting-started/installation/)

## Installation

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/yourusername/dreamquest.git
cd dreamquest

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies (create virtual env first)
cd api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..

# Install worker dependencies
cd workers
pip install -r requirements.txt
cd ..
```

### 2. Configure Environment

```bash
# Copy example env files
cp .env.example .env
cp frontend/.env.local.example frontend/.env.local

# Edit .env files if needed (defaults work for local dev)
```

### 3. Start Services

**Option A: Using separate terminals (recommended for development)**

Terminal 1 - Redis:
```bash
redis-server
```

Terminal 2 - Backend API:
```bash
cd api
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

Terminal 3 - Worker:
```bash
cd workers
source ../api/venv/bin/activate  # Use same venv
rq worker --url redis://localhost:6379 dreamquest
```

Terminal 4 - Frontend:
```bash
cd frontend
npm run dev
```

**Option B: Using Docker Compose (simpler, but slower for development)**

```bash
# Start only Redis for local development
docker-compose -f infra/docker-compose.dev.yml up -d

# Then start API and frontend manually (Terminals 2-4 from Option A)
```

**Option C: Full Docker stack (for testing production-like environment)**

```bash
docker-compose -f infra/docker-compose.yml up -d
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

API documentation (Swagger UI):
```
http://localhost:8000/docs
```

## Test the Flow

1. Click **"Start Dreaming"** on the homepage
2. Enter a dream description (min 30 characters):
   ```
   I was flying over a magical forest at night. A glowing bird appeared
   and guided me to a floating house. Feathers were falling from the sky like rain.
   ```
3. Select:
   - **Style:** Low Poly
   - **Mood:** Mystic
   - **Duration:** Short
4. Click **"Generate My Dream World"**
5. Watch the progress bar (analyzing → generating → building → ready)
6. When ready, explore your world in the WebGL viewer!

## Troubleshooting

### "Redis connection failed"

Make sure Redis is running:
```bash
redis-cli ping
# Should return: PONG
```

If not installed:
```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis

# Windows
# Download from: https://redis.io/download
```

### "Port 3000 already in use"

Kill the process using port 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or change the port in `frontend/package.json`:
```json
"dev": "next dev -p 3001"
```

### "Module not found" errors (Frontend)

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### "ImportError" or Python module issues (Backend)

```bash
cd api
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### WebGL viewer shows blank screen

The Unity WebGL build is not included in this repository. For development:
1. The app will work without Unity (job will complete but no WebGL world)
2. To add Unity: see [unity/README.md](./unity/README.md)

## Development Workflow

### Run tests

```bash
# Frontend unit tests
cd frontend
npm run test

# Frontend E2E tests
npm run test:e2e

# Backend tests
cd api
pytest -v
```

### Lint and format

```bash
# Frontend
cd frontend
npm run lint
npm run format

# Backend
cd api
ruff check .
ruff format .
```

### Stop all services

```bash
# If using Docker
docker-compose -f infra/docker-compose.yml down

# If running manually, press Ctrl+C in each terminal
```

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for system design
- Review [API.md](./docs/API.md) for API documentation
- See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## Need Help?

- GitHub Issues: [Report a bug](https://github.com/yourusername/dreamquest/issues)
- Discord: [Join our community](https://discord.gg/dreamquest)
- Email: support@dreamquest.example.com

---

**Happy dreaming! 🌙**
