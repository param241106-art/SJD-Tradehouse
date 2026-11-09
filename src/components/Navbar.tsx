import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X, Phone } from 'lucide-react';
import { useScrolled } from '@/lib/hooks';
import { useRoute, navigate, navigateToOrderPortal, routeHref, handleRouteLinkClick } from '@/lib/router';
import type { Route } from '@/lib/router';
import { Picture } from '@/components/Picture';
import { CONTACT } from '@/lib/site';

const navLinks: { label: string; route: Exclude<Route, 'product'> }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Products', route: 'register' },
  { label: 'House', route: 'house' },
  { label: 'About Us', route: 'about' },
  { label: 'Trade', route: 'trade' },
  { label: 'Contact', route: 'contact' },
];

function Brand({ onClick, dark = true }: { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; dark?: boolean }) {
  return (
    <a href={routeHref('home')} onClick={onClick} className="group flex items-center gap-3">
      <Picture
        src="/images/logo-96.jpg"
        alt="SJD TRADEHOUSE logo"
        width={48}
        height={48}
        loading="eager"
        wrapperClassName="block shrink-0 overflow-hidden rounded-full ring-2 ring-gold/50 transition-all duration-300 group-hover:ring-gold"
        className="h-10 w-10 object-cover"
      />
      <div className="leading-none">
        <p
          className={`font-heading text-[1.05rem] font-semibold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}
        >
          SJD TRADEHOUSE
        </p>
        <p className="mt-1 font-label text-[0.6rem] font-bold uppercase tracking-[0.24em] text-gold-light">
          Merchant Trading
        </p>
      </div>
    </a>
  );
}

export function Navbar() {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentRoute = useRoute();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const go = (route: Exclude<Route, 'product'>) => {
    navigate(route);
    setMobileOpen(false);
  };

  const requestQuote = () => {
    navigateToOrderPortal();
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-green/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl'
            : 'border-b border-white/5 bg-green'
        }`}
      >
        <nav className="container-wrap flex h-16 items-center justify-between md:h-[4.5rem]">
          <Brand onClick={(e) => handleRouteLinkClick(e, () => go('home'))} />

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = currentRoute === link.route;
              return (
                <a
                  key={link.route}
                  href={routeHref(link.route)}
                  onClick={(e) => handleRouteLinkClick(e, () => go(link.route))}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? 'bg-white/10 text-gold-light' : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${CONTACT.phoneUae.tel}`}
              className="hidden items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-white xl:flex"
            >
              <Phone size={15} className="text-gold-light" /> {CONTACT.phoneUae.display}
            </a>
            <button type="button" onClick={requestQuote} className="btn-gold !py-2.5">
              Request a Quote <ArrowRight size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="surface-dark fixed inset-0 z-50 flex flex-col overflow-y-auto lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="container-wrap flex h-16 items-center justify-between">
            <Brand onClick={(e) => handleRouteLinkClick(e, () => go('home'))} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="container-wrap mt-6 flex flex-1 flex-col">
            {navLinks.map((link, i) => (
              <a
                key={link.route}
                href={routeHref(link.route)}
                onClick={(e) => handleRouteLinkClick(e, () => go(link.route))}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`flex animate-fade-up items-center justify-between border-b border-white/10 py-4 font-heading text-3xl ${
                  currentRoute === link.route ? 'text-gold-light' : 'text-white'
                }`}
              >
                {link.label}
                <ArrowRight size={20} className="text-white/40" />
              </a>
            ))}
            <button type="button" onClick={requestQuote} className="btn-gold mt-8 w-full !py-4 text-base">
              Request a Quote <ArrowRight size={18} />
            </button>
            <div className="mt-auto space-y-1 pb-8 pt-10 text-sm text-white/60">
              <a href={`tel:${CONTACT.phoneUae.tel}`} className="block hover:text-white">
                {CONTACT.phoneUae.display}
              </a>
              <a href={`mailto:${CONTACT.salesEmail}`} className="block hover:text-white">
                {CONTACT.salesEmail}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
