import type { Certification, FAQItem, Product } from '@/data/content';
import { categoryLabels } from '@/data/content';

// Single source of truth for JSON-LD @id values and the site origin, so the
// Organization graph node emitted here and the `brand`/`publisher` refs
// emitted elsewhere always resolve to the same @id.
import { SITE_URL, CONTACT } from '@/lib/site';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Organization + WebSite graph for the homepage only. Every field is pulled
 * from content already live elsewhere in the app (ContactSection's address/
 * email/phone, content.ts's `certifications`) — nothing here is
 * invented.
 */
export function organizationSchema(certifications: Certification[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'SJD TRADEHOUSE',
        alternateName: 'SJD TRADEHOUSE — Merchant Trading',
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo.jpg`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/images/logo.jpg`,
        description:
          'SJD TRADEHOUSE is a merchant export house sourcing, testing, and shipping essential oils, oleoresins, spices, nuts, dried fruits, grains and millets, powders, and eco disposables to wholesale buyers, formulators, and flavour houses worldwide.',
        email: CONTACT.salesEmail,
        telephone: '+971-58-592-7251',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rohtak',
          addressRegion: 'Haryana',
          postalCode: '124001',
          addressCountry: 'IN',
        },
        hasCredential: certifications.map((cert) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: cert.code === 'FSSAI' ? 'license' : 'certification',
          name: cert.code,
          description: cert.description,
        })),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: CONTACT.salesEmail,
            telephone: '+971-58-592-7251',
            areaServed: 'Worldwide',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: CONTACT.salesEmail,
            telephone: '+91-99960-64220',
            areaServed: 'IN',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: CONTACT.supportEmail,
            areaServed: 'Worldwide',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'SJD TRADEHOUSE',
        description:
          'Merchant export house sourcing, testing, and shipping essential oils, oleoresins, spices, nuts, dried fruits, and powders to wholesale buyers worldwide.',
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: 'en',
      },
    ],
  };
}

/**
 * One Product graph per product page, generated from the same `Product`
 * record that drives the register and the product detail page — never
 * hand-authored per SKU. Pricing is quote-based and not published, so
 * `offers.priceSpecification` describes that instead of carrying a
 * fabricated price. `name` is the plain canonical product name (matches
 * `alternateName`'s role as the botanical name) — the keyword-targeted
 * phrase lives in the page's <title>/meta description and on-page heading
 * (see App.tsx, ProductDetailPage.tsx) but is intentionally not duplicated
 * into schema `name`.
 */
export function productSchema(product: Product) {
  const additionalProperty = [
    { '@type': 'PropertyValue', name: 'Botanical name', value: product.latinBinomial },
    { '@type': 'PropertyValue', name: 'Processing method', value: product.extractionMethod },
    {
      '@type': 'PropertyValue',
      name: 'Origin region',
      value:
        product.origin === product.originCountry
          ? product.origin
          : `${product.origin}, ${product.originCountry ?? 'India'}`,
    },
    ...(product.moq ? [{ '@type': 'PropertyValue', name: 'Minimum order quantity', value: product.moq }] : []),
    ...(product.hsCode ? [{ '@type': 'PropertyValue', name: 'HS code', value: product.hsCode }] : []),
    {
      '@type': 'PropertyValue',
      name: 'Certificate of Analysis',
      value: product.coaAvailable ? 'Available on request' : 'Not available',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    alternateName: product.latinBinomial,
    // Trailing slash to match the URL the server actually serves (and what
    // canonicalPathForProduct emits) — see router.ts's canonicalPathForRoute
    // doc comment for why.
    url: `${SITE_URL}/product/${product.id}/`,
    image: product.photoUrl.startsWith('/') ? `${SITE_URL}${product.photoUrl}` : product.photoUrl,
    description: product.description,
    category: categoryLabels[product.category],
    brand: { '@id': ORGANIZATION_ID },
    additionalProperty,
    offers: {
      '@type': 'Offer',
      availability: product.comingSoon
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: product.moq
          ? `Quote-based pricing, MOQ-gated at ${product.moq}. Contact the trade desk for a quotation.`
          : 'Quote-based pricing. Contact the trade desk for a quotation.',
      },
    },
  };
}

/**
 * FAQPage graph for a page's on-screen Q&A list. `items` must be the exact
 * same array the page renders (see GuidePage.tsx) so the emitted
 * question/answer text always matches what a visitor — or crawler reading
 * only the prerendered HTML — actually sees.
 */
export function faqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
