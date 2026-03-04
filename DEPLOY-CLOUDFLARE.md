# Deploy to Cloudflare

The project is configured for Cloudflare Workers via OpenNext.

## Option 1: GitHub Actions (recommended – runs on Linux)

1. **Add GitHub Secrets** (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_ACCOUNT_ID` – from [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Overview (right sidebar)
   - `CLOUDFLARE_API_TOKEN` – create at [API Tokens](https://dash.cloudflare.com/profile/api-tokens) with "Edit Cloudflare Workers" scope
   - `STRIPE_SECRET_KEY` – your Stripe secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` – your Stripe publishable key
   - `NEXT_PUBLIC_SUPABASE_URL` – `https://cqnvbspuxgnhkwnozrpd.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – your Supabase anon key

2. **Push to `main` or `master`** – the workflow will build and deploy automatically.

3. **URL** – Site: **https://divergentstudioswcg.pages.dev** (or your custom domain)

## Option 2: Local deploy (use WSL on Windows)

Local deploy from Windows can fail due to path handling. Use WSL:

```bash
cd /mnt/c/Users/kjwil/divergent-studios  # or your path
npm ci
npm run deploy:cf
```

Set `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, and Stripe keys in your environment or `.dev.vars`.

## Environment variables

- **Build time (inlined into the client):** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Runtime (Worker):** `STRIPE_SECRET_KEY` – set in Cloudflare Dashboard → Workers & Pages → divergentstudioswcg → Settings → Variables and Secrets, or via the GitHub Action.
