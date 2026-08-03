# Deploy to Cloudflare

The project uses **OpenNext** + **Wrangler** (Worker-style deploy). Do **not** use Cloudflare Pages Git-based build—it expects static `out/` and will fail.

## Fix: "Output directory out not found"

If Cloudflare shows this error, the project is using **Git-based build**. Switch to deploy via GitHub Actions:

1. **Cloudflare Dashboard** → Workers & Pages → **divergentstudioswcg**
2. **Settings** → **Builds & deployments**
3. Under **Build configuration**, either:
   - Disconnect the Git repository and use **Direct Upload** only, or
   - Turn off **Automatic builds** so only the GitHub Action deploys

The GitHub Action runs `npm run deploy:cf` (OpenNext + Wrangler) and deploys correctly.

---

## Option 1: GitHub Actions (recommended – runs on Linux)

1. **Add GitHub Secrets** (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_ACCOUNT_ID` – from [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Overview (right sidebar)
   - `CLOUDFLARE_API_TOKEN` – create at [API Tokens](https://dash.cloudflare.com/profile/api-tokens) with "Edit Cloudflare Workers" scope
   - `STRIPE_SECRET_KEY` – your Stripe secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` – your Stripe publishable key
   - `NEXT_PUBLIC_SUPABASE_URL` – `https://hgeddhazzxrnheogeqpq.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` – your Supabase service role key (for order saves)

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
