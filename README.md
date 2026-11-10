# SJD TRADEHOUSE

Copy of the AvantSpecs website with its company name changed to **SJD TRADEHOUSE** throughout the pages, metadata, structured data, documentation, email templates, and logo assets. The layout, styling, product catalogue, photographs, navigation, and application behavior are retained.

## Run locally

Use Node.js 24, then run `npm ci`.

Create a local `.env` file with the Supabase configuration for this website:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Run `npm run dev` for development, `npm test` for the existing test suite, or `npm run build` to generate the production files in `dist/`. The build also prerenders the routes in the sitemap.

## Deployment configuration

Hosting: the site deploys to GitHub Pages at https://sjdtradehouse.com (custom domain; DNS at GoDaddy) on every push to `main` (`.github/workflows/deploy-pages.yml`). Canonical URLs, Open Graph tags, JSON-LD, sitemap, robots and discovery files are generated from the workflow's `BASE_PATH` and `SITE_URL`. The domain is set in the repo's Pages settings and in `public/CNAME`; the workflow builds with `BASE_PATH: /` and `SITE_URL: https://sjdtradehouse.com`. Without Supabase secrets, the quote and contact forms fall back to opening a pre-filled email.

GitHub repository secrets and live Supabase data are not copied by a Git import. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the new repository before deploying. Set up the included Supabase migrations and email function on the intended backend as needed; server-side email delivery requires its own configuration. No production credentials are included in this repository.
