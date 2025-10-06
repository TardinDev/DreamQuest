# Contributing to DreamQuest

Thank you for your interest in contributing to DreamQuest! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We're building a welcoming community.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Use the bug report template
- Include steps to reproduce
- Include screenshots if applicable
- Mention your environment (OS, browser, etc.)

### Suggesting Features

- Use the GitHub issue tracker
- Use the feature request template
- Describe the use case clearly
- Consider providing mockups or examples

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make your changes** following the code style guidelines
4. **Write tests** for your changes
5. **Run tests** locally:
   ```bash
   npm run test          # Frontend
   cd api && pytest      # Backend
   ```
6. **Commit** your changes with a clear message:
   ```bash
   git commit -m "feat: add new feature X"
   ```
7. **Push** to your fork:
   ```bash
   git push origin feature/my-feature
   ```
8. **Open a Pull Request** against `main`

## Development Setup

See [README.md](./README.md#quick-start) for detailed setup instructions.

Quick start:
```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..
cd api && pip install -r requirements.txt && cd ..

# Start Redis
redis-server

# Start all services
npm run dev
```

## Code Style

### Frontend (TypeScript/React)

- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use functional components and hooks
- Use Tailwind CSS for styling
- Format with Prettier before committing

```bash
npm run lint
npm run format
```

### Backend (Python)

- Follow PEP 8
- Use type hints (mypy)
- Use Pydantic for data validation
- Format with Ruff

```bash
cd api
ruff check .
ruff format .
mypy .
```

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug in X
docs: update documentation
style: format code
refactor: refactor component X
test: add tests for Y
chore: update dependencies
```

## Testing

All new features and bug fixes should include tests.

### Frontend Tests

```bash
cd frontend

# Unit tests (Vitest)
npm run test

# E2E tests (Playwright)
npm run test:e2e
```

### Backend Tests

```bash
cd api

# Run pytest
pytest -v

# With coverage
pytest --cov=. --cov-report=html
```

## Documentation

- Update README.md if you change functionality
- Update API.md if you add/change endpoints
- Add JSDoc comments for complex functions
- Update ARCHITECTURE.md for architectural changes

## Review Process

1. PRs require at least 1 approval
2. All CI checks must pass
3. Code must be formatted and linted
4. Tests must pass
5. No merge conflicts with `main`

## Questions?

Feel free to:
- Open a GitHub issue with the "question" label
- Join our Discord server
- Email support@dreamquest.example.com

Thank you for contributing! 🙏
