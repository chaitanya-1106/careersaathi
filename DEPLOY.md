# 🚀 GitHub Publishing Guide — CareerSaathi

## Step-by-Step: Push to GitHub & Go Live

---

### STEP 1: Install Git (if not installed)

**Windows:**
- Download from https://git-scm.com/download/win
- Install with default settings

**Mac:**
```bash
xcode-select --install
```

**Linux:**
```bash
sudo apt install git
```

---

### STEP 2: Create GitHub Account
- Go to https://github.com
- Sign up for a free account

---

### STEP 3: Create a New Repository

1. Click the **+** icon (top right) → **New repository**
2. Repository name: `careersaathi`
3. Description: `AI Career Advisor for Indian Students`
4. Set to **Public**
5. ✅ Check "Add a README file" → **NO** (we already have one)
6. Click **Create repository**

---

### STEP 4: Upload Your Files

#### Option A: GitHub Web Upload (Easiest — No Terminal Needed)

1. In your new repo, click **"uploading an existing file"**
2. Drag and drop ALL these files/folders:
   ```
   index.html
   css/  (folder)
   js/   (folder)
   README.md
   LICENSE
   .gitignore
   ```
3. Scroll down → Commit message: `Initial release of CareerSaathi`
4. Click **Commit changes**

> **Important**: For folders (css/, js/), drag the entire folder

#### Option B: Terminal / Command Line

```bash
# Navigate to your project folder
cd path/to/careersaathi

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "🚀 Initial release of CareerSaathi"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/careersaathi.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### STEP 5: Enable GitHub Pages (Free Hosting!)

1. Go to your repo on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**: Select **Deploy from a branch**
5. Branch: **main** | Folder: **/ (root)**
6. Click **Save**

✅ Your site will be live at:
```
https://YOUR_USERNAME.github.io/careersaathi
```

> It takes 2-5 minutes for first deployment. Check the **Actions** tab for progress.

---

### STEP 6: Update Your README

Edit `README.md` and replace `yourusername` with your actual GitHub username.

---

## 🔑 About the API Key

The API key is entered by users in their browser and stored in `localStorage`.
**It is NEVER committed to GitHub** — completely safe.

If you want to demo the app yourself, enter your Anthropic API key in the app's Settings (⚙️ icon in chat).

---

## 📝 Custom Domain (Optional)

If you have a domain like `careersaathi.in`:
1. In GitHub Pages settings, add your custom domain
2. In your domain registrar, add a CNAME record:
   - Name: `www`
   - Value: `YOUR_USERNAME.github.io`

---

## 🔄 Updating the Site

Any time you want to update:
```bash
# Make your changes locally, then:
git add .
git commit -m "Update: describe what changed"
git push
```

GitHub Pages auto-deploys on every push. Live in ~2 minutes!

---

## ✅ Checklist Before Publishing

- [ ] Replaced all `yourusername` in README.md
- [ ] Tested the app locally in browser
- [ ] Verified all tabs work (Home, Chat, Roadmap, etc.)
- [ ] API key is NOT hardcoded anywhere in the code

---

That's it! Your CareerSaathi is live 🎉
