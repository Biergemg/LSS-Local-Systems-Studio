import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import CTASection from '@/components/sections/CTASection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import DeliverablesSection from '@/components/sections/DeliverablesSection';
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
        <DeliverablesSection />
        <ResultsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
