import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useScrolled } from '@/lib/hooks';
import { useRoute, navigate, navigateToOrderPortal, routeHref, handleRouteLinkClick } from '@/lib/router';
import type { Route } from '@/lib/router';
import { Picture } from '@/components/Picture';
import { CONTACT } from '@/lib/site';

const navLinks: { label: string; route: Exclude<Route, 'product'> }[] = [
  { label: 'Home', route: 'home' }, { label: 'Products', route: 'register' },
  { label: 'House', route: 'house' }, { label: 'About Us', route: 'about' },
  { label: 'Trade', route: 'trade' }, { label: 'Contact', route: 'contact' },
];

function Brand({ onClick }: { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return <a href={routeHref('home')} onClick={onClick} className="brand-lockup" aria-label="SJD Tradehouse home">
    <Picture src="/images/logo-96.jpg" alt="" width={48} height={48} loading="eager" wrapperClassName="brand-monogram" className="h-full w-full object-cover" />
    <span>SJD TRADEHOUSE<small>MERCHANT TRADING</small></span>
  </a>;
}

export function Navbar() {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentRoute = useRoute();
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = dialog.current;
    const trigger = menuButton.current;
    const focusable = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button') ?? []);
    panel?.querySelector<HTMLButtonElement>('[aria-label="Close menu"]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
      if (e.key !== 'Tab') return;
      const items = focusable();
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); trigger?.focus(); };
  }, [mobileOpen]);

  const go = (route: Exclude<Route, 'product'>) => { navigate(route); setMobileOpen(false); };
  const requestQuote = () => { navigateToOrderPortal(); setMobileOpen(false); };

  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="container-wrap header-inner" aria-label="Main navigation">
        <Brand onClick={e => handleRouteLinkClick(e, () => go('home'))} />
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">{navLinks.map(link => <a key={link.route} href={routeHref(link.route)} onClick={e => handleRouteLinkClick(e, () => go(link.route))} aria-current={currentRoute === link.route ? 'page' : undefined} className="header-link">{link.label}</a>)}</div>
        <button type="button" onClick={requestQuote} className="btn-primary hidden lg:inline-flex">Request a Quote <ArrowUpRight size={16} /></button>
        <button ref={menuButton} type="button" onClick={() => setMobileOpen(true)} className="menu-toggle lg:hidden" aria-label="Open menu" aria-expanded={mobileOpen} aria-controls={mobileOpen ? 'mobile-menu' : undefined}><Menu size={22} /></button>
      </nav>
    </header>
    {mobileOpen && <div id="mobile-menu" ref={dialog} className="mobile-menu fixed inset-0 z-[70] flex flex-col overflow-y-auto lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="container-wrap header-inner"><Brand onClick={e => handleRouteLinkClick(e, () => go('home'))} /><button type="button" onClick={() => setMobileOpen(false)} className="menu-toggle" aria-label="Close menu"><X size={22} /></button></div>
      <nav className="container-wrap flex flex-1 flex-col pb-8" aria-label="Mobile navigation">
        <p className="editorial-kicker mb-6 mt-10">EXPLORE THE HOUSE</p>
        {navLinks.map((link, i) => <a key={link.route} href={routeHref(link.route)} onClick={e => handleRouteLinkClick(e, () => go(link.route))} aria-current={currentRoute === link.route ? 'page' : undefined} className="mobile-menu-link"><span><small aria-hidden="true">0{i + 1}</small>{link.label}</span><ArrowUpRight size={22} strokeWidth={1} /></a>)}
        <button type="button" onClick={requestQuote} className="btn-primary mt-8 w-full">Request a Quote <ArrowUpRight size={18} /></button>
        <a href={`mailto:${CONTACT.salesEmail}`} className="mt-8 text-sm text-ink-secondary">{CONTACT.salesEmail}</a>
      </nav>
    </div>}
  </>;
}
