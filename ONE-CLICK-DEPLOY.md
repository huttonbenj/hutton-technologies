# ⚡ ONE-CLICK DEPLOY

## You're Almost There! 🎉

I've automated 95% of the deployment. You just need to:

### Step 1: Create GitHub Repo (30 seconds)
A browser window should have opened. If not, go to:
**https://github.com/new**

1. Repository name: `hutton-technologies`
2. Keep it **Public**
3. Do **NOT** check "Initialize this repository with a README"
4. Click **"Create repository"**

### Step 2: Get Your GitHub Username
What's your GitHub username? (e.g., "benh" or "benhutton")

I need this to push the code.

### Step 3: Run This Command
Once you have the repo created, run:

```bash
cd /Users/benh/GitHub/hutton-technologies

# Replace YOUR_GITHUB_USERNAME with your actual username
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/hutton-technologies.git
git push -u origin main

# Then run the deployment
./auto-deploy.sh
```

---

## OR: Super Simple Alternative

If you want me to handle GitHub too, create a Personal Access Token:

1. Go to: https://github.com/settings/tokens/new
2. Note: "Hutton Technologies Deployment"
3. Expiration: 30 days
4. Check: ☑️ **repo** (all repo permissions)
5. Click "Generate token"
6. Copy the token (starts with `ghp_...`)

Then tell me the token and I'll do everything!

---

## What Happens Next?

Once the code is on GitHub, the automated script will:
- ✅ Deploy to Digital Ocean ($10/month)
- ✅ Configure Cloudflare DNS  
- ✅ Set up SSL certificates
- ✅ Launch your site at **huttontechnologies.com**

Total time: ~10-15 minutes! 🚀
