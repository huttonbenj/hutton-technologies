# ✅ Almost Done! Final 5-Minute Steps

## What's Complete:
✅ Code on GitHub: https://github.com/huttonbenj/hutton-technologies  
✅ All configuration files ready  
✅ Dockerfiles created  

## 🚀 Finish Deployment (5 minutes):

### Step 1: Create Digital Ocean App (3 min)

1. **Go to:** https://cloud.digitalocean.com/apps/new

2. **Connect GitHub:**
   - Click "GitHub"
   - Click "Manage Access"
   - Authorize Digital Ocean
   - Select `huttonbenj/hutton-technologies`
   - Click "Next"

3. **Configure Resources:**

   **For Backend (api):**
   - Click "Edit" on the detected service
   - Name: `api`
   - Resource Type: Web Service
   - HTTP Port: `8000`
   - Dockerfile Path: `backend/Dockerfile`
   - Environment Variables → Add:
     - `CORS_ORIGINS` = `https://huttontechnologies.com,https://www.huttontechnologies.com`
   - Plan: Basic ($5/mo)

   **Add Frontend (web):**
   - Click "Add Component" → "Web Service"
   - Same repo: `huttonbenj/hutton-technologies`
   - Name: `web`
   - HTTP Port: `3000`
   - Dockerfile Path: `frontend/Dockerfile`
   - Environment Variables → Add:
     - `NEXT_PUBLIC_API_URL` = `${api.PUBLIC_URL}` (this references the backend)
   - Plan: Basic ($5/mo)

4. **Click "Next"** → **"Create Resources"**

5. **Wait 5-10 minutes** while it deploys! ☕

---

### Step 2: Get Your App URLs (1 min)

Once deployed, Digital Ocean will show you URLs like:
- `https://web-xxxxx.ondigitalocean.app` (Frontend)
- `https://api-xxxxx.ondigitalocean.app` (Backend)

**Test them immediately!** They should work right away.

---

### Step 3: Configure Cloudflare DNS (2 min)

1. **Go to:** https://dash.cloudflare.com/
2. Select **huttontechnologies.com**
3. Go to **DNS** → **Records**
4. **Add these 3 CNAME records:**

```
Record 1:
Type: CNAME
Name: @
Target: web-xxxxx.ondigitalocean.app (your frontend URL, remove https://)
Proxy: ✅ ON (orange cloud)
TTL: Auto

Record 2:
Type: CNAME
Name: www
Target: web-xxxxx.ondigitalocean.app (same as above)
Proxy: ✅ ON (orange cloud)
TTL: Auto

Record 3:
Type: CNAME
Name: api
Target: api-xxxxx.ondigitalocean.app (your backend URL, remove https://)
Proxy: ✅ ON (orange cloud)
TTL: Auto
```

5. **Click "Save"** for each

---

### Step 4: Add Custom Domain in Digital Ocean (1 min)

1. In Digital Ocean, go to your app
2. Click **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `huttontechnologies.com`
5. Click **"Add Domain"** again
6. Enter: `www.huttontechnologies.com`

---

## 🎉 DONE!

Your site will be live at:
- **https://huttontechnologies.com**
- **https://www.huttontechnologies.com**
- **https://api.huttontechnologies.com**

**Note:** DNS can take 15 minutes to 24 hours to fully propagate.

---

## 🧪 Test Right Now:

Use the temporary Digital Ocean URLs (work immediately):
```bash
# Test frontend
curl https://web-xxxxx.ondigitalocean.app

# Test backend
curl https://api-xxxxx.ondigitalocean.app/health
```

---

## 💰 Monthly Cost: ~$10-12

- Frontend: $5/mo
- Backend: $5/mo  
- Bandwidth: Included
- SSL: Free (Cloudflare)

---

## 🔄 Future Updates:

Just push to GitHub:
```bash
git add .
git commit -m "Update site"
git push
```

Digital Ocean auto-deploys! 🎉

---

## ❓ Need Help?

**Stuck?** The Digital Ocean interface is very intuitive and has helpful prompts.  
**Still need help?** Check logs in the Digital Ocean dashboard.

---

**Start here:** https://cloud.digitalocean.com/apps/new

You're literally 5 minutes away from going live! 🚀
