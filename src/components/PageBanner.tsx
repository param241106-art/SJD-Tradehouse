import { ChevronRight } from 'lucide-react';
import { navigate, routeHref, handleRouteLinkClick } from '@/lib/router';
import type { Route } from '@/lib/router';

const labels: Record<Route, string> = {
  home: 'Home',
  register: 'Products',
  house: 'The House',
  about: 'About Us',
  trade: 'Trade & Markets',
  contact: 'Contact',
  product: 'Product',
  guide: 'Buyer’s Guide',
  'docs-rfq-api': 'RFQ API',
};

/** Slim dark band under the navbar on inner pages: continues the header
 * surface and shows a breadcrumb trail. */
export function PageBanner({ route, productName }: { route: Route; productName?: string }) {
  return (
    <div className="surface-dark overflow-hidden">
      <div className="grid-pattern pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <nav aria-label="Breadcrumb" className="container-wrap flex items-center gap-2 py-4 text-sm">
        <a
          href={routeHref('home')}
          onClick={(e) => handleRouteLinkClick(e, () => navigate('home'))}
          className="text-white/60 transition-colors hover:text-white"
        >
          Home
        </a>
        <ChevronRight size={14} className="text-white/30" aria-hidden="true" />
        {route === 'product' ? (
          <>
            <a
              href={routeHref('register')}
              onClick={(e) => handleRouteLinkClick(e, () => navigate('register'))}
              className="text-white/60 transition-colors hover:text-white"
            >
              Products
            </a>
            <ChevronRight size={14} className="text-white/30" aria-hidden="true" />
            <span className="font-semibold text-gold-light" aria-current="page">
              {productName ?? 'Product'}
            </span>
          </>
        ) : (
          <span className="font-semibold text-gold-light" aria-current="page">
            {labels[route]}
          </span>
        )}
      </nav>
    </div>
  );
}
