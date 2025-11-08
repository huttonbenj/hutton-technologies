#!/bin/bash

set -e

DROPLET_IP="64.23.254.251"

echo "🚀 Deploying Hutton Technologies to Droplet"
echo "============================================"
echo "IP: ${DROPLET_IP}"
echo ""

echo "📦 Step 1: Copying files to droplet..."
ssh root@${DROPLET_IP} "mkdir -p /opt/hutton-technologies"
scp -r /Users/benh/GitHub/hutton-technologies/* root@${DROPLET_IP}:/opt/hutton-technologies/

echo ""
echo "🐳 Step 2: Installing Docker..."
ssh root@${DROPLET_IP} << 'ENDSSH'
# Update system
apt-get update -y

# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    apt-get install -y docker-compose
fi

# Navigate to app directory
cd /opt/hutton-technologies

# Build and run containers
echo "Building backend..."
cd backend
docker build -t hutton-backend .
docker stop hutton-backend 2>/dev/null || true
docker rm hutton-backend 2>/dev/null || true
docker run -d --name hutton-backend \
  --restart unless-stopped \
  -p 8000:8000 \
  -e CORS_ORIGINS="https://huttontechnologies.com,https://www.huttontechnologies.com,http://64.23.254.251" \
  hutton-backend

echo "Building frontend..."
cd ../frontend
docker build -t hutton-frontend \
  --build-arg NEXT_PUBLIC_API_URL=https://api.huttontechnologies.com .
docker stop hutton-frontend 2>/dev/null || true
docker rm hutton-frontend 2>/dev/null || true
docker run -d --name hutton-frontend \
  --restart unless-stopped \
  -p 3000:3000 \
  hutton-frontend

# Install and configure Nginx
apt-get install -y nginx

# Configure Nginx
cat > /etc/nginx/sites-available/hutton << 'EOF'
# API subdomain
server {
    listen 80;
    server_name api.huttontechnologies.com;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Main domain
server {
    listen 80;
    server_name huttontechnologies.com www.huttontechnologies.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Direct IP access (for testing)
server {
    listen 80 default_server;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/hutton /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Services running:"
docker ps

ENDSSH

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo ""
echo "Your site is now accessible at:"
echo "  • http://${DROPLET_IP} (works immediately)"
echo "  • http://huttontechnologies.com (after DNS update)"
echo ""
echo "Next step: Update Cloudflare DNS to point to ${DROPLET_IP}"
