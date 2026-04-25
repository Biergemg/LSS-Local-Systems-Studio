import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import FaqAccordion from '@/components/ui/FaqAccordion';
import CTASection from '@/components/sections/CTASection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Nav from '@/components/sections/Nav';
import ProblemSection from '@/components/sections/ProblemSection';
import ResultsSection from '@/components/sections/ResultsSection';
import SystemSection from '@/components/sections/SystemSection';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <SystemSection />
        <ComparisonSection />
        <ResultsSection />
        <FaqAccordion />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
