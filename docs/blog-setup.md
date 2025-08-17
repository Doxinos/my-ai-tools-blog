# My AI Tools Blog — Setup Guide

## Repo layout
- Root repo: `my-ai-tools-blog`
- App folder (Next.js + Studio): `stablo-pro`

## Prerequisites
- Node 18+ and pnpm 8
- Sanity project (Project ID set)
- Vercel account

## Local development
```bash
cd stablo-pro
cp .env.local .env.local.backup 2>/dev/null || true
# Create if missing
printf "NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id\nNEXT_PUBLIC_SANITY_DATASET=production\nNEXT_PUBLIC_SANITY_API_VERSION=2023-03-25\nSANITY_STUDIO_PROJECT_ID=your_project_id\nSANITY_REVALIDATE_SECRET=your_secret\nSITE_URL=http://localhost:3000\n" > .env.local
pnpm install
pnpm dev
# Studio: http://localhost:3000/studio
```

## Environment variables
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET=production
- NEXT_PUBLIC_SANITY_API_VERSION=2023-03-25
- SANITY_STUDIO_PROJECT_ID
- SANITY_REVALIDATE_SECRET
- SITE_URL (set to prod domain in Vercel)

## Sanity configuration
1) CORS origins
   - `http://localhost:3000` (Allow credentials)
   - `https://my-ai-tools-blog.vercel.app` (Allow credentials)
2) Studio
   - Add missing studio: URL `https://my-ai-tools-blog.vercel.app/studio`, base path `/studio`
3) Webhook (revalidation)
   - URL: `https://my-ai-tools-blog.vercel.app/api/revalidate`
   - Method: POST, Dataset: production, Filter: `_type == "post"`
   - API version: v2021-03-25, Include drafts: No
   - Secret: value of `SANITY_REVALIDATE_SECRET`

## Vercel configuration
1) Connect Git: repo `Doxinos/my-ai-tools-blog`
2) Root Directory: `stablo-pro`
3) Framework: Next.js, Prod branch: `main`
4) Environment Variables (Preview + Production):
   - NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION,
     SANITY_STUDIO_PROJECT_ID, SANITY_REVALIDATE_SECRET, SITE_URL
5) Domains: primary `my-ai-tools-blog.vercel.app` (add custom later)

## Deploy
```bash
# CI via Git: push to main triggers deploy after Git is connected
git commit -m "chore: example" && git push

# Manual (CLI) from stablo-pro
vercel --prod
```

## Content model notes
- Global settings doc (`settings`) controls title, URL, copyright, logos, social, OG image, meta description.
- Post supports multiple layouts. Missing author/categories are tolerated but recommended to set.

## Troubleshooting
- 500 on post page: ensure post has an Author; otherwise the UI hides author blocks (already hardened).
- Studio appears static: use the stable domain for Studio/CORS (not hashed deploy URLs).
- Vercel emails about failed deploys:
  - Ensure the project is connected to Git with Root Directory `stablo-pro`.
  - Check there isn’t a duplicate Vercel project building the repo root; pause/delete duplicates.
  - Production branch should be `main`. Re-run deploy.


