.PHONY: help up down restart logs test clean install

help:
	@echo "DreamQuest - Makefile commands:"
	@echo "  make install  - Install all dependencies"
	@echo "  make up       - Start all services with docker-compose"
	@echo "  make down     - Stop all services"
	@echo "  make restart  - Restart all services"
	@echo "  make logs     - Show logs from all services"
	@echo "  make test     - Run all tests"
	@echo "  make clean    - Clean build artifacts and caches"

install:
	npm install
	cd frontend && npm install
	cd api && pip install -r requirements.txt

up:
	docker-compose -f infra/docker-compose.yml up -d

down:
	docker-compose -f infra/docker-compose.yml down

restart:
	docker-compose -f infra/docker-compose.yml restart

logs:
	docker-compose -f infra/docker-compose.yml logs -f

test:
	npm run test

clean:
	rm -rf node_modules frontend/node_modules frontend/.next frontend/out
	rm -rf api/__pycache__ workers/__pycache__
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
