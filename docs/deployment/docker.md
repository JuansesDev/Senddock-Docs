---
sidebar_position: 1
---

# Quick Start with Docker

## ✅ Validate Configuration

```bash
./validate-docker.sh
```

## 🚀 Quick Start

### Option 1: With Make (Recommended)

```bash
# View available commands
make help

# Build and run
make build
make up

# View logs
make logs
```

### Option 2: With Docker Compose

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📋 Initial Configuration

1. **Copy environment variables:**
   ```bash
   cp env.example .env
   ```

2. **Generate secrets:**
   ```bash
   # NEXTAUTH_SECRET
   openssl rand -base64 32

   # ENCRYPTION_KEY
   openssl rand -hex 32
   ```

3. **Edit `.env` with your values**

## 🔍 Health Check

```bash
curl http://localhost:3000/api/health
```

## 🆘 Useful Commands

```bash
# View status
make ps

# DB Backup
make backup-db

# Migrations
make migrate

# Clean everything
make clean
```

## 📦 Important Files

- ✅ `Dockerfile` - Image configuration
- ✅ `docker-compose.yml` - Service orchestration
- ✅ `.env` - Environment variables
- ✅ `Makefile` - Automation commands
