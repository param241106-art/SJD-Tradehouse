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

This repository is a source copy; it does not deploy or change the original website. The copied deployment workflow runs manually so creating and updating this repository will not automatically publish it.

Only the company name was requested to change. Existing phone numbers, email addresses, domain URLs, backend endpoint references, and the logo emblem are retained. Before deploying under a new domain, update `public/CNAME`, canonical and social URLs in `index.html`, `src/lib/hooks.ts` and `src/lib/structuredData.ts`, sitemap/robots/discovery files, and the workflow's IndexNow configuration to match the new hosting setup. Do not deploy this copy with the original domain configuration unless that is intentional.

GitHub repository secrets and live Supabase data are not copied by a Git import. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the new repository before deploying. Set up the included Supabase migrations and email function on the intended backend as needed; server-side email delivery requires its own configuration. No production credentials are included in this repository.
