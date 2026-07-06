# GolfOS Brand Hierarchy

**Version:** 1.0 · July 2026  
**Audience:** Product, marketing, Base44, design, engineering  
**Status:** Approved direction for implementation

---

## One sentence

**GolfCoachOS is the platform intelligence engine; GolfCoachOS, GolfAcademyOS, and JuniorGolfOS are the three front doors; JuniorGolfParent.com redirects into the family product.**

---

## Product suite

| Product | Domain | Sells to | Core job |
|---------|--------|----------|----------|
| **GolfCoachOS** | golfcoachos.com | Solo coaches | Run a development practice on the intelligence engine |
| **GolfAcademyOS** | golfacademyos.com | Academy directors & staff | Run many coaches and athletes on one system |
| **JuniorGolfOS** | juniorgolfos.com | Families & players | Live inside coordinated long-term player development |

**Shared engine:** `golfcoachos-api` (Vercel: golfcoachos-api-a2r5) — auth, players, AI, messaging, billing, four-pillar intelligence, Coaching in Context. **Do not duplicate business logic in consumer sites.**

**Shared tagline (footer / badge):**  
*One platform intelligence engine. Three ways in.*

---

## What each product is — and is not

### GolfCoachOS
- **Is:** Coach platform, certification, roster, lesson intelligence, affiliate/commission model, coach onboarding
- **Is not:** The primary family marketing site (redirect family story to JuniorGolfOS)

### GolfAcademyOS
- **Is:** Multi-coach dashboard, academy intelligence briefings, staff alignment, academy economics
- **Is not:** A separate backend (same GolfCoachOS engine)

### JuniorGolfOS
- **Is:** Family/player development OS — competitive advantage through connected development; parent + player portals; upgrades by age, stage, and need; community (forums, podcasts, guidance)
- **Is not:** A lesson-storage app, a parent data-entry tool, or a replacement for the coach

---

## Role map (who enters where)

```
                    ┌─────────────────────────┐
                    │  GolfCoachOS Engine     │
                    │  (API + intelligence)   │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
 golfcoachos.com        golfacademyos.com        juniorgolfos.com
 Solo coaches           Academies                Families & players
        │                       │                       │
        │                       │              ┌────────┴────────┐
        │                       │              │                 │
        │                       │         Parent portal    Player app
        │                       │         (marketing +      (practice
        │                       │          signup)           ratings, goals)
        └───────────────────────┴──────────────────────────┘
                    Coach invites family → JuniorGolfOS onboarding
```

| Role | Primary entry | Auth |
|------|---------------|------|
| Solo coach | golfcoachos.com → signup/solo-coach | Base44 + GolfCoachOS |
| Academy director | golfacademyos.com → signup/academy | Base44 + GolfCoachOS |
| Parent | juniorgolfos.com/start (or coach invite link) | Base44 + GolfCoachOS |
| Player | Same family account / player profile | Base44 + GolfCoachOS |
| Team member (fitness, mental, etc.) | Invited into player record | Base44 + GolfCoachOS |

---

## Domain & redirect map

| Domain / URL | Action | Notes |
|--------------|--------|-------|
| **juniorgolfos.com** | Primary family brand | Marketing site + section stack (see landing-copy.md) |
| **juniorgolfparent.com** | 301 → `https://juniorgolfos.com` | Keep domain; do not lead marketing with "Parent" |
| **parent.juniorgolfos.com** | Optional 301 → `/` or dedicated parent ad LP | Use only for paid campaigns if A/B testing |
| **app.juniorgolfos.com** | Logged-in family/player app (future) | When marketing app splits from Next marketing site |
| **golfcoachos.com** | Coach brand | Hero sells coaches; link "For Families →" to juniorgolfos.com |
| **golfcoachos.com/FamilyPlatform** | 301 → `https://juniorgolfos.com` | Retire duplicate family story on coach site |
| **golfacademyos.com** | Academy brand | Redirect `/` to golfcoachos.com/AcademyPlatform until standalone site ships |
| **golfcoachos.com/AcademyPlatform** | Interim academy marketing | Migrate to golfacademyos.com when ready |

---

## URL structure (JuniorGolfOS marketing site)

| Path | Purpose |
|------|---------|
| `/` | Landing page (8 sections) |
| `/start` | Signup (coach invite + self-serve paths) |
| `/pricing` | Structure / Intelligence / Optimization tiers |
| `/coaches` | "Join through your coach" + invite flow |
| `/community` | Forums, podcasts, guidance (or link out) |
| `/sign-in` | Existing accounts → GolfCoachOS auth |

---

## Naming: marketing vs backend

| Marketing (JuniorGolfOS site) | Backend / Stripe (unchanged) |
|-------------------------------|------------------------------|
| **Structure** (Foundation) | `free` / Foundation tier |
| **Intelligence** (Development) | `development` / $15 athlete plan |
| **Optimization** (Performance) | `performance` / $25 athlete plan |

Family self-coach path ($19/mo, no external coach): onboard via GolfCoachOS family-coach flow; market as **JuniorGolfOS + coach-your-child** on `/start`, not as a fourth OS product.

---

## Messaging rules

1. **JuniorGolfOS sells competitive advantage**, not "a parent dashboard."
2. **Coaches lead; parents steward; players participate; team contributes; platform connects.**
3. **Coaching in Context** — define once per page: the right work, at the right time, for the player in front of you (not the same lesson for every kid).
4. **Upgrades are honest** — Structure is free and real; Intelligence and Optimization when age, stage, and competitive need justify it.
5. **GolfCoachOS credit** — "Powered by GolfCoachOS" on JuniorGolfOS; never hide the engine.
6. **vs CoachNow** — CoachNow delivers lessons; JuniorGolfOS builds the player across every contributor over time. Complement, don't attack.

---

## Competitive framing (approved)

> Families on GolfCoachOS compound an advantage every season. Families managing development through disconnected apps, texts, and memory fall further behind — not because they lack effort, but because nothing connects.

Tone: confident, not shame-based. "Falling behind" = disconnected vs connected development environments.

---

## Dual promise (every JuniorGolfOS touchpoint)

1. **A better player** — coordinated development no app stack can replicate  
2. **A better golf parent** — structure, certification, community, and coaches who want you to succeed in your role  

---

## Implementation checklist

- [ ] Register / DNS: juniorgolfos.com → marketing host (Vercel)
- [ ] 301: juniorgolfparent.com → juniorgolfos.com
- [ ] 301: golfcoachos.com/FamilyPlatform → juniorgolfos.com
- [ ] golfcoachos.com nav: Families → juniorgolfos.com
- [ ] CORS: add `juniorgolfos.com` to golfcoachos-api `lib/cors.ts` when signup goes live
- [ ] Rename repo `juniorgolfparent` → `juniorgolfos` (optional, team alignment)
- [ ] Single signup entry: `juniorgolfos.com/start` (coach invite vs explore branches inside flow)
- [ ] Retire "GolfParentOS" in customer-facing copy unless domain acquired

---

## Handoff contacts

| Need | Owner |
|------|-------|
| Landing copy | `docs/landing-copy.md` |
| API / billing truth | golfcoachos-api `lib/plans.ts`, `lib/support/knowledgeBase.ts` |
| Coach family invite | `/api/signup/quick-start`, invitation emails |
| Family coach self-serve | `/api/family-coach/onboard` |

---

*Questions or conflicts with live GolfCoachOS pricing: backend knowledge base wins; update marketing copy to match.*
