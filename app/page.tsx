import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import VisorStage from '@/components/ui/VisorStage';
import { faqSchema } from '@/lib/schema';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Nav from '@/components/sections/Nav';
import ServiceSection from '@/components/sections/ServiceSection';
import StatementSection from '@/components/sections/StatementSection';
import FaqSection from '@/components/sections/FaqSection';
import FinaleSection from '@/components/sections/FinaleSection';
import ProcessSection from '@/components/sections/ProcessSection';

export default function Page() {
  return (
    <>
      <Nav home />
      <VisorStage />
      <main id="contenido">
        <div className="film" data-kf-zone>
          <Hero />
          <StatementSection />
        </div>
        <ServiceSection />
        <ProcessSection />
        <FaqSection />
        <FinaleSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
