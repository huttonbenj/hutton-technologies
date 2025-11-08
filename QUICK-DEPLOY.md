# ⚡ Quick Deploy to Digital Ocean

## 🎯 Goal
Deploy **huttontechnologies.com** to Digital Ocean in under 30 minutes!

---

## ✅ Prerequisites Done
- ✓ Domain: **huttontechnologies.com** (Cloudflare)
- ✓ Digital Ocean Token: Stored in `.env.production`
- ✓ Cloudflare Token: Stored in `.env.production`

---

## 🚀 Deploy in 5 Steps

### Step 1: Push to GitHub (5 min)

```bash
# If you haven't created a GitHub repo yet:
gh repo create hutton-technologies --public --source=. --remote=origin

# Or manually: Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/hutton-technologies.git

# Push the code
./deploy.sh
```

### Step 2: Create Digital Ocean App (10 min)

1. Go to: https://cloud.digitalocean.com/apps
2. Click **"Create App"**
3. Choose **"GitHub"** → Connect → Select `hutton-technologies`
4. Click **"Next"**

**Configure Resources:**

**Backend Service:**
- Name: `api`
- Type: Web Service
- Dockerfile Path: `backend/Dockerfile`
- HTTP Port: `8000`
- Plan: Basic ($5/mo)
- Environment:
  ```
  CORS_ORIGINS=https://huttontechnologies.com,https://www.huttontechnologies.com
  ```

**Frontend Service:**
- Name: `web`  
- Type: Web Service
- Dockerfile Path: `frontend/Dockerfile`
- HTTP Port: `3000`
- Plan: Basic ($5/mo)
- Environment:
  ```
  NEXT_PUBLIC_API_URL=${api.PUBLIC_URL}
  ```

5. Click **"Next"** → **"Create Resources"**
6. Wait 5-10 minutes ⏳

### Step 3: Get Your URLs (1 min)

After deployment, note these URLs:
- Frontend: `https://web-XXXXX.ondigitalocean.app`
- Backend: `https://api-XXXXX.ondigitalocean.app`

Test them in your browser!

### Step 4: Configure Cloudflare DNS (5 min)

1. Go to: https://dash.cloudflare.com/
2. Select **huttontechnologies.com**
3. Click **DNS** → **Records**
4. Add these DNS records:

```
Type: CNAME
Name: @
Target: web-XXXXX.ondigitalocean.app
Proxy: ON (orange cloud)
TTL: Auto

Type: CNAME  
Name: www
Target: web-XXXXX.ondigitalocean.app
Proxy: ON (orange cloud)
TTL: Auto

Type: CNAME
Name: api
Target: api-XXXXX.ondigitalocean.app  
Proxy: ON (orange cloud)
TTL: Auto
```

5. Click **Save** for each record

### Step 5: Add Domain to Digital Ocean (5 min)

1. In Digital Ocean, go to your app
2. Click **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `huttontechnologies.com`
5. Click **"Add Domain"** again
6. Enter: `www.huttontechnologies.com`
7. Follow verification (may take 15-30 minutes)

---

## 🎉 Done!

Your site will be live at:
- **https://huttontechnologies.com**
- **https://www.huttontechnologies.com**
- **https://api.huttontechnologies.com**

---

## 🧪 Test Everything

```bash
# Test frontend
curl https://huttontechnologies.com

# Test backend
curl https://api.huttontechnologies.com/health

# Test API
curl https://api.huttontechnologies.com/api/services
```

---

## 💰 Costs

- **$10-12/month** total
  - Frontend: $5/mo
  - Backend: $5/mo
  - Bandwidth included

---

## 🔄 Update Site

```bash
# Make changes locally
git add .
git commit -m "Update site"
git push

# Digital Ocean auto-deploys! 🎉
# Check deployment progress in dashboard
```

---

## ❓ Troubleshooting

**"Domain not working"**
- Wait 24-48 hours for DNS propagation
- Check Cloudflare DNS settings
- Verify Digital Ocean domain verification

**"502 Bad Gateway"**
- Check app logs in Digital Ocean dashboard
- Verify backend is running
- Check CORS settings

**"Can't push to GitHub"**
- Make sure you created the repo
- Check: `git remote -v`
- Re-add remote if needed

---

## 📚 More Info

See `DEPLOYMENT.md` for advanced options and manual deployment.
