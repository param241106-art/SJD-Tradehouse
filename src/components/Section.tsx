import type { ReactNode } from 'react';
import { navigate, routeHref, handleRouteLinkClick } from '@/lib/router';
import type { Route } from '@/lib/router';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  bg?: 'plain' | 'green' | 'gold';
};

const bgClasses = {
  plain: 'bg-bg',
  green: 'bg-green-tint/40',
  gold: 'bg-gold-tint/50',
};

export function Section({ id, children, className = '', bg = 'plain' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${bgClasses[bg]} ${className}`}>
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  // Every route needs exactly one real <h1>. Most SectionHeaders sit inside
  // a page that already has its own h1 elsewhere (e.g. HomeSection's hero),
  // so this defaults to h2 — pass "h1" only from the single SectionHeader
  // that is a standalone page's top heading (see RegisterPage, AboutSection,
  // AboutUsSection, MarketsSection, ContactSection).
  headingLevel?: 'h1' | 'h2';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  headingLevel = 'h2',
}: SectionHeaderProps) {
  const Heading = headingLevel;
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
      <Heading className={`section-title ${headingLevel === 'h1' ? 'is-page-title' : ''}`}>{title}</Heading>
      <span className={`heading-accent ${align === 'center' ? 'mx-auto' : ''}`} />
      {description && (
        <p className="mt-6 text-base leading-relaxed text-ink-secondary md:text-lg">{description}</p>
      )}
    </div>
  );
}

type CTABandProps = {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryRoute?: Exclude<Route, 'product'>;
  primaryHref?: string;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryRoute?: Exclude<Route, 'product'>;
  secondaryHref?: string;
};

export function CTABand({
  title,
  description,
  primaryLabel,
  primaryRoute,
  primaryHref,
  primaryOnClick,
  secondaryLabel,
  secondaryRoute,
  secondaryHref,
}: CTABandProps) {
  return (
    <div className="container-wrap">
      <div className="cta-band px-6 py-14 text-center text-white md:px-16 md:py-20">
        <h3 className="mx-auto max-w-2xl text-3xl font-normal text-white md:text-[3rem] md:leading-[1.08]">{title}</h3>
        <span className="heading-accent mx-auto" />
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {primaryOnClick ? (
            <button type="button" onClick={primaryOnClick} className="btn-lux">
              {primaryLabel}
            </button>
          ) : primaryRoute ? (
            <a
              href={routeHref(primaryRoute)}
              onClick={(e) => handleRouteLinkClick(e, () => navigate(primaryRoute))}
              className="btn-lux"
            >
              {primaryLabel}
            </a>
          ) : (
            <a href={primaryHref} className="btn-lux">
              {primaryLabel}
            </a>
          )}
          {secondaryLabel && (secondaryRoute || secondaryHref) && (
            secondaryRoute ? (
              <a
                href={routeHref(secondaryRoute)}
                onClick={(e) => handleRouteLinkClick(e, () => navigate(secondaryRoute))}
                className="btn-lux-ghost"
              >
                {secondaryLabel}
              </a>
            ) : (
              <a
                href={secondaryHref}
                className="btn-lux-ghost"
              >
                {secondaryLabel}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
