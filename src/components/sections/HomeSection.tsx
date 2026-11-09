import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  FileCheck,
  FlaskConical,
  Globe2,
  PackageSearch,
  Ship,
  Sparkles,
} from 'lucide-react';
import { useReveal, useCountUp } from '@/lib/hooks';
import { navigate, navigateToProduct, productHref, routeHref, handleRouteLinkClick } from '@/lib/router';
import { Picture } from '@/components/Picture';
import { products, stats } from '@/data/content';

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: count } = useCountUp(value);
  return (
    <div className="px-2 py-5 text-center sm:py-0">
      <p className="font-numeric text-4xl font-medium tracking-tight text-white md:text-5xl">
        <span ref={ref}>{count}</span>
        <span className="text-gold-light">{suffix}</span>
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{label}</p>
    </div>
  );
}

const valueProps = [
  {
    icon: FileCheck,
    title: 'Documented to Spec',
    description:
      'Every consignment ships with a full document set: COA, TDS, SDS, and origin certificates, so your customs clearance is never held up by missing paperwork.',
  },
  {
    icon: FlaskConical,
    title: 'Lab-Verified Quality',
    description:
      'GC-MS constituent profiling and microbial/heavy-metal panels on every batch. You receive the actual lab report, not a generic spec sheet, before you pay.',
  },
  {
    icon: Ship,
    title: 'Global Trade Desk',
    description:
      'We map the exact certificate set your destination market requires, from USFDA to Halaal, and handle freight, documentation, and incoterm logistics end to end.',
  },
];

const processSteps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: PackageSearch,
    title: 'Source at origin',
    description: 'Procured directly from origin regions, not resold from the open market.',
  },
  {
    icon: FlaskConical,
    title: 'Test every batch',
    description: 'GC-MS profiling plus microbial and heavy-metal panels before dispatch.',
  },
  {
    icon: FileCheck,
    title: 'Document to spec',
    description: 'COA, TDS, SDS and origin certificates matched to your market.',
  },
  {
    icon: Globe2,
    title: 'Ship worldwide',
    description: 'Freight, paperwork and incoterm logistics handled end to end.',
  },
];

// Ticker of what is quotable today, followed by the wider range.
const tickerItems = [
  ...products.filter((p) => !p.comingSoon).map((p) => `${p.name} · ${p.origin}`),
  'Essential Oils',
  'Oleoresins',
  'Spices',
  'Powders',
  'Eco Disposables',
];

function ValuePropCard({
  icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  const { ref, visible } = useReveal();
  const Icon = icon;
  return (
    <div
      ref={ref}
      className={`card card-hover card-glow group relative overflow-hidden p-8 reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span
        className="absolute right-6 top-5 font-heading text-6xl font-light text-line transition-colors duration-300 group-hover:text-gold/30"
        aria-hidden="true"
      >
        0{index + 1}
      </span>
      <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-green to-green-light text-gold-light shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <Icon size={26} strokeWidth={1.75} />
      </div>
      <h3 className="mt-6 text-2xl">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-secondary">{description}</p>
    </div>
  );
}

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="relative border-y border-line bg-surface py-5" aria-label="Product range">
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              aria-hidden={i >= tickerItems.length}
              className="flex items-center gap-10 whitespace-nowrap font-heading text-lg text-ink/80 md:text-xl"
            >
              {item}
              <Sparkles size={14} className="text-gold" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HomeSection() {
  const statsReveal = useReveal({ threshold: 0.3 });
  const valuesReveal = useReveal();
  const processReveal = useReveal();

  return (
    <section id="home" className="scroll-mt-20 overflow-hidden bg-bg">
      {/* Hero ------------------------------------------------------------ */}
      <div className="surface-dark overflow-hidden">
        <div className="grid-pattern pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-green-light/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-wrap pb-16 pt-12 md:pb-24 md:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <a
                href={productHref('medjool-dates')}
                onClick={(e) => handleRouteLinkClick(e, () => navigateToProduct('medjool-dates'))}
                className="group mb-7 inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white/90 backdrop-blur transition-colors hover:border-gold-light/60 hover:bg-white/10"
              >
                <span className="rounded-full bg-gradient-to-b from-gold-light to-gold px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-green-deep">
                  New
                </span>
                Medjool Dates from Jordan now available
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>

              <p className="eyebrow-light">Merchant Export House · Rohtak, India</p>

              <h1 className="mt-5 text-[2.65rem] font-normal leading-[1.02] text-white sm:text-6xl lg:text-[4.6rem]">
                A botanical export house in India,{' '}
                <span className="text-gradient-gold font-medium">fully documented to spec.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                SJD TRADEHOUSE is a merchant export house and wholesale botanical ingredients
                supplier, sourcing, testing, and shipping botanical ingredients to formulators
                and flavour houses worldwide. Every consignment arrives with a complete paper
                trail, from origin to your dock.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={routeHref('register')}
                  onClick={(e) => handleRouteLinkClick(e, () => navigate('register'))}
                  className="btn-gold !px-7 !py-3.5 text-[0.95rem]"
                >
                  Request a Quote <ArrowRight size={17} />
                </a>
                <a
                  href={routeHref('register')}
                  onClick={(e) => handleRouteLinkClick(e, () => navigate('register'))}
                  className="btn-glass !px-7 !py-3.5 text-[0.95rem]"
                >
                  Browse Products
                </a>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
                {['GC-MS tested batches', 'COA with every lot', 'Ships worldwide'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <BadgeCheck size={17} className="text-gold-light" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image collage */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/15">
                <Picture
                  src="/images/Shipping.jpg"
                  alt="A shipping container being loaded onto a cargo vessel at port"
                  width={612}
                  height={410}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-deep/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-end gap-4 text-right sm:left-48">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-light">
                      Origin to dock
                    </p>
                    <p className="mt-1 font-heading text-xl text-white">Every consignment, fully documented</p>
                  </div>
                </div>
              </div>

              <a
                href={productHref('medjool-dates')}
                onClick={(e) => handleRouteLinkClick(e, () => navigateToProduct('medjool-dates'))}
                className="group absolute -bottom-8 -left-3 hidden w-52 animate-float overflow-hidden rounded-md bg-white p-2 shadow-lift sm:block md:-left-10"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  <Picture
                    src="/images/Medjool_Dates.jpg"
                    alt="Medjool dates"
                    width={208}
                    height={156}
                    fetchPriority="low"
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between px-1.5 pb-1 pt-2.5">
                  <div>
                    <p className="text-sm font-bold text-ink">Medjool Dates</p>
                    <p className="text-xs text-ink-muted">Jordan · Available</p>
                  </div>
                  <ArrowUpRight size={16} className="text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>

              <div
                className="absolute -right-2 -top-6 hidden rounded-md border border-white/15 bg-green-deep/70 px-5 py-4 text-white shadow-lift backdrop-blur-md sm:block md:-right-6"
                style={{ animation: 'float 7s ease-in-out 1s infinite' }}
              >
                <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-light">
                  <FileCheck size={13} /> Paper trail
                </p>
                <p className="mt-1 font-heading text-3xl">8 docs</p>
                <p className="text-xs text-white/60">with every consignment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsReveal.ref} className="border-t border-white/10 bg-green-deep/40">
          <div className="container-wrap grid grid-cols-1 divide-y divide-white/10 py-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-10">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>

      <Ticker />

      {/* Why us ---------------------------------------------------------- */}
      <div ref={valuesReveal.ref} className="container-wrap py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className={`reveal ${valuesReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">Why SJD TRADEHOUSE</p>
            <h2 className="mt-4 text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              A merchant export house built to bridge origin and formulation
            </h2>
          </div>
          <p
            className={`reveal text-base leading-relaxed text-ink-secondary md:text-lg ${valuesReveal.visible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            We sit between the farm and the formulation lab: procuring directly from
            origin regions, GC-MS testing every batch, and shipping as a documented
            essential oil supplier with paperwork that clears customs on the first try.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valueProps.map((prop, i) => (
            <ValuePropCard key={prop.title} {...prop} index={i} />
          ))}
        </div>
      </div>

      {/* Process ---------------------------------------------------------- */}
      <div className="bg-gradient-to-b from-green-tint/70 to-bg">
        <div ref={processReveal.ref} className="container-wrap py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">How we work</p>
            <h2 className="mt-4 text-[2.2rem] leading-[1.1] md:text-5xl">From origin to your dock</h2>
          </div>
          <div className="relative mt-14">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:block"
              aria-hidden="true"
            />
            <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className={`reveal relative text-center ${processReveal.visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 110}ms` }}
                >
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-white text-green shadow-soft">
                    <Icon size={26} strokeWidth={1.75} />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[0.7rem] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-secondary">
                    {step.description}
                  </p>
                </li>
              );
            })}
            </ol>
          </div>

          <p className="mt-14 text-center text-sm text-ink-secondary">
            New to sourcing from India?{' '}
            <a
              href={routeHref('guide')}
              onClick={(e) => handleRouteLinkClick(e, () => navigate('guide'))}
              className="font-semibold text-green underline decoration-gold/60 decoration-2 underline-offset-4 transition-colors hover:text-gold"
            >
              Read our guide to choosing an essential oil export partner
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
