'use client';

import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-lavender-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-section relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-white">
            Ready to Schedule Your Session?
          </h2>

          <p className="text-xl text-navy-200 leading-relaxed">
            Take the first step towards self-discovery and inner clarity.
            We're here to guide you on your journey.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 pt-6">
            <Button
              size="lg"
              className="bg-sage-500 hover:bg-sage-600 text-white text-xl px-12 py-7 h-auto"
              onClick={() => {
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Calendar className="mr-3 h-6 w-6" />
              Book Your Session
            </Button>
            <Button
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xl px-12 py-7 h-auto"
              asChild
            >
              <a
                href="https://wa.me/916351433751?text=Hello!%20I%27m%20interested%20in%20booking%20a%20Past%20Life%20Regression%20session."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                WhatsApp Inquiry
              </a>
            </Button>
          </div>

          <div className="pt-8 text-navy-300">
            <p>Sessions available online worldwide</p>
            <p className="text-navy-400 mt-2">In-person sessions in Bhuj, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}
