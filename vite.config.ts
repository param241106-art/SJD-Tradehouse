/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

// Where the site is served from. Both are build-time settings so moving from
// the GitHub Pages project URL to a custom domain is a two-variable change in
// .github/workflows/deploy-pages.yml — no code edits:
//   BASE_PATH  URL path prefix the app lives under ('/' on a custom domain,
//              '/SJD-Tradehouse/' on param241106-art.github.io).
//   SITE_URL   Absolute origin + base, no trailing slash. Used for canonical
//              URLs, Open Graph tags, JSON-LD, sitemap.xml and robots.txt.
const BASE_PATH = process.env.BASE_PATH ?? '/';
const SITE_URL = (process.env.SITE_URL ?? 'https://param241106-art.github.io/SJD-Tradehouse').replace(
  /\/$/,
  '',
);

// Files in public/ are copied verbatim, so the ones that need absolute URLs
// carry %SITE_URL% / %BASE_URL% placeholders that are filled in here once the
// bundle has been written.
const PLACEHOLDER_FILES = /\.(xml|txt|json|html)$|api-catalog$/;

function sitePlaceholders(): Plugin {
  let outDir = 'dist';
  return {
    name: 'site-placeholders',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    // 'pre' so the placeholder is gone before Vite parses the HTML's URLs.
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    },
    async closeBundle() {
      const walk = async (dir: string): Promise<string[]> => {
        const entries = await readdir(dir);
        const files = await Promise.all(
          entries.map(async (name) => {
            const full = path.join(dir, name);
            return (await stat(full)).isDirectory() ? walk(full) : [full];
          }),
        );
        return files.flat();
      };
      for (const file of await walk(outDir)) {
        if (!PLACEHOLDER_FILES.test(file)) continue;
        const text = await readFile(file, 'utf-8');
        if (!text.includes('%SITE_URL%') && !text.includes('%BASE_URL%')) continue;
        await writeFile(
          file,
          text.replaceAll('%SITE_URL%', SITE_URL).replaceAll('%BASE_URL%', BASE_PATH),
        );
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), sitePlaceholders()],
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Only the homepage CSS is render-blocking and it is small; inlining
    // tiny assets (icons) saves round trips on first load.
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    target: 'es2020',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    restoreMocks: true,
  },
});
