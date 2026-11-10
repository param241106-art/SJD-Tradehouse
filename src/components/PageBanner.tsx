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

/** Quiet breadcrumb trail connecting the inner pages to the house. */
export function PageBanner({ route, productName }: { route: Route; productName?: string }) {
  return (
    <div className="page-breadcrumb overflow-hidden">
      <nav aria-label="Breadcrumb" className="container-wrap flex items-center gap-2 py-4 text-sm">
        <a
          href={routeHref('home')}
          onClick={(e) => handleRouteLinkClick(e, () => navigate('home'))}
          className="text-ink-secondary transition-colors hover:text-green"
        >
          Home
        </a>
        <ChevronRight size={14} className="text-ink-muted" aria-hidden="true" />
        {route === 'product' ? (
          <>
            <a
              href={routeHref('register')}
              onClick={(e) => handleRouteLinkClick(e, () => navigate('register'))}
              className="text-ink-secondary transition-colors hover:text-green"
            >
              Products
            </a>
            <ChevronRight size={14} className="text-ink-muted" aria-hidden="true" />
            <span className="font-semibold text-green" aria-current="page">
              {productName ?? 'Product'}
            </span>
          </>
        ) : (
          <span className="font-semibold text-green" aria-current="page">
            {labels[route]}
          </span>
        )}
      </nav>
    </div>
  );
}
