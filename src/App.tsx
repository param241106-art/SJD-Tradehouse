import { lazy, Suspense, type ComponentType } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { PageBanner } from '@/components/PageBanner';
import { useRoute, useProductId, canonicalPathForRoute, canonicalPathForProduct, getRouteFromPath } from '@/lib/router';
import { useDocumentHead } from '@/lib/hooks';
import { HomePage } from '@/pages/HomePage';
import { products } from '@/data/content';
import type { Route } from '@/lib/router';

const routeHead: Record<Exclude<Route, 'product'>, { title: string; description: string }> = {
  home: {
    title: 'Botanical Export House India | SJD TRADEHOUSE',
    description:
      'SJD TRADEHOUSE is a botanical export house in India, a merchant export house sourcing, GC-MS testing, and shipping essential oils, oleoresins, spices, nuts, dried fruits, powders, and eco disposables to wholesale buyers worldwide. As a documented, COA-backed essential oil and spice exporter, every consignment ships fully documented to spec.',
  },
  register: {
    title: 'Products | SJD TRADEHOUSE',
    description:
      'Browse SJD TRADEHOUSE’ full product range: dried fruits, nuts, essential oils, oleoresins, spices, powders, and eco disposables. Filter by category or search by name or Latin binomial.',
  },
  house: {
    title: 'The House | SJD TRADEHOUSE',
    description:
      'How SJD TRADEHOUSE sources, tests, and documents every consignment — from origin procurement to lab verification to the certificate set your customs clearance needs.',
  },
  about: {
    title: 'About Us | SJD TRADEHOUSE',
    description:
      'SJD TRADEHOUSE is a boutique trade house in Rohtak, India, connecting Indian-origin botanical producers directly with international formulators, flavour houses, and wholesale buyers.',
  },
  trade: {
    title: 'Trade & Markets | SJD TRADEHOUSE',
    description:
      'The export markets SJD TRADEHOUSE serves, with region-specific documentation: REACH compliance for Europe, Halaal certification for the Middle East, and more.',
  },
  contact: {
    title: 'Contact | SJD TRADEHOUSE',
    description:
      'Get in touch with the SJD TRADEHOUSE trade desk to request a quote, ask about a specification, or start a new export relationship.',
  },
  guide: {
    title: 'How to Choose an Essential Oil Export Partner | SJD TRADEHOUSE',
    description:
      'A buyer’s essential oil exporter documentation checklist covering COA, TDS, and SDS, plus a step-by-step framework for how to vet a spice export supplier in India: what documentation to expect, how testing should work, and the certificate set your destination market requires.',
  },
  'docs-rfq-api': {
    title: 'RFQ Submission API Reference | SJD TRADEHOUSE',
    description:
      'API reference for the SJD TRADEHOUSE RFQ submission endpoint: required headers, request body fields, an example request, and a link to the full OpenAPI definition.',
  },
};

// Home is the default route and stays eager so the first paint has no
// Suspense round-trip; every other route is fetched on demand so its code
// doesn't add to the initial bundle a visitor has to download for Home.
//
// Each lazy page can also be preloaded. main.tsx preloads the current
// route's chunk before the first render, and once loaded the page renders
// directly instead of through React.lazy — so React never swaps the
// prerendered HTML for the "Loading…" fallback (which collapsed the page
// and caused a large layout shift on direct visits to inner pages).

function lazyPage<P extends object>(factory: () => Promise<ComponentType<P>>) {
  let Loaded: ComponentType<P> | null = null;
  const load = () =>
    factory().then((C) => {
      Loaded = C;
      return { default: C };
    });
  const Lazy = lazy(load) as unknown as ComponentType<P>;
  function Page(props: P) {
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />;
  }
  Page.preload = load;
  return Page;
}

const RegisterPage = lazyPage(() => import('@/pages/RegisterPage').then((m) => m.RegisterPage));
const HousePage = lazyPage(() => import('@/pages/HousePage').then((m) => m.HousePage));
const AboutUsPage = lazyPage(() => import('@/pages/AboutUsPage').then((m) => m.AboutUsPage));
const TradePage = lazyPage(() => import('@/pages/TradePage').then((m) => m.TradePage));
const ContactPage = lazyPage(() => import('@/pages/ContactPage').then((m) => m.ContactPage));
const ProductDetailPage = lazyPage(() =>
  import('@/pages/ProductDetailPage').then((m) => m.ProductDetailPage),
);
const GuidePage = lazyPage(() => import('@/pages/GuidePage').then((m) => m.GuidePage));
const DocsRfqApiPage = lazyPage(() => import('@/pages/DocsRfqApiPage').then((m) => m.DocsRfqApiPage));

const routePreloaders: Partial<Record<Route, () => Promise<unknown>>> = {
  register: RegisterPage.preload,
  house: HousePage.preload,
  about: AboutUsPage.preload,
  trade: TradePage.preload,
  contact: ContactPage.preload,
  product: ProductDetailPage.preload,
  guide: GuidePage.preload,
  'docs-rfq-api': DocsRfqApiPage.preload,
};

/** Loads the code for the route in the address bar (no-op for Home). */
// eslint-disable-next-line react-refresh/only-export-components
export function preloadCurrentRoute(): Promise<unknown> {
  return routePreloaders[getRouteFromPath()]?.() ?? Promise.resolve();
}

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-sm text-ink-muted">Loading…</p>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  const productId = useProductId();

  const product = route === 'product' ? products.find((p) => p.id === productId) : undefined;
  const head =
    route === 'product'
      ? product
        ? {
            title: `${product.seoTitle} | SJD TRADEHOUSE`,
            description: product.description,
            canonicalPath: canonicalPathForProduct(product.id),
          }
        : {
            title: 'Product Not Found | SJD TRADEHOUSE',
            description: routeHead.register.description,
            canonicalPath: canonicalPathForRoute('register'),
          }
      : { ...routeHead[route], canonicalPath: canonicalPathForRoute(route) };

  useDocumentHead(head.title, head.description, head.canonicalPath);

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="site-main">
        {route === 'home' && <HomePage />}
        {route !== 'home' && <PageBanner route={route} productName={product?.name} />}
        {route !== 'home' && (
          <Suspense fallback={<RouteFallback />}>
            {route === 'register' && <RegisterPage />}
            {route === 'house' && <HousePage />}
            {route === 'about' && <AboutUsPage />}
            {route === 'trade' && <TradePage />}
            {route === 'contact' && <ContactPage />}
            {route === 'product' && <ProductDetailPage productId={productId} />}
            {route === 'guide' && <GuidePage />}
            {route === 'docs-rfq-api' && <DocsRfqApiPage />}
          </Suspense>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
