# CR Chatbot - Docker Setup Guide

This guide provides comprehensive instructions for deploying CR Chatbot using Docker containers.

## Quick Start

The fastest way to get CR Chatbot running with Docker:

```bash
# Clone and start
git clone https://github.com/3eekeeper/cr-chatbot.git
cd cr-chatbot
docker-compose up -d

# Access at http://localhost:8080
```

## Docker Compose (Recommended)

### Basic Setup
```bash
# Start CR Chatbot only
docker-compose up -d cr-chatbot

# View logs
docker-compose logs -f cr-chatbot

# Stop services
docker-compose down
```

### Full Stack with Ollama
To run both CR Chatbot and Ollama together:

1. Edit `docker-compose.yml` and uncomment the Ollama service:
```yaml
# Uncomment these lines:
ollama:
  image: ollama/ollama:latest
  # ... rest of configuration
```

2. Start both services:
```bash
docker-compose up -d
```

3. Pull a model (one-time setup):
```bash
# Pull a model into Ollama
docker-compose exec ollama ollama pull llama3.2
```

4. Access the services:
- CR Chatbot: http://localhost:8080
- Ollama API: http://localhost:11434

## Manual Docker Commands

### Build and Run
```bash
# Build the image
docker build -t cr-chatbot .

# Run the container
docker run -d \
  --name cr-chatbot \
  -p 8080:80 \
  --restart unless-stopped \
  cr-chatbot

# View logs
docker logs -f cr-chatbot

# Stop and remove
docker stop cr-chatbot
docker rm cr-chatbot
```

### Custom Port
```bash
# Run on port 3000 instead
docker run -d \
  --name cr-chatbot \
  -p 3000:80 \
  cr-chatbot
```

## Production Deployment

### Optimized Build
```bash
# Build production image
docker build \
  -t cr-chatbot:prod \
  --build-arg NODE_ENV=production \
  .

# Run with production settings
docker run -d \
  --name cr-chatbot-prod \
  --restart unless-stopped \
  -p 80:80 \
  --memory=128m \
  --cpus=0.5 \
  cr-chatbot:prod
```

### Behind Reverse Proxy
For production deployments behind nginx or Apache:

```bash
# Run on internal port
docker run -d \
  --name cr-chatbot-internal \
  --restart unless-stopped \
  -p 127.0.0.1:8080:80 \
  cr-chatbot:prod
```

## Environment Variables

You can customize the deployment using environment variables:

```bash
docker run -d \
  --name cr-chatbot \
  -p 8080:80 \
  -e NGINX_HOST=localhost \
  -e NGINX_PORT=80 \
  cr-chatbot
```

## Persistent Storage

### Save Configurations
```bash
# Create volume for persistent config
docker volume create cr-chatbot-config

# Run with volume mount
docker run -d \
  --name cr-chatbot \
  -p 8080:80 \
  -v cr-chatbot-config:/usr/share/nginx/html/config \
  cr-chatbot
```

## Health Checks

The Docker image includes health checks:

```bash
# Check container health
docker ps

# View health check logs
docker inspect --format='{{json .State.Health}}' cr-chatbot
```

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker logs cr-chatbot

# Inspect configuration
docker inspect cr-chatbot
```

### Port Already In Use
```bash
# Find what's using the port
lsof -i :8080

# Use different port
docker run -d -p 8081:80 --name cr-chatbot cr-chatbot
```

### Ollama Connection Issues
```bash
# Verify Ollama is running
docker-compose ps

# Check Ollama logs
docker-compose logs ollama

# Test Ollama API
curl http://localhost:11434/api/tags
```

## Updates

### Update CR Chatbot
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Update Base Images
```bash
# Update nginx base image
docker pull nginx:alpine

# Rebuild with latest base
docker build --no-cache -t cr-chatbot .
```

## Resource Usage

- **Memory**: ~50MB (nginx + static files)
- **CPU**: Minimal (static content serving)
- **Storage**: ~10MB (container image)
- **Network**: Port 80/8080 for HTTP

## Security Considerations

1. **HTTPS**: Use reverse proxy for SSL termination
2. **Firewall**: Restrict access to necessary ports only
3. **Updates**: Keep base images updated regularly
4. **Networks**: Use Docker networks for internal communication

## Development

### Development with Hot Reload
```bash
# Mount source code for development
docker run -d \
  --name cr-chatbot-dev \
  -p 8080:80 \
  -v $(pwd)/cr-chatbot:/usr/share/nginx/html/cr-chatbot \
  cr-chatbot
```

### Debug Mode
```bash
# Run with debug logging
docker run -d \
  --name cr-chatbot-debug \
  -p 8080:80 \
  -e NGINX_LOG_LEVEL=debug \
  cr-chatbot
```

## Multi-Architecture Support

The Docker image supports multiple architectures:

```bash
# Build for ARM64 (Apple Silicon, Raspberry Pi)
docker buildx build \
  --platform linux/arm64 \
  -t cr-chatbot:arm64 .

# Build for AMD64 (Intel/AMD)
docker buildx build \
  --platform linux/amd64 \
  -t cr-chatbot:amd64 .
```

## Integration Examples

### With Traefik
```yaml
version: '3.8'
services:
  cr-chatbot:
    build: .
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.cr-chatbot.rule=Host(`chatbot.example.com`)"
      - "traefik.http.routers.cr-chatbot.tls.certresolver=letsencrypt"
```

### With Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cr-chatbot
spec:
  replicas: 2
  selector:
    matchLabels:
      app: cr-chatbot
  template:
    metadata:
      labels:
        app: cr-chatbot
    spec:
      containers:
      - name: cr-chatbot
        image: cr-chatbot:latest
        ports:
        - containerPort: 80
```

## Support

For Docker-specific issues:
1. Check container logs: `docker logs cr-chatbot`
2. Verify network connectivity: `docker network ls`
3. Test health check: `docker exec cr-chatbot curl http://localhost/`
4. Review resource usage: `docker stats cr-chatbot`

For application issues, see the main [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
