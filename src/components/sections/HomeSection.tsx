import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Globe2 } from 'lucide-react';
import { navigate, navigateToProduct, productHref, routeHref, handleRouteLinkClick } from '@/lib/router';
import { Picture } from '@/components/Picture';
import { availableProducts } from '@/data/content';

const notes: Record<string, string> = {
  'medjool-dates': 'Soft texture. Rich caramel notes.',
  'turkish-figs': 'Sun-dried. Naturally sweet.',
  'turkish-apricots': 'Golden colour. Beautifully balanced.',
  'irani-pista': 'Distinctive flavour. Rich, buttery texture.',
  'irani-mamra': 'Naturally rich. Carefully graded.',
};

export function HomeSection() {
  const [collection, setCollection] = useState<'fruits' | 'nuts'>('fruits');
  const selected = availableProducts.filter(p => p.category === collection);
  return (
    <>
      <section id="home" className="editorial-hero">
        <div className="container-wrap hero-layout">
          <div className="hero-copy">
            <p className="editorial-kicker"><span /> FROM ORIGIN. WITH INTEGRITY.</p>
            <h1>Fine origins.<br /><em>Endless</em><br />possibilities.</h1>
            <p className="hero-description">Fine dried fruits, nuts and botanical ingredients. Thoughtfully sourced. Carefully documented. Delivered to your world.</p>
            <div className="hero-actions">
              <a href={routeHref('register')} onClick={e => handleRouteLinkClick(e, () => navigate('register'))} className="btn-primary">Explore our collection <ArrowUpRight size={18} /></a>
              <a href={routeHref('house')} onClick={e => handleRouteLinkClick(e, () => navigate('house'))} className="editorial-link">Meet the house <ArrowRight size={16} /></a>
            </div>
            <div className="hero-footnote"><span className="fine-rule" /><p>ROOTED IN INDIA<span>Connected to the world.</span></p></div>
          </div>
          <div className="hero-art">
            <div className="hero-image-frame">
              <Picture src="/images/Medjool_Dates.jpg" alt="Rich, caramel-brown Medjool dates sourced from Jordan" width={760} height={507} loading="eager" fetchPriority="high" className="hero-main-image" />
              <div className="hero-image-caption"><span>THE ORIGIN EDIT — 01</span><p>Nature’s finest.<br /><em>Nothing ordinary.</em></p></div>
            </div>
            <span className="vertical-caption">SJD TRADEHOUSE / A WORLD OF GOOD ORIGINS</span>
            <a href={productHref('irani-pista')} onClick={e => handleRouteLinkClick(e, () => navigateToProduct('irani-pista'))} className="hero-inset">
              <Picture src="/images/Irani_Pista.jpg" alt="Iranian pistachios" width={760} height={507} loading="eager" className="h-full w-full object-cover" />
              <span>Irani Pista <ArrowUpRight size={16} /></span>
            </a>
            <div className="origin-stamp" aria-hidden="true"><span>SELECTED AT</span><strong>Origin</strong><span>SJD TRADEHOUSE</span></div>
          </div>
        </div>
        <div className="container-wrap hero-bottom"><span>DRIED FRUITS &nbsp; / &nbsp; NUTS &nbsp; / &nbsp; BOTANICALS</span><a href="#collection">Discover the collection <ArrowDown size={15} /></a></div>
      </section>

      <div className="provenance-strip"><div className="container-wrap"><p>Good trade begins<br /><em>with good origins.</em></p><span>Jordan <small>MEDJOOL DATES</small></span><span>Turkey <small>FIGS & APRICOTS</small></span><span>Iran <small>PISTACHIOS & ALMONDS</small></span><span className="provenance-global"><Globe2 size={25} strokeWidth={1} /> <small>AN INDIAN HOUSE.<br />A GLOBAL OUTLOOK.</small></span></div></div>

      <section id="collection" className="collection-section scroll-mt-24">
        <div className="container-wrap">
          <div className="editorial-section-head">
            <div><p className="editorial-kicker">01 / THE COLLECTION</p><h2>Distinct by nature.<br /><em>Selected with purpose.</em></h2></div>
            <p>A considered collection for discerning buyers.<br className="hidden md:block" /> Explore the products available from our trade desk.</p>
          </div>
          <div className="collection-toolbar">
            <div className="collection-tabs" role="group" aria-label="Featured product category">
              <button type="button" aria-pressed={collection === 'fruits'} onClick={() => setCollection('fruits')}>Dried fruits <sup>03</sup></button>
              <button type="button" aria-pressed={collection === 'nuts'} onClick={() => setCollection('nuts')}>Nuts <sup>02</sup></button>
            </div>
            <a href={routeHref('register')} onClick={e => handleRouteLinkClick(e, () => navigate('register'))} className="editorial-link">View all products <ArrowUpRight size={16} /></a>
          </div>
          <div className="collection-grid" aria-live="polite">
            {selected.map((product, i) => (
              <article className="collection-card" key={product.id}>
                <a href={productHref(product.id)} onClick={e => handleRouteLinkClick(e, () => navigateToProduct(product.id))} className="collection-image" aria-label={`Discover ${product.name}`}>
                  <Picture src={product.photoUrl} alt={product.name} width={760} height={570} className="h-full w-full object-cover" />
                  <span className="collection-number">0{i + 1}</span><span className="collection-arrow"><ArrowUpRight size={22} strokeWidth={1.3} /></span>
                </a>
                <div className="collection-meta"><span>{product.origin}</span><span>Available to order</span></div>
                <h3><a href={productHref(product.id)} onClick={e => handleRouteLinkClick(e, () => navigateToProduct(product.id))}>{product.name}</a></h3>
                <p>{notes[product.id]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="house-story" aria-labelledby="house-heading">
        <div className="container-wrap story-layout">
          <div className="story-visual">
            <Picture src="/images/Irani_Mamra.jpg" alt="Iranian Mamra almonds on natural linen" width={760} height={570} className="h-full w-full object-cover" />
            <div className="story-note"><span>THE SJD PHILOSOPHY</span><p>Quality at origin.<br />Confidence at arrival.</p></div>
          </div>
          <div className="story-copy">
            <p className="editorial-kicker">02 / THE HOUSE</p>
            <h2 id="house-heading">A world of ingredients.<br /><em>A personal approach.</em></h2>
            <p>Behind every ingredient is a place, a process and a promise. We bring them together for wholesale buyers who care as much about the source as the specification.</p>
            <p>Based in Rohtak, India, SJD TRADEHOUSE connects origin regions with food brands, importers and formulators. From the first enquiry to the final document, your consignment has our attention.</p>
            <a href={routeHref('house')} onClick={e => handleRouteLinkClick(e, () => navigate('house'))} className="editorial-link">Discover our approach <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="journey-section" aria-labelledby="journey-heading">
        <div className="container-wrap">
          <div className="editorial-section-head"><div><p className="editorial-kicker">03 / FROM SOURCE TO SHIPMENT</p><h2 id="journey-heading">Considered at <em>every step.</em></h2></div><a href={routeHref('trade')} onClick={e => handleRouteLinkClick(e, () => navigate('trade'))} className="editorial-link">Explore our trade desk <ArrowUpRight size={17} /></a></div>
          <ol className="journey-grid">
            {[
              ['Source', 'The right origin, the right product. We start with your requirements.'],
              ['Verify', 'Specifications and quality documentation, reviewed for your order.'],
              ['Document', 'A clear paper trail, prepared for your destination market.'],
              ['Deliver', 'Freight and incoterm coordination, from origin to your destination.'],
            ].map(([title, description], i) => <li key={title}><span className="journey-number">0{i + 1}</span><h3>{title}<ArrowUpRight size={19} strokeWidth={1} /></h3><p>{description}</p></li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
