# 🚀 Deployment Guide - Hutton Technologies

## Prerequisites
- ✅ Domain registered: **huttontechnologies.com** (Cloudflare)
- ✅ Digital Ocean account with access token
- ✅ Cloudflare API token
- ✅ GitHub repository

---

## Deployment Options

### Option 1: Digital Ocean App Platform (Recommended - Easiest)

#### Step 1: Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Hutton Technologies website"

# Create GitHub repo and push
gh repo create hutton-technologies --public --source=. --remote=origin --push
# OR manually create repo on GitHub and:
git remote add origin https://github.com/YOUR_USERNAME/hutton-technologies.git
git push -u origin main
```

#### Step 2: Deploy to Digital Ocean
1. Go to [Digital Ocean App Platform](https://cloud.digitalocean.com/apps)
2. Click **"Create App"**
3. Choose **"GitHub"** as source
4. Select your `hutton-technologies` repository
5. Configure:
   - **Backend Service:**
     - Name: `api`
     - Dockerfile: `backend/Dockerfile`
     - HTTP Port: `8000`
     - Instance: Basic ($5/month)
     - Environment Variables:
       ```
       CORS_ORIGINS=https://huttontechnologies.com,https://www.huttontechnologies.com
       ```
   
   - **Frontend Service:**
     - Name: `web`
     - Dockerfile: `frontend/Dockerfile`
     - HTTP Port: `3000`
     - Instance: Basic ($5/month)
     - Environment Variables:
       ```
       NEXT_PUBLIC_API_URL=${api.PUBLIC_URL}
       ```

6. Click **"Next"** → **"Review"** → **"Create Resources"**
7. Wait 5-10 minutes for deployment

#### Step 3: Get Your App URLs
After deployment, you'll get URLs like:
- Frontend: `https://web-xxxxx.ondigitalocean.app`
- Backend: `https://api-xxxxx.ondigitalocean.app`

---

### Step 4: Configure Cloudflare DNS

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select **huttontechnologies.com**
3. Go to **DNS** → **Records**
4. Add these records:

**For Digital Ocean App Platform:**
```
Type: CNAME
Name: @
Content: web-xxxxx.ondigitalocean.app
Proxy: ✅ Proxied (orange cloud)

Type: CNAME
Name: www
Content: web-xxxxx.ondigitalocean.app
Proxy: ✅ Proxied (orange cloud)

Type: CNAME
Name: api
Content: api-xxxxx.ondigitalocean.app
Proxy: ✅ Proxied (orange cloud)
```

5. In Digital Ocean, add custom domain:
   - Go to your app → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `huttontechnologies.com` and `www.huttontechnologies.com`
   - Follow the verification steps

---

## Option 2: Manual Digital Ocean Droplet Deployment

### Step 1: Create Droplet
```bash
# Install doctl (Digital Ocean CLI)
brew install doctl  # macOS

# Authenticate
doctl auth init
# Enter your token: dop_v1_3320e8db17b1e273e25cbd02037de4da04812590101be15f7257a90d4d5b6037

# Create droplet
doctl compute droplet create hutton-tech \
  --image ubuntu-22-04-x64 \
  --size s-1vcpu-1gb \
  --region nyc1 \
  --ssh-keys $(doctl compute ssh-key list --format ID --no-header)
```

### Step 2: SSH and Setup
```bash
# Get droplet IP
doctl compute droplet list

# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Clone repository
git clone https://github.com/YOUR_USERNAME/hutton-technologies.git
cd hutton-technologies
```

### Step 3: Create Production Environment
```bash
# Create .env file
cat > .env << EOF
BACKEND_URL=https://api.huttontechnologies.com
FRONTEND_URL=https://huttontechnologies.com
CORS_ORIGINS=https://huttontechnologies.com,https://www.huttontechnologies.com
EOF
```

### Step 4: Deploy with Docker
```bash
# Build and run backend
cd backend
docker build -t hutton-backend .
docker run -d -p 8000:8000 --name backend \
  -e CORS_ORIGINS="https://huttontechnologies.com,https://www.huttontechnologies.com" \
  hutton-backend

# Build and run frontend
cd ../frontend
docker build -t hutton-frontend \
  --build-arg NEXT_PUBLIC_API_URL=https://api.huttontechnologies.com .
docker run -d -p 3000:3000 --name frontend hutton-frontend
```

### Step 5: Setup Nginx Reverse Proxy
```bash
# Install Nginx
apt install nginx -y

# Configure Nginx
cat > /etc/nginx/sites-available/hutton << EOF
# API subdomain
server {
    listen 80;
    server_name api.huttontechnologies.com;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
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
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/hutton /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 6: Setup SSL with Let's Encrypt
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificates
certbot --nginx -d huttontechnologies.com -d www.huttontechnologies.com -d api.huttontechnologies.com
```

---

## Quick Deploy Script

I've created a deployment script for you:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Post-Deployment Checklist

✅ **Test the site:**
- https://huttontechnologies.com
- https://www.huttontechnologies.com  
- https://api.huttontechnologies.com/health

✅ **Test email signup** on the coming soon page

✅ **Check all social links** work correctly

✅ **Verify SSL certificates** (should show padlock in browser)

✅ **Monitor application:**
- Digital Ocean Dashboard → Your App → Metrics
- Check logs for any errors

---

## Monitoring & Maintenance

### View Logs
```bash
# Digital Ocean App Platform
doctl apps logs YOUR_APP_ID --type build
doctl apps logs YOUR_APP_ID --type run

# Manual Droplet
docker logs backend
docker logs frontend
```

### Update Deployment
```bash
# Push changes to GitHub
git add .
git commit -m "Update website"
git push

# Digital Ocean App Platform auto-deploys from GitHub!
# Or trigger manual deployment from dashboard
```

### Backup Waitlist Data
The waitlist is currently stored in memory. To persist:
1. Add a database (PostgreSQL) in Digital Ocean
2. Update backend to use database instead of in-memory list
3. Regular backups via Digital Ocean

---

## Cost Estimate

**Digital Ocean App Platform (Recommended):**
- Frontend service: $5/month (Basic)
- Backend service: $5/month (Basic)
- **Total: ~$10-12/month**

**Manual Droplet:**
- 1 GB RAM / 1 vCPU: $6/month
- **Total: ~$6/month** (but requires more manual setup)

---

## Troubleshooting

### Issue: CORS errors
**Fix:** Update CORS_ORIGINS in backend environment variables

### Issue: 502 Bad Gateway
**Fix:** Check if backend is running: `docker ps` or app logs

### Issue: Domain not resolving
**Fix:** Check Cloudflare DNS settings, wait 24-48h for propagation

---

## Next Steps After Deployment

1. **Add Database** for persistent storage
2. **Setup Monitoring** (Digital Ocean Monitoring or external)
3. **Add Analytics** (Google Analytics, Plausible, etc.)
4. **Email Service** to actually send notification emails
5. **Launch full site** when ready (uncomment components in page.tsx)

---

**Need help?** Check Digital Ocean docs or Cloudflare support!
