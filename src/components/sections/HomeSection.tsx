import { useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  FileCheck2,
  FlaskConical,
  Handshake,
  Quote,
  ScanSearch,
  Ship,
} from 'lucide-react';
import {
  navigate,
  navigateToOrderPortal,
  navigateToProduct,
  productHref,
  routeHref,
  handleRouteLinkClick,
} from '@/lib/router';
import { Picture } from '@/components/Picture';
import { availableProducts, categoryLabels, products } from '@/data/content';
import { useReveal } from '@/lib/hooks';

const notes: Record<string, string> = {
  'medjool-dates': 'Soft texture, rich caramel notes. Tree-ripened and hand-sorted.',
  'turkish-figs': 'Sun-dried and naturally sweet.',
  'turkish-apricots': 'Golden colour, beautifully balanced.',
  'afghani-mamra': 'Naturally rich, carefully graded.',
  'afghani-walnuts': 'Light, buttery kernels with a mild finish.',
};

// The collection bento stays on these hand-picked lines (the ones with a
// note above); the full available range is in the marquee and catalogue.
const featuredProducts = availableProducts.filter((p) => p.id in notes);

const origins = [
  {
    country: 'Egypt',
    text: 'Large, soft, caramel-sweet Medjool dates, tree-ripened and hand-sorted before they are graded.',
    products: ['medjool-dates'],
  },
  {
    country: 'Turkey',
    text: 'Sun-dried figs and golden apricots, graded by size for retail packing and manufacturing.',
    products: ['turkish-figs', 'turkish-apricots'],
  },
  {
    country: 'Afghanistan',
    text: 'Concave Mamra almonds, mild, buttery walnuts and naturally sweet sun-dried mulberries.',
    products: ['afghani-mamra', 'afghani-walnuts', 'dried-mulberry'],
  },
];

const upcomingIds = [
  'saffron',
  'clove-bud-oil',
  'cashew-kernels',
  'cumin-seed',
  'lemongrass-oil',
  'areca-leaf-plates',
];

const steps = [
  { title: 'Source', icon: ScanSearch, text: 'The right origin and the right grade. We start with your specification, volume and market.' },
  { title: 'Verify', icon: FlaskConical, text: 'Every lot is checked against the agreed spec, with the lab report for your actual batch.' },
  { title: 'Document', icon: FileCheck2, text: 'COA, origin and shipping documents prepared for your destination market.' },
  { title: 'Deliver', icon: Ship, text: 'Freight and incoterm coordination, from origin to your door, with updates along the way.' },
];

const promises = [
  { icon: FlaskConical, title: 'Lab-verified, not label-claimed', text: 'Every batch is tested before it ships, and you receive the report for your lot.' },
  { icon: FileCheck2, title: 'Documented to spec', text: 'The full certificate set your destination market expects, prepared before dispatch.' },
  { icon: Handshake, title: 'A personal trade desk', text: 'A quote and the full document set within 48 hours of your enquiry.' },
];

function useRevealClass<T extends HTMLElement = HTMLDivElement>() {
  const { ref, visible } = useReveal<T>();
  return { ref, className: `reveal ${visible ? 'is-visible' : ''}` };
}

function productById(id: string) {
  return products.find((p) => p.id === id);
}

export function HomeSection() {
  const collectionHead = useRevealClass();
  const bento = useRevealClass();
  const originsHead = useRevealClass();
  const originGrid = useRevealClass();
  const story = useRevealClass();
  const processHead = useRevealClass();
  const stepGrid = useRevealClass<HTMLOListElement>();
  const upcomingHead = useRevealClass();
  const rail = useRef<HTMLDivElement>(null);
  const upcoming = upcomingIds.map(productById).filter((p) => p !== undefined);
  const scrollRail = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * Math.min(rail.current.clientWidth * 0.8, 640), behavior: 'smooth' });

  const toProducts = (e: React.MouseEvent<HTMLAnchorElement>) =>
    handleRouteLinkClick(e, () => navigate('register'));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section id="home" className="hero" aria-labelledby="hero-heading">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container-wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-pill">
              <span className="hero-pill-dot" aria-hidden="true" />
              Merchant export house · Rohtak, India
            </p>
            <h1 id="hero-heading" className="hero-title">
              Fine origins. <em>Endless</em> possibilities.
            </h1>
            <p className="hero-lead">
              Premium dried fruits, nuts and botanical ingredients, thoughtfully sourced at origin,
              carefully documented and delivered to wholesale buyers worldwide.
            </p>
            <div className="hero-actions">
              <a href={routeHref('register')} onClick={toProducts} className="btn-lux">
                Explore the collection <ArrowUpRight size={18} />
              </a>
              <button type="button" onClick={navigateToOrderPortal} className="btn-lux-ghost">
                Request a quote <ArrowRight size={17} />
              </button>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>Quote turnaround</dt>
                <dd>48h</dd>
              </div>
              <div>
                <dt>Lab report per lot</dt>
                <dd>COA</dd>
              </div>
              <div>
                <dt>Origins: Egypt, Turkey, Afghanistan</dt>
                <dd>3</dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual">
            <div className="hero-ring" aria-hidden="true" />
            <figure className="hero-arch">
              <Picture
                src="/images/Medjool_Dates.jpg"
                alt="Rich, caramel-brown Medjool dates sourced from Egypt"
                width={760}
                height={507}
                loading="eager"
                fetchPriority="high"
                wrapperClassName="hero-arch-picture"
                className="hero-arch-img"
              />
              <figcaption>
                <span>Origin · Egypt</span>
                Medjool Dates
              </figcaption>
            </figure>

            <svg className="hero-stamp" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="stamp-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <circle cx="60" cy="60" r="58" className="hero-stamp-disc" />
              <g className="hero-stamp-ring">
                <text>
                  <textPath href="#stamp-circle">SELECTED AT ORIGIN ✦ SJD TRADEHOUSE ✦ </textPath>
                </text>
              </g>
              <text x="60" y="68" textAnchor="middle" className="hero-stamp-mark">SJD</text>
            </svg>

            <div className="hero-bubble" aria-hidden="true">
              <Picture src="/images/Turkish_Apricots.jpg" alt="" width={760} height={507} className="h-full w-full object-cover" />
            </div>

            <a
              href={productHref('afghani-walnuts')}
              onClick={(e) => handleRouteLinkClick(e, () => navigateToProduct('afghani-walnuts'))}
              className="hero-card"
            >
              <Picture
                src="/images/Afghani_Walnuts.jpg"
                alt="Afghan walnuts, whole and cracked"
                width={760}
                height={507}
                loading="eager"
                wrapperClassName="hero-card-picture"
                className="h-full w-full object-cover"
              />
              <span className="hero-card-body">
                <span>
                  <small>Afghanistan</small>
                  Afghani Walnuts
                </span>
                <span className="hero-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </span>
            </a>

            <div className="hero-glass">
              <span className="hero-glass-icon" aria-hidden="true">
                <BadgeCheck size={20} />
              </span>
              <span>
                <strong>Available to order</strong>
                {availableProducts.length} premium lines, ready to quote
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Marquee ---------- */}
      <div className="marquee" aria-label="Products available to order">
        {/* ~9s per product keeps the scroll speed steady as the range grows. */}
        <div className="marquee-track" style={{ animationDuration: `${availableProducts.length * 9}s` }}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? true : undefined}>
              {availableProducts.map((p) => (
                <li key={p.id}>
                  {p.name}
                  <small>{p.origin}</small>
                  <span aria-hidden="true">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ---------- Collection ---------- */}
      <section id="collection" className="home-section scroll-mt-24" aria-labelledby="collection-heading">
        <div className="container-wrap">
          <div ref={collectionHead.ref} className={`sec-head ${collectionHead.className}`}>
            <div>
              <p className="kicker">The collection</p>
              <h2 id="collection-heading" className="display-2">
                Distinct by nature. <em>Selected with purpose.</em>
              </h2>
            </div>
            <div className="sec-head-aside">
              <p>
                A considered collection for discerning buyers: graded, documented and ready to quote
                from our trade desk.
              </p>
              <a href={routeHref('register')} onClick={toProducts} className="link-arrow">
                View all products <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div ref={bento.ref} className={`bento ${bento.className}`}>
            {featuredProducts.map((product, i) => (
              <a
                key={product.id}
                href={productHref(product.id)}
                onClick={(e) => handleRouteLinkClick(e, () => navigateToProduct(product.id))}
                className={`bento-card ${i === 0 ? 'is-feature' : ''}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <Picture
                  src={product.photoUrl}
                  alt={product.name}
                  width={760}
                  height={570}
                  wrapperClassName="bento-picture"
                  className="bento-img"
                />
                <span className="bento-top">
                  <span className="chip">{product.origin}</span>
                  <span className="chip chip-glass">
                    <span className="chip-dot" aria-hidden="true" /> Available
                  </span>
                </span>
                <div className="bento-body">
                  <small>{categoryLabels[product.category]}</small>
                  <h3>{product.name}</h3>
                  <p className="bento-note">{notes[product.id]}</p>
                </div>
                <span className="bento-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Origins ---------- */}
      <section className="origins" aria-labelledby="origins-heading">
        <div className="origins-bg" aria-hidden="true" />
        <div className="container-wrap">
          <div ref={originsHead.ref} className={`sec-head ${originsHead.className}`}>
            <div>
              <p className="kicker kicker-light">Where it begins</p>
              <h2 id="origins-heading" className="display-2">
                Good trade begins <em>with good origins.</em>
              </h2>
            </div>
            <div className="sec-head-aside">
              <p>
                We work origin by origin, buying from the regions that grow each product best, and
                coordinating everything from our desk in India.
              </p>
            </div>
          </div>

          <div ref={originGrid.ref} className={`origin-grid ${originGrid.className}`}>
            {origins.map((origin, i) => (
              <article key={origin.country} className="origin-card" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="origin-index">0{i + 1}</span>
                <h3>{origin.country}</h3>
                <p>{origin.text}</p>
                <ul className="origin-products">
                  {origin.products.map((id) => {
                    const p = productById(id);
                    if (!p) return null;
                    return (
                      <li key={id}>
                        <a href={productHref(id)} onClick={(e) => handleRouteLinkClick(e, () => navigateToProduct(id))}>
                          <Picture src={p.photoUrl} alt="" width={760} height={507} wrapperClassName="origin-thumb" className="h-full w-full object-cover" />
                          {p.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
            <article className="origin-card is-home" style={{ transitionDelay: '240ms' }}>
              <span className="origin-index">04 · Home</span>
              <h3>India</h3>
              <p>
                Our trade desk in Rohtak coordinates sourcing, testing, documents and freight, with
                Indian spices and essential oils joining the collection soon.
              </p>
              <a href={routeHref('house')} onClick={(e) => handleRouteLinkClick(e, () => navigate('house'))} className="origin-home-link">
                Meet the house <ArrowUpRight size={17} />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- The house ---------- */}
      <section className="home-section" aria-labelledby="house-heading">
        <div ref={story.ref} className={`container-wrap story ${story.className}`}>
          <div className="story-collage">
            <Picture
              src="/images/Afghani_Mamra.jpg"
              alt="Afghan Mamra almonds on natural linen"
              width={760}
              height={570}
              wrapperClassName="story-main"
              className="h-full w-full object-cover"
            />
            <Picture
              src="/images/Shipping.jpg"
              alt="Containers being loaded at port for export"
              width={612}
              height={410}
              wrapperClassName="story-sub"
              className="h-full w-full object-cover"
            />
            <div className="story-quote">
              <Quote size={22} aria-hidden="true" />
              <p>Quality at origin. Confidence at arrival.</p>
              <span>The SJD philosophy</span>
            </div>
          </div>
          <div className="story-copy">
            <p className="kicker">The house</p>
            <h2 id="house-heading" className="display-2">
              A world of ingredients. <em>A personal approach.</em>
            </h2>
            <p className="story-lead">
              Behind every ingredient is a place, a process and a promise. We bring them together for
              food brands, importers and formulators who care as much about the source as the
              specification.
            </p>
            <ul className="promise-list">
              {promises.map(({ icon: Icon, title, text }) => (
                <li key={title} className="promise">
                  <span className="promise-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
            <a href={routeHref('house')} onClick={(e) => handleRouteLinkClick(e, () => navigate('house'))} className="link-arrow mt-9">
              Discover our approach <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="process" aria-labelledby="journey-heading">
        <div className="container-wrap">
          <div ref={processHead.ref} className={`sec-head ${processHead.className}`}>
            <div>
              <p className="kicker">From source to shipment</p>
              <h2 id="journey-heading" className="display-2">
                Considered at <em>every step.</em>
              </h2>
            </div>
            <div className="sec-head-aside">
              <p>One accountable desk from first enquiry to final document, so nothing gets lost between origin and arrival.</p>
              <a href={routeHref('trade')} onClick={(e) => handleRouteLinkClick(e, () => navigate('trade'))} className="link-arrow">
                Explore trade &amp; markets <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <ol ref={stepGrid.ref} className={`steps ${stepGrid.className}`}>
            {steps.map(({ title, icon: Icon, text }, i) => (
              <li key={title} className="step" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="step-num" aria-hidden="true">0{i + 1}</span>
                <span className="step-icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Coming soon ---------- */}
      <section className="home-section upcoming" aria-labelledby="upcoming-heading">
        <div className="container-wrap">
          <div ref={upcomingHead.ref} className={`sec-head ${upcomingHead.className}`}>
            <div>
              <p className="kicker">The house is growing</p>
              <h2 id="upcoming-heading" className="display-2">
                More fine ingredients, <em>coming soon.</em>
              </h2>
            </div>
            <div className="rail-controls">
              <button type="button" onClick={() => scrollRail(-1)} aria-label="Scroll left">
                <ArrowLeft size={19} />
              </button>
              <button type="button" onClick={() => scrollRail(1)} aria-label="Scroll right">
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
        <div className="rail-wrap">
          <div ref={rail} className="rail no-scrollbar">
            {upcoming.map((p) => (
              <a
                key={p.id}
                href={productHref(p.id)}
                onClick={(e) => handleRouteLinkClick(e, () => navigateToProduct(p.id))}
                className="rail-card"
              >
                <span className="rail-media">
                  <Picture src={p.photoUrl} alt={p.name} width={760} height={507} className="h-full w-full object-cover" />
                  <span className="chip chip-glass rail-chip">Coming soon</span>
                </span>
                <div className="rail-body">
                  <small>{categoryLabels[p.category]}</small>
                  <h3>{p.name}</h3>
                  <p>{p.origin}</p>
                </div>
              </a>
            ))}
            <a href={routeHref('register')} onClick={toProducts} className="rail-card rail-all">
              <span>
                <small>{products.length} products</small>
                Browse the full catalogue
              </span>
              <span className="bento-arrow" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
