.PHONY: help build run dev test lint seed docker-build docker-run clean

help:
	@echo "EstateHub Backend Command Reference"
	@echo "  make dev          - Run API server with hot-reload or go run"
	@echo "  make build        - Compile binary to bin/estatehub-api"
	@echo "  make test         - Run all go unit & integration tests"
	@echo "  make docker-build - Build production container image"
	@echo "  make docker-run   - Run container on port 8080"
	@echo "  make clean        - Remove compiled binaries"

build:
	@echo "==> Compiling EstateHub API..."
	@mkdir -p bin
	CGO_ENABLED=0 go build -ldflags="-w -s" -o bin/estatehub-api ./cmd/api

run: build
	@echo "==> Starting EstateHub API server..."
	./bin/estatehub-api

dev:
	@echo "==> Starting API server in development mode..."
	go run ./cmd/api

test:
	@echo "==> Running test suite..."
	go test -v -race ./...

clean:
	@rm -rf bin
