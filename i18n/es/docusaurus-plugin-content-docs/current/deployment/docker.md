---
sidebar_position: 1
---

# Inicio Rápido con Docker

## ✅ Validar Configuración

```bash
./validate-docker.sh
```

## 🚀 Inicio Rápido

### Opción 1: Con Make (Recomendado)

```bash
# Ver comandos disponibles
make help

# Construir y ejecutar
make build
make up

# Ver logs
make logs
```

### Opción 2: Con Docker Compose

```bash
# Construir
docker-compose build

# Ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 📋 Configuración Inicial

1. **Copiar variables de entorno:**
   ```bash
   cp env.example .env
   ```

2. **Generar secrets:**
   ```bash
   # NEXTAUTH_SECRET
   openssl rand -base64 32
   
   # ENCRYPTION_KEY
   openssl rand -hex 32
   ```

3. **Editar `.env` con tus valores**

## 🔍 Health Check

```bash
curl http://localhost:3000/api/health
```

## 🆘 Comandos Útiles

```bash
# Ver estado
make ps

# Backup de DB
make backup-db

# Migraciones
make migrate

# Limpiar todo
make clean
```

## 📦 Archivos Importantes

- ✅ `Dockerfile` - Configuración de la imagen
- ✅ `docker-compose.yml` - Orquestación de servicios
- ✅ `.env` - Variables de entorno
- ✅ `Makefile` - Comandos de automatización
