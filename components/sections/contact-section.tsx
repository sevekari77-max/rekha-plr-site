'use client';

import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-lavender-50/30 to-white">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-navy-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-navy-600">
            Have questions? We're here to help. Reach out through any of the methods below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="card-soft p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="text-xl text-navy-900 mb-4">Call Us</h3>
            <a
              href="tel:+916351433751"
              className="text-2xl text-navy-700 hover:text-sage-600 transition-colors font-medium mb-4 block"
            >
              +91 6351433751
            </a>
            <Button
              size="lg"
              className="btn-primary w-full"
              asChild
            >
              <a href="tel:+916351433751">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>

          {/* WhatsApp */}
          <div className="card-soft p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl text-navy-900 mb-4">WhatsApp</h3>
            <p className="text-2xl text-navy-700 font-medium mb-4">
              +91 6351433751
            </p>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white w-full"
              asChild
            >
              <a
                href="https://wa.me/916351433751?text=Hello!%20I%27m%20interested%20in%20Past%20Life%20Regression%20sessions."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Email */}
          <div className="card-soft p-8 text-center md:col-span-2">
            <div className="w-16 h-16 rounded-full bg-lavender-100 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-lavender-600" />
            </div>
            <h3 className="text-xl text-navy-900 mb-4">Email Us</h3>
            <a
              href="mailto:rekhavasantkoranne@gmail.com"
              className="text-2xl text-navy-700 hover:text-lavender-600 transition-colors font-medium mb-4 block"
            >
              rekhavasantkoranne@gmail.com
            </a>
            <Button
              size="lg"
              className="btn-secondary w-full max-w-sm mx-auto"
              asChild
            >
              <a href="mailto:rekhavasantkoranne@gmail.com?subject=PLR Session Inquiry">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </Button>
          </div>
        </div>

        {/* Location Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm">
            <MapPin className="w-6 h-6 text-navy-500" />
            <span className="text-lg text-navy-600">
              In-person sessions available in{' '}
              <span className="font-medium text-navy-800">Bhuj, India</span>
            </span>
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-8 text-center text-navy-500 text-base">
          We typically respond within 24 hours during business days.
        </div>
      </div>
    </section>
  );
}
