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
  { label: 'Grains & Millets', route: 'register' },
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
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />

      {/* Closing CTA */}
      {route !== 'contact' && (
        <div className="container-wrap footer-cta-wrap">
          <div className="footer-cta">
            <div className="footer-cta-copy">
              <p className="kicker kicker-light">Start a consignment</p>
              <h2>
                Good things begin with <em>a conversation.</em>
              </h2>
              <p>
                Tell us the product, volume and destination. Our trade desk replies with a quote
                and the full document set within 48 hours.
              </p>
              <div className="footer-cta-actions">
                <button type="button" onClick={navigateToOrderPortal} className="btn-lux">
                  Request a Quote <ArrowRight size={17} />
                </button>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lux-ghost"
                >
                  <MessageCircle size={17} /> WhatsApp us
                </a>
              </div>
            </div>
            <div className="footer-cta-media" aria-hidden="true">
              <Picture
                src="/images/Turkish_Figs.jpg"
                alt=""
                width={760}
                height={507}
                wrapperClassName="block h-full"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <div className="container-wrap footer-main">
        <div className="footer-grid">
          <div>
            <div className="flex items-center gap-3">
              <Picture
                src="/images/logo-96.jpg"
                alt="SJD TRADEHOUSE logo"
                width={48}
                height={48}
                wrapperClassName="footer-logo"
                className="h-full w-full object-cover"
              />
              <div className="leading-none">
                <p className="font-heading text-xl font-medium tracking-wide text-white">SJD TRADEHOUSE</p>
                <p className="mt-1.5 font-label text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold-light">
                  Merchant Trading
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-white/60">
              A merchant export house connecting fine dried fruits, nuts and botanical ingredients with wholesale buyers worldwide.
            </p>
            {route !== 'contact' && (
              <div className="footer-contacts">
                <a href={`mailto:${CONTACT.salesEmail}`}>
                  <Mail size={15} /> {CONTACT.salesEmail}
                </a>
                <a href={`mailto:${CONTACT.supportEmail}`}>
                  <Mail size={15} /> {CONTACT.supportEmail}
                </a>
                <a href={`tel:${CONTACT.phoneUae.tel}`}>
                  <Phone size={15} /> {CONTACT.phoneUae.display}
                </a>
                <a href={`tel:${CONTACT.phoneIndia.tel}`}>
                  <Phone size={15} /> {CONTACT.phoneIndia.display}
                </a>
                <p>
                  <MapPin size={15} /> {CONTACT.city}
                </p>
              </div>
            )}
          </div>

          <div>
            <h4 className="footer-heading">Navigate</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={routeHref(link.route)}
                    onClick={(e) => handleRouteLinkClick(e, () => navigate(link.route))}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={routeHref(link.route)}
                    onClick={(e) => handleRouteLinkClick(e, () => navigate(link.route))}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Newsletter</h4>
            <p className="mb-5 text-[0.95rem] leading-relaxed text-white/60">
              New-crop availability and market notes, direct to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="footer-form">
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
                aria-label="Email for newsletter"
              />
              <button type="submit" disabled={status === 'loading'}>
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
      </div>

      <div className="footer-signature" aria-hidden="true" data-wordmark="SJD TRADEHOUSE" />

      <div className="container-wrap footer-bottom">
        <p>&copy; {new Date().getFullYear()} SJD TRADEHOUSE. All rights reserved.</p>
        <p>Good origins. Great possibilities.</p>
      </div>
    </footer>
  );
}
