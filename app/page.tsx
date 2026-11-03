import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import { faqSchema } from '@/lib/schema';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Nav from '@/components/sections/Nav';
import IncludesSection from '@/components/sections/IncludesSection';
import PerceptionSection from '@/components/sections/PerceptionSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ResultSection from '@/components/sections/ResultSection';

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="progress" aria-hidden="true" />
      <Nav />
      <main id="contenido">
        <Hero />
        <PerceptionSection />
        <ResultSection />
        <IncludesSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
