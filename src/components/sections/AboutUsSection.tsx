import { Section, SectionHeader, CTABand } from '@/components/Section';
import { useReveal } from '@/lib/hooks';
import { navigate, routeHref, handleRouteLinkClick } from '@/lib/router';

export function AboutUsSection() {
  const introReveal = useReveal();

  return (
    <Section id="about-us" bg="plain">
      <div className="container-wrap">
        <div ref={introReveal.ref} className={`reveal ${introReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="About Us"
            title="About SJD TRADEHOUSE"
            description="A newly launched, boutique trade house based in Rohtak, India, connecting Indian-origin botanical producers directly with international formulators, flavour houses, and wholesale buyers."
            headingLevel="h1"
          />
        </div>

        <p className="mt-8 text-sm text-ink-secondary">
          Evaluating us against other suppliers?{' '}
          <a
            href={routeHref('guide')}
            onClick={(e) => handleRouteLinkClick(e, () => navigate('guide'))}
            className="font-semibold text-green underline underline-offset-2 hover:text-green-mid"
          >
            Read our guide to vetting a botanical export partner
          </a>
          .
        </p>
      </div>

      <div className="mt-20">
        <CTABand
          title="Ready to place your first enquiry?"
          description="Submit a request for quote and receive a reference number to track your enquiry. We respond within 48 hours."
          primaryLabel="Open the Order Portal"
          primaryRoute="register"
          secondaryLabel="Contact the Trade Desk"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}
