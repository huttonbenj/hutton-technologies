#!/bin/bash

set -e

echo "🚀 Hutton Technologies - Automated Deployment"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load tokens from .env.production
if [ -f .env.production ]; then
    source .env.production
else
    echo -e "${RED}Error: .env.production not found${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1/5: Checking prerequisites...${NC}"
echo ""

# Check if GitHub CLI is available
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}GitHub CLI not found. You'll need to create the repo manually.${NC}"
    echo ""
    echo "Please:"
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: hutton-technologies"
    echo "3. Make it Public"
    echo "4. Do NOT initialize with README"
    echo "5. Click 'Create repository'"
    echo ""
    read -p "Press Enter once you've created the repository..."
    
    # Get GitHub username
    read -p "Enter your GitHub username: " GITHUB_USER
else
    echo -e "${GREEN}✓ GitHub CLI found${NC}"
    # Create repo with gh
    echo "Creating GitHub repository..."
    gh repo create hutton-technologies --public --description "Hutton Technologies website" --source=. || true
    GITHUB_USER=$(gh api user --jq .login)
fi

echo ""
echo -e "${BLUE}Step 2/5: Pushing code to GitHub...${NC}"

# Add remote if it doesn't exist
if ! git remote | grep -q origin; then
    git remote add origin https://github.com/${GITHUB_USER}/hutton-technologies.git
fi

# Push to GitHub
git push -u origin main --force

echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
echo ""

echo -e "${BLUE}Step 3/5: Creating Digital Ocean App...${NC}"
echo ""

# Create Digital Ocean app via API
cat > /tmp/app-spec.json << EOF
{
  "name": "hutton-technologies",
  "region": "nyc",
  "services": [
    {
      "name": "api",
      "github": {
        "repo": "${GITHUB_USER}/hutton-technologies",
        "branch": "main",
        "deploy_on_push": true
      },
      "dockerfile_path": "backend/Dockerfile",
      "source_dir": "/",
      "http_port": 8000,
      "instance_count": 1,
      "instance_size_slug": "basic-xxs",
      "routes": [{"path": "/"}],
      "envs": [
        {
          "key": "CORS_ORIGINS",
          "value": "https://huttontechnologies.com,https://www.huttontechnologies.com",
          "scope": "RUN_TIME"
        }
      ]
    },
    {
      "name": "web",
      "github": {
        "repo": "${GITHUB_USER}/hutton-technologies",
        "branch": "main",
        "deploy_on_push": true
      },
      "dockerfile_path": "frontend/Dockerfile",
      "source_dir": "/",
      "http_port": 3000,
      "instance_count": 1,
      "instance_size_slug": "basic-xxs",
      "routes": [{"path": "/"}],
      "build_command": "npm run build",
      "envs": [
        {
          "key": "NEXT_PUBLIC_API_URL",
          "value": "\${api.PUBLIC_URL}",
          "scope": "BUILD_AND_RUN_TIME"
        }
      ]
    }
  ],
  "domains": [
    {
      "domain": "huttontechnologies.com",
      "type": "PRIMARY"
    },
    {
      "domain": "www.huttontechnologies.com",
      "type": "ALIAS"
    }
  ]
}
EOF

# Create app on Digital Ocean
echo "Creating app on Digital Ocean..."
APP_RESPONSE=$(curl -s -X POST "https://api.digitalocean.com/v2/apps" \
  -H "Authorization: Bearer ${DO_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @/tmp/app-spec.json)

APP_ID=$(echo $APP_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('app', {}).get('id', 'ERROR'))")

if [ "$APP_ID" == "ERROR" ]; then
    echo -e "${RED}Error creating app on Digital Ocean${NC}"
    echo $APP_RESPONSE | python3 -m json.tool
    exit 1
fi

echo -e "${GREEN}✓ App created with ID: ${APP_ID}${NC}"
echo ""

# Wait for initial deployment
echo "Waiting for initial deployment (this may take 5-10 minutes)..."
echo "You can monitor progress at: https://cloud.digitalocean.com/apps/${APP_ID}"
echo ""

sleep 30  # Give it a moment to start

# Check deployment status
for i in {1..20}; do
    STATUS=$(curl -s -X GET "https://api.digitalocean.com/v2/apps/${APP_ID}" \
      -H "Authorization: Bearer ${DO_TOKEN}" | \
      python3 -c "import sys, json; print(json.load(sys.stdin).get('app', {}).get('live_url', 'deploying'))")
    
    if [ "$STATUS" != "deploying" ] && [ "$STATUS" != "" ]; then
        echo -e "${GREEN}✓ App deployed!${NC}"
        APP_URL=$STATUS
        break
    fi
    
    echo "Still deploying... (attempt $i/20)"
    sleep 30
done

echo ""
echo -e "${BLUE}Step 4/5: Configuring Cloudflare DNS...${NC}"
echo ""

# Get Cloudflare Zone ID
ZONE_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=huttontechnologies.com" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json")

ZONE_ID=$(echo $ZONE_RESPONSE | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['result'][0]['id'] if data.get('result') else 'ERROR')")

if [ "$ZONE_ID" == "ERROR" ]; then
    echo -e "${RED}Error: Could not find zone for huttontechnologies.com${NC}"
    echo "Please add your domain to Cloudflare first"
    exit 1
fi

echo -e "${GREEN}✓ Found Cloudflare Zone: ${ZONE_ID}${NC}"

# Get Digital Ocean app URLs
API_URL=$(curl -s -X GET "https://api.digitalocean.com/v2/apps/${APP_ID}" \
  -H "Authorization: Bearer ${DO_TOKEN}" | \
  python3 -c "import sys, json; app=json.load(sys.stdin)['app']; services=[s for s in app['spec']['services'] if s['name']=='api']; print(app.get('default_ingress', '').replace('https://', '') if services else 'ERROR')")

WEB_URL=$(curl -s -X GET "https://api.digitalocean.com/v2/apps/${APP_ID}" \
  -H "Authorization: Bearer ${DO_TOKEN}" | \
  python3 -c "import sys, json; app=json.load(sys.stdin)['app']; print(app.get('default_ingress', '').replace('https://', ''))")

# Create DNS records
echo "Creating DNS records..."

# Root domain
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"CNAME\",
    \"name\": \"@\",
    \"content\": \"${WEB_URL}\",
    \"ttl\": 1,
    \"proxied\": true
  }" > /dev/null

echo -e "${GREEN}✓ Created @ record${NC}"

# www subdomain
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"CNAME\",
    \"name\": \"www\",
    \"content\": \"${WEB_URL}\",
    \"ttl\": 1,
    \"proxied\": true
  }" > /dev/null

echo -e "${GREEN}✓ Created www record${NC}"

# api subdomain
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"CNAME\",
    \"name\": \"api\",
    \"content\": \"${API_URL}\",
    \"ttl\": 1,
    \"proxied\": true
  }" > /dev/null

echo -e "${GREEN}✓ Created api record${NC}"

echo ""
echo -e "${BLUE}Step 5/5: Final configuration...${NC}"
echo ""

# Update app with custom domains
curl -s -X PUT "https://api.digitalocean.com/v2/apps/${APP_ID}" \
  -H "Authorization: Bearer ${DO_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"spec\": {
      \"name\": \"hutton-technologies\",
      \"domains\": [
        {\"domain\": \"huttontechnologies.com\", \"type\": \"PRIMARY\"},
        {\"domain\": \"www.huttontechnologies.com\", \"type\": \"ALIAS\"}
      ]
    }
  }" > /dev/null

echo -e "${GREEN}✓ Custom domains configured${NC}"

echo ""
echo -e "${GREEN}=========================================="
echo "🎉 DEPLOYMENT COMPLETE! 🎉"
echo "==========================================${NC}"
echo ""
echo -e "${BLUE}Your website is being deployed to:${NC}"
echo "  • https://huttontechnologies.com"
echo "  • https://www.huttontechnologies.com"
echo "  • https://api.huttontechnologies.com"
echo ""
echo -e "${YELLOW}Note: DNS propagation may take 15-30 minutes${NC}"
echo ""
echo -e "${BLUE}Monitor deployment:${NC}"
echo "  https://cloud.digitalocean.com/apps/${APP_ID}"
echo ""
echo -e "${BLUE}Temporary URLs (available immediately):${NC}"
echo "  • Frontend: https://${WEB_URL}"
echo "  • Backend: https://${API_URL}"
echo ""
echo -e "${GREEN}Total cost: ~\$10-12/month${NC}"
echo ""
echo "✨ All done! Your cyberpunk website is going live! ✨"
