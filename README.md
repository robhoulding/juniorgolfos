# JuniorGolfOS

Marketing site and family signup for [JuniorGolfOS](https://juniorgolfos.com) — powered by the GolfCoachOS Platform Intelligence API.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion

## Local development

```bash
npm install
cp .env.example .env.local   # then add your coach affiliate token
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Signup calls `golfcoachos-api` (`/api/signup/quick-start` for invitations, `/api/coaches/affiliate-signup` for affiliate / organic traffic).

## Launch

See **[DEPLOY.md](./DEPLOY.md)** for a step-by-step guide (Vercel, domain, environment variables).

## Project structure

```
app/                  Pages (home, pricing, signup)
components/           Layout, sections, pricing, signup UI
lib/                  Copy, pricing, API client, links
docs/                 Brand hierarchy and landing copy
```
