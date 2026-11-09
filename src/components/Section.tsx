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
  green: 'bg-gradient-to-b from-green-tint/80 to-bg',
  gold: 'bg-gradient-to-b from-gold-tint to-bg',
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
  // LeadershipSection, MarketsSection, ContactSection).
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
      <Heading className="mt-4 text-[2.4rem] leading-[1.08] md:text-[3.4rem]">{title}</Heading>
      <span className={`heading-accent ${align === 'center' ? 'mx-auto' : ''}`} />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-ink-secondary md:text-lg">{description}</p>
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
      <div className="surface-dark overflow-hidden rounded-lg px-6 py-14 text-center text-white shadow-lift md:px-16 md:py-16">
        <div className="grid-pattern pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
          aria-hidden="true"
        />
        <h3 className="mx-auto max-w-2xl text-3xl text-white md:text-[2.75rem] md:leading-tight">{title}</h3>
        <span className="heading-accent mx-auto" />
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {primaryOnClick ? (
            <button type="button" onClick={primaryOnClick} className="btn-gold">
              {primaryLabel}
            </button>
          ) : primaryRoute ? (
            <a
              href={routeHref(primaryRoute)}
              onClick={(e) => handleRouteLinkClick(e, () => navigate(primaryRoute))}
              className="btn-gold"
            >
              {primaryLabel}
            </a>
          ) : (
            <a href={primaryHref} className="btn-gold">
              {primaryLabel}
            </a>
          )}
          {secondaryLabel && (secondaryRoute || secondaryHref) && (
            secondaryRoute ? (
              <a
                href={routeHref(secondaryRoute)}
                onClick={(e) => handleRouteLinkClick(e, () => navigate(secondaryRoute))}
                className="btn-glass"
              >
                {secondaryLabel}
              </a>
            ) : (
              <a
                href={secondaryHref}
                className="btn-glass"
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
