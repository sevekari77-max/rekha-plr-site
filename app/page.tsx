import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { BenefitsSection } from '@/components/sections/benefits-section';
import { SessionTypesSection } from '@/components/sections/session-types-section';
import { BookingSection } from '@/components/sections/booking-section';
import { ContactSection } from '@/components/sections/contact-section';
import { FAQSection } from '@/components/sections/faq-section';
import { FinalCTASection } from '@/components/sections/final-cta-section';
import { Footer } from '@/components/sections/footer';
import { Navbar } from '@/components/sections/navbar';
export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <SessionTypesSection />
      <BookingSection />
      <ContactSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
