'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="footer" className="bg-navy-950 text-navy-100">
      <div className="container-section py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-white">
              Past Life Regression
            </h3>
            <p className="text-navy-300 leading-relaxed text-lg">
              Professional guided sessions for self-discovery, inner peace,
              and personal clarity in a safe and compassionate environment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-navy-300 hover:text-white transition-colors text-left text-lg"
              >
                About PLR
              </button>
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-navy-300 hover:text-white transition-colors text-left text-lg"
              >
                Book a Session
              </button>
              <button
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-navy-300 hover:text-white transition-colors text-left text-lg"
              >
                FAQs
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-navy-300 hover:text-white transition-colors text-left text-lg"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Contact</h4>
            <div className="space-y-4">
              <a
                href="mailto:rekhavasantkoranne@gmail.com"
                className="flex items-start gap-3 text-navy-300 hover:text-white transition-colors text-lg"
              >
                <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>rekhavasantkoranne@gmail.com</span>
              </a>
              <a
                href="tel:+916351433751"
                className="flex items-start gap-3 text-navy-300 hover:text-white transition-colors text-lg"
              >
                <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>+91 6351433751</span>
              </a>
              <div className="flex items-start gap-3 text-navy-300 text-lg">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Bhuj, India (In-Person Sessions)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-navy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-navy-400 text-base text-center md:text-left">
              © {new Date().getFullYear()} Past Life Regression. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-base">
              <a
                href="#"
                className="text-navy-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-navy-400 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-navy-900/50 py-6">
        <div className="container-section">
          <p className="text-navy-400 text-sm text-center max-w-4xl mx-auto leading-relaxed">
            <strong className="text-navy-300">Disclaimer:</strong> Past Life
            Regression is a complementary wellness practice. It is not intended
            to diagnose, treat, or cure any condition. It is not a substitute
            for professional medical or psychological care.
          </p>
        </div>
      </div>
    </footer>
  );
}
