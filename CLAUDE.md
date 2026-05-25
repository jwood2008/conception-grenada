# Caribbean Investment Holdings — Project CLAUDE.md

Supplements `~/.claude/CLAUDE.md`. Project-specific deviations are called out.

## What this is

Public-facing marketing + asset showcase site for **Caribbean Investment Holdings LLC** (CIH) — a holding company whose underlying assets are tokenized via **TierraDex**. First and only asset on site at launch: **Grenada Lifestyle Cosmetic Surgery Clinic, Hotel & SPA** (Reg D 506(c), $16M raise, 5–8% target annual yield, 8M Class B tokens @ $2 ea).

This site is the *issuer's* marketing layer. It does NOT do KYC, accreditation, custody, or token issuance — those happen on TierraDex (`https://tierradex.com`). Site funnels accredited investors there via a primary "Invest via TierraDex" CTA and captures a soft waitlist as fallback.

## Stack

Matches TierraDex deliberately so design tokens and patterns can be shared:

- Next.js 16.2 (App Router, TS strict)
- React 19
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- shadcn/ui (radix-nova style, neutral base, customized to navy + sand)
- Supabase (`@supabase/supabase-js`) — currently stubbed for waitlist; real wiring later
- Inter (UI) + **Fraunces** (display) via `next/font/google` — **project deviation:** global rule says drop Fraunces in favor of SF Pro/Inter, but that was a TierraDex-specific decision. CIH brand wants editorial warmth a serif provides.

## Brand identity

- **CIH parent:** deep navy + warm sand + cream surfaces (corporate-finance with warmth)
- **Grenada Lifestyle Properties (asset sub-brand):** sage/teal green + cream, anchored by the sea-turtle logo at `public/images/grenada-lifestyle-logo.png` (extracted from the project flythrough video)

Brand tokens live in `src/app/globals.css` as CSS variables — never hardcode Tailwind color classes like `text-blue-700`. Use `text-primary`, `bg-sand`, `text-navy-foreground`, etc.

## Content source-of-truth

- **Grenada offering economics:** `src/content/grenada.ts` — values pulled from PPM Clean Draft 8 (`public/Grenada-BBL-PPM-Draft.pdf`)
- **PPM has internal contradictions** (entity domicile: Grenada vs California vs Wyoming; blockchain: Polygon vs Ethereum vs XRPL-via-TierraDex; management: Stassen+Smith vs Stassen+Lotz). Treat the PPM as authoritative legal doc, but DO NOT publish a contradictory value. Use placeholder copy until reconciled with Greg.

## TierraDex handoff

- Primary "Invest" CTA → `https://tierradex.com` (we'll swap to the deep-link issuer URL once TDX-048 issuer pages exist — TierraDex EP, not blocking this build).
- Subtle "Tokenization powered by TierraDex" line in footer + on the offering snapshot card.
- Waitlist email-capture form below the primary CTA: "We'll notify you when accredited verification opens for this asset."

## Imagery

- `public/images/` — 17 curated images: aerial resort renders, interior/exterior villa shots, real Grenada coast footage, Grenada Lifestyle logo
- `public/Grenada-BBL-PPM-Draft.pdf` — full PPM (DO NOT link publicly without gating; this is a confidential securities document. For now it's stored here for development reference)

## What NOT to do

- Don't link the PPM PDF publicly from the site. It's a confidential securities document. Build the link gated behind accreditation later.
- Don't write any copy that contradicts the PPM economics ($16M raise, $4K min, 8M tokens @ $2, 5–8% target yield, 366-day lockup, 3-year no-redemption).
- Don't say "Wyoming LLC" or "California LLC" or "Grenada company" in copy until Greg reconciles. Use "Caribbean Investment Holdings LLC" without jurisdictional qualifier, or generic placeholder.
- Don't reference Polygon or Ethereum — the platform is **TierraDex (XRPL)**.
- Don't build a checkout / wallet / KYC flow. That's TierraDex's job.

## Auto-execute UI scoring

Per global rule: every component touched must be self-scored against `~/.claude/references/ui-scoring-rubric.md` BEFORE presenting as complete. Target ≥ 9.7 weighted average, no dimension below 9.

## Dev

```
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```
