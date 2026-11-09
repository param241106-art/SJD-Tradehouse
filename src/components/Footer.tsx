import { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { submitLead } from '@/lib/leads';
import { CONTACT } from '@/lib/site';
import { navigate, navigateToOrderPortal, useRoute, routeHref, handleRouteLinkClick } from '@/lib/router';
import type { Route } from '@/lib/router';
import { Picture } from '@/components/Picture';

const navLinks: { label: string; route: Exclude<Route, 'product'> }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Products', route: 'register' },
  { label: 'The House', route: 'house' },
  { label: 'About Us', route: 'about' },
  { label: 'Trade & Markets', route: 'trade' },
  { label: 'Contact', route: 'contact' },
];

const categoryLinks: { label: string; route: Exclude<Route, 'product'> }[] = [
  { label: 'Dried Fruits', route: 'register' },
  { label: 'Essential Oils', route: 'register' },
  { label: 'Oleoresins', route: 'register' },
  { label: 'Spices', route: 'register' },
  { label: 'Nuts', route: 'register' },
  { label: 'Powders', route: 'register' },
  { label: 'Eco Disposables', route: 'register' },
];

export function Footer() {
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    const result = await submitLead(
      'newsletter_submissions',
      { email },
      { subject: 'Newsletter subscription', fields: { Email: email } },
    );
    if (!result.ok) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="surface-dark overflow-hidden bg-green-deep text-white">
      <div className="grid-pattern pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden="true" />

      {/* Closing CTA */}
      {route !== 'contact' && (
        <div className="container-wrap border-b border-white/10 py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow-light">Start a consignment</p>
              <h2 className="mt-4 text-4xl leading-[1.05] text-white md:text-6xl">
                Ready when your <span className="text-gradient-gold">next order</span> is.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
                Tell us the product, volume and destination. Our trade desk replies with a quote
                and the full document set within 48 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={navigateToOrderPortal} className="btn-gold !px-7 !py-3.5">
                Request a Quote <ArrowRight size={17} />
              </button>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass !px-7 !py-3.5"
              >
                <MessageCircle size={17} /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="container-wrap py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <Picture
                src="/images/logo-96.jpg"
                alt="SJD TRADEHOUSE logo"
                width={48}
                height={48}
                wrapperClassName="block shrink-0 overflow-hidden rounded-full ring-2 ring-gold/50"
                className="h-11 w-11 object-cover"
              />
              <div className="leading-none">
                <p className="font-heading text-lg font-semibold text-white">SJD TRADEHOUSE</p>
                <p className="mt-1 font-label text-[0.6rem] font-bold uppercase tracking-[0.24em] text-gold-light">
                  Merchant Trading
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              A merchant export house sourcing, testing, and shipping essential oils and
              oleoresins to wholesale buyers worldwide.
            </p>
            {route !== 'contact' && (
              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${CONTACT.salesEmail}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-gold-light"
                >
                  <Mail size={15} className="text-gold-light" /> {CONTACT.salesEmail}
                </a>
                <a
                  href={`mailto:${CONTACT.supportEmail}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-gold-light"
                >
                  <Mail size={15} className="text-gold-light" /> {CONTACT.supportEmail}
                </a>
                <a
                  href={`tel:${CONTACT.phoneUae.tel}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-gold-light"
                >
                  <Phone size={15} className="text-gold-light" /> {CONTACT.phoneUae.display}
                </a>
                <a
                  href={`tel:${CONTACT.phoneIndia.tel}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-gold-light"
                >
                  <Phone size={15} className="text-gold-light" /> {CONTACT.phoneIndia.display}
                </a>
                <p className="flex items-center gap-2.5 text-sm text-white/70">
                  <MapPin size={15} className="text-gold-light" /> {CONTACT.city}
                </p>
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-5 font-label text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={routeHref(link.route)}
                    onClick={(e) => handleRouteLinkClick(e, () => navigate(link.route))}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-label text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
              Categories
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={routeHref(link.route)}
                    onClick={(e) => handleRouteLinkClick(e, () => navigate(link.route))}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-label text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-white/65">
              New-crop availability and market notes, direct to your inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-1.5 rounded-full border border-white/15 bg-white/5 p-1.5 transition-colors focus-within:border-gold-light/60"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  status === 'success'
                    ? 'Subscribed'
                    : status === 'error'
                      ? 'Enter a valid email'
                      : 'you@company.com'
                }
                className="w-full min-w-0 bg-transparent px-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 rounded-full bg-gradient-to-b from-gold-light to-gold px-5 py-2.5 text-sm font-bold text-green-deep transition-all hover:shadow-glow disabled:opacity-60"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-2 text-xs text-gold-light">Thank you for subscribing.</p>
            )}
            {status === 'error' && (
              <p className="mt-2 text-xs text-[#f0a48c]">Please enter a valid email address.</p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45">
            &copy; {new Date().getFullYear()} SJD TRADEHOUSE. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Rohtak, India &middot; {CONTACT.salesEmail} &middot; {CONTACT.supportEmail}
          </p>
        </div>
      </div>
    </footer>
  );
}
