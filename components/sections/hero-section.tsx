'use client';

import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-white via-lavender-50/30 to-sage-50/20 overflow-hidden">
      
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-10 w-64 h-64 bg-lavender-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-10 w-80 h-80 bg-sage-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gold-50/20 rounded-full blur-3xl" />
      </div>

      <div className="container-section relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="text-center lg:text-left space-y-8">

            {/* Main headline */}
            <h1 className="text-navy-900 leading-tight">
              Begin Your Journey of
              <span className="block mt-3 text-navy-800">
                Self-Discovery and Inner Peace
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-navy-600 leading-relaxed">
              Professional guided Past Life Regression sessions in a safe, calm, and compassionate environment.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-navy-500 text-lg">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage-500" />
                Certified Practitioner
              </span>

              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500" />
                Safe Environment
              </span>

              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lavender-500" />
                Compassionate Guidance
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 pt-6">
              
              <Button
                size="lg"
                className="btn-primary text-xl px-12 py-7 h-auto"
                onClick={() => {
                  document.getElementById('booking')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
              >
                <Calendar className="mr-3 h-6 w-6" />
                Book a Session
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="btn-outline text-xl px-12 py-7 h-auto border-2"
                asChild
              >
                <a
                  href="https://wa.me/916351433751?text=Hello!%20I%27m%20interested%20in%20learning%20more%20about%20Past%20Life%20Regression%20sessions."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  WhatsApp Inquiry
                </a>
              </Button>

            </div>

            {/* Scroll indicator */}
            <div className="pt-12">
              <button
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
                className="text-navy-400 hover:text-navy-600 transition-colors"
                aria-label="Scroll to learn more"
              >
                <span className="block text-sm mb-3">Learn More</span>

                <svg
                  className="w-6 h-6 mx-auto animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">

              <Image
                src="/images/rekha.jpeg"
                alt="Rekha Vasant"
                width={360}
                height={480}
                priority
                className="rounded-3xl shadow-2xl object-cover"
              />

              <Image
                src="/images/ipla-badge.png"
                alt="IPLA Accredited"
                width={90}
                height={90}
                className="absolute -top-6 -right-6 rounded-full shadow-xl"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}