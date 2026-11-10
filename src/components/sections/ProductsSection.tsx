import { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, CTABand } from '@/components/Section';
import { Picture } from '@/components/Picture';
import { useReveal } from '@/lib/hooks';
import { navigateToProduct, productHref, handleRouteLinkClick } from '@/lib/router';
import { products, categoryLabels } from '@/data/content';
import type { Product } from '@/data/content';

type Filter = 'all' | Product['category'];

type Props = {
  onRequestSpecs: (productId: string) => void;
  // See SectionHeader's headingLevel doc — this section is shared between
  // HomePage (which already has its own h1 in HomeSection) and RegisterPage
  // (where this is the page's only heading), so the caller decides.
  headingLevel?: 'h1' | 'h2';
};

export function ProductsSection({ onRequestSpecs, headingLevel }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const headerReveal = useReveal();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === 'all' || p.category === filter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.latinBinomial.toLowerCase().includes(q) ||
        // Lets buyers find "Afghani Walnuts" by "walnut" and "Afghani Mamra" by "almond".
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const tabs: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'fruits', label: 'Dried Fruits' },
    { value: 'oils', label: 'Essential Oils' },
    { value: 'oleoresins', label: 'Oleoresins' },
    { value: 'spices', label: 'Spices' },
    { value: 'nuts', label: 'Nuts' },
    { value: 'powders', label: 'Powders' },
    { value: 'disposables', label: 'Eco Disposables' },
  ];

  return (
    <Section id="products" bg="plain">
      <div className="container-wrap">
        <div ref={headerReveal.ref} className={`reveal ${headerReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="Products"
            title="The collection"
            description={`${products.length} core products. Filter by category or search by product name or Latin binomial. Click "Request Specs" on any available product to start a quote.`}
            headingLevel={headingLevel}
          />
        </div>
      </div>

      <div className="container-wrap mt-10">
        <div className="catalog-filters flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilter(tab.value)}
                aria-pressed={filter === tab.value}
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  filter === tab.value
                    ? 'bg-green text-white shadow-soft'
                    : 'border border-line bg-surface text-ink-secondary hover:border-green hover:text-green'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full shrink-0 lg:w-64">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or Latin name"
              className="input-field rounded-full pl-10"
              aria-label="Search products"
            />
          </div>
        </div>
      </div>

      <div className="container-wrap mt-8">
        {filtered.length === 0 ? (
          <div className="rounded-md border border-dashed border-line-strong bg-surface py-20 text-center">
            <p className="text-sm text-ink-muted">
              No products match your search. Try a different term or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onRequestSpecs={onRequestSpecs}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-20">
        <CTABand
          title="Need a custom or unlisted specification?"
          description="If you need a product or spec not listed here, tell us what you are looking for. We source to order for qualified buyers."
          primaryLabel="Make a Custom Request"
          primaryOnClick={() =>
            document.getElementById('portal-page')?.scrollIntoView({ behavior: 'smooth' })
          }
          secondaryLabel="Contact Us"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}

function ProductCard({
  product,
  index,
  onRequestSpecs,
}: {
  product: Product;
  index: number;
  onRequestSpecs: (id: string) => void;
}) {
  const { ref, visible } = useReveal();
  const goToProduct = (e: React.MouseEvent<HTMLAnchorElement>) =>
    handleRouteLinkClick(e, () => navigateToProduct(product.id));
  return (
    <div
      ref={ref}
      className={`catalog-card card card-hover group relative flex flex-col overflow-hidden reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <a
        href={productHref(product.id)}
        onClick={goToProduct}
        aria-label={`View details for ${product.name}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-green-tint"
      >
        {product.photoUrl.startsWith('/') ? (
          <Picture
            src={product.photoUrl}
            alt={product.name}
            width={760}
            height={570}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${product.comingSoon ? 'saturate-[0.7]' : ''}`}
          />
        ) : (
          <img
            src={product.photoUrl}
            alt={product.name}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        )}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-deep/60 via-transparent to-transparent" />
        <span className="badge absolute left-3 top-3 border-white/40 bg-white/90 text-green backdrop-blur">
          {categoryLabels[product.category]}
        </span>
        {product.comingSoon ? (
          <span className="badge absolute right-3 top-3 border-white/20 bg-green-deep/80 text-gold-light backdrop-blur">
            Coming Soon
          </span>
        ) : (
          <span className="badge absolute right-3 top-3 border-gold-light bg-gold-light text-green-deep">
            Available
          </span>
        )}
        <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-wider text-white/90">
          {product.origin}
        </span>
      </a>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs italic text-ink-muted">{product.latinBinomial}</p>
        <h3 className="mt-1 text-xl">
          <a href={productHref(product.id)} onClick={goToProduct} className="transition-colors hover:text-green-light">
            {product.name}
          </a>
        </h3>
        <p className="catalog-description mt-2 text-sm leading-relaxed text-ink-secondary">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge border-line bg-bg text-ink-secondary">{product.extractionMethod}</span>
          {product.moq && (
            <span className="badge border-line bg-bg text-ink-secondary">MOQ: {product.moq}</span>
          )}
          {product.coaAvailable && (
            <span className="badge border-green/15 bg-green-tint text-green">COA Available</span>
          )}
        </div>
        <div className="mt-auto pt-6">
          {!product.comingSoon ? (
            <button
              type="button"
              onClick={() => onRequestSpecs(product.id)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-green px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-green-light hover:shadow-soft"
            >
              Request Specs <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <a
              href={productHref(product.id)}
              onClick={goToProduct}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-line px-5 py-3 text-sm font-bold text-ink-secondary transition-colors hover:border-green hover:text-green"
            >
              View details
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
