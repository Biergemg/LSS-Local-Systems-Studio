import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import { faqSchema } from '@/lib/schema';
import BeliefSection from '@/components/sections/BeliefSection';
import CTASection from '@/components/sections/CTASection';
import EvidenceSection from '@/components/sections/EvidenceSection';
import ExpectationsSection from '@/components/sections/ExpectationsSection';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Nav from '@/components/sections/Nav';
import OfferSection from '@/components/sections/OfferSection';
import PpvSection from '@/components/sections/PpvSection';
import ProcessSection from '@/components/sections/ProcessSection';

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="progress" aria-hidden="true" />
      <Nav />
      <main id="contenido">
        <Hero />
        <BeliefSection />
        <PpvSection />
        <OfferSection />
        <ProcessSection />
        <EvidenceSection />
        <ExpectationsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
