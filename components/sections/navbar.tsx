'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export function Navbar() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">

        <div className="flex items-center gap-3">
          <Image
            src="/images/Tree.jpeg"
            alt="Karmic Healing"
            width={85}
            height={85}
            className="rounded-full"
          />

          <div>
            <h2 className="text-3xl font-semibold text-navy-900">
              Karmic Healing
            </h2>

            <p className="text-sm text-sage-600">
              Healing • Transforming • Empowering
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-navy-700 font-medium">
            <a href="#" className="text-navy-900 border-b-2 border-gold-400 pb-1">
              Home
            </a>
          <a href="#about" className="hover:text-navy-900 transition-colors">About PLR</a>
          <a href="#sessions" className="hover:text-navy-900 transition-colors">Sessions</a>
          <a href="#testimonials" className="hover:text-navy-900 transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-navy-900 transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-navy-900 transition-colors">Contact</a>
        </nav>

        <Button
          className="btn-primary"
          onClick={() => {
            document.getElementById('booking')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Book a Session
        </Button>

      </div>
    </header>
  );
}