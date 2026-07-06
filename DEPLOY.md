# Launch JuniorGolfOS — step-by-step

You already proved signup works on your computer. This guide gets the **live website** (`juniorgolfos.com`) working for real families.

You need two things deployed:

1. **JuniorGolfOS website** (this project) — what parents see  
2. **GolfCoachOS API** (small update) — so the live site is allowed to create accounts  

---

## Before you start — grab your coach token

1. Sign in to [golfcoachos.com](https://golfcoachos.com) as a coach.  
2. Open your **affiliate link** (coach dashboard → affiliate section).  
3. Copy the long code after `coach=` in the URL.  
   - Example: `https://golfcoachos.com/start?coach=abc123xyz` → token is `abc123xyz`  
4. Save it in Notes — you’ll paste it twice below.

---

## Part A — Deploy the API update (one time)

The API needs a small change so `juniorgolfos.com` can talk to it.

**If someone technical helps you:**  
Push the latest `golfcoachos-api` repo to GitHub. Vercel should auto-deploy.

**Files that changed:** `lib/cors.ts` and `app/api/coaches/affiliate-signup/route.ts`

**How to know it worked:** After deploy, families on the live JuniorGolfOS site can submit signup without a CORS error in the browser.

---

## Part B — Put the website on Vercel

### Step 1 — Create a GitHub repo (if you haven’t)

1. Go to [github.com](https://github.com) and sign in.  
2. **New repository** → name it e.g. `juniorgolfos` → Create.  
3. On your Mac, in Terminal:

```bash
cd /Users/robhoulding/Projects/juniorgolfparent
git add .
git commit -m "JuniorGolfOS landing and live signup"
git remote add origin https://github.com/YOUR_USERNAME/juniorgolfos.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username. Skip `git remote add` if the repo is already connected.)

### Step 2 — Import into Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).  
2. **Add New… → Project**.  
3. Import the `juniorgolfos` (or `juniorgolfparent`) repo.  
4. Vercel detects **Next.js** — leave settings as default.  
5. **Before you click Deploy**, open **Environment Variables** and add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_GOLFCOACHOS_API_URL` | `https://golfcoachos-api-a2r5.vercel.app` |
| `NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN` | Your coach token from above |

6. Click **Deploy**.  
7. Wait ~2 minutes. Vercel gives you a URL like `juniorgolfos.vercel.app`.

### Step 3 — Test the Vercel URL

1. Open `https://YOUR-PROJECT.vercel.app/signup`  
2. You should **not** see “need a coach link” (because the token is set).  
3. Run a test signup with your email.  
4. Confirm dashboard + email work.

---

## Part C — Connect your domain `juniorgolfos.com`

1. In Vercel → your project → **Settings → Domains**.  
2. Add `juniorgolfos.com` and `www.juniorgolfos.com`.  
3. Vercel shows DNS records (usually at your domain registrar — GoDaddy, Namecheap, Cloudflare, etc.).  
4. Add the records Vercel asks for (often an **A** record or **CNAME**).  
5. Wait 5–60 minutes for DNS to propagate.  
6. Vercel will show a green check when the domain is live.

**Optional:** Point `juniorgolfparent.com` → redirect to `juniorgolfos.com` (registrar redirect or Vercel redirect rule).

---

## Part D — Local development (your Mac)

Create a file `.env.local` in the project folder (never commit this file):

```bash
NEXT_PUBLIC_GOLFCOACHOS_API_URL=https://golfcoachos-api-a2r5.vercel.app
NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN=paste_your_token_here
```

Then:

```bash
cd /Users/robhoulding/Projects/juniorgolfparent
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How families can sign up (three ways)

| How | Link |
|-----|------|
| **Your marketing site** | `https://juniorgolfos.com` → Start Free |
| **Your affiliate link** | `https://juniorgolfos.com/signup?coach=YOUR_TOKEN` |
| **Email invitation** | Coach sends invite → parent clicks link with `?invite=...` |

---

## Launch checklist

- [ ] API deployed with CORS update  
- [ ] Vercel project deployed  
- [ ] `NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN` set in Vercel  
- [ ] Test signup on `*.vercel.app` URL  
- [ ] `juniorgolfos.com` DNS connected  
- [ ] Test signup on live domain  
- [ ] Share affiliate link with a real parent for a pilot  

---

## When something breaks

| Symptom | Fix |
|---------|-----|
| “Need coach link” on live site | Add `NEXT_PUBLIC_DEFAULT_AFFILIATE_TOKEN` in Vercel → **Redeploy** |
| “Could not reach GolfCoachOS” | API down or wrong `NEXT_PUBLIC_GOLFCOACHOS_API_URL` |
| Signup works locally but not live | Deploy API CORS update; confirm domain is `juniorgolfos.com` in cors.ts |
| Invitation link fails | Send a fresh invitation from GolfCoachOS |

---

## What’s still optional (later)

- Real product screenshots in place of gray **MediaSlot** placeholders  
- Privacy Policy / Terms pages (footer currently `#`)  
- `juniorgolfparent.com` → `juniorgolfos.com` redirect  

You’re ready to ship the core loop: **landing page → signup → dashboard**.
