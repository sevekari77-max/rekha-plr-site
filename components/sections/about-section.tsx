'use client';

import { Sparkles, Shield, Heart } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-padding bg-white"
    >
      <div className="container-section">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-navy-900 mb-8">
            What is Past Life Regression?
          </h2>
          <p className="text-xl text-navy-600 leading-relaxed">
            Past Life Regression is a gentle, guided relaxation technique that
            helps you explore memories and experiences from previous lifetimes.
            Through this journey, many people gain understanding about patterns,
            relationships, and emotions in their current life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Relaxation */}
          <div className="card-soft p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="text-xl text-navy-900 mb-4">Guided Relaxation</h3>
            <p className="text-navy-600 leading-relaxed">
              Enter a peaceful, relaxed state under gentle guidance. You remain
              aware and comfortable throughout the entire experience.
            </p>
          </div>

          {/* Self-Discovery */}
          <div className="card-soft p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-lavender-100 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-lavender-600" />
            </div>
            <h3 className="text-xl text-navy-900 mb-4">Self-Discovery</h3>
            <p className="text-navy-600 leading-relaxed">
              Explore your inner world and gain insights about your life
              patterns, relationships, and personal journey.
            </p>
          </div>

          {/* Safe Environment */}
          <div className="card-soft p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-gold-600" />
            </div>
            <h3 className="text-xl text-navy-900 mb-4">Safe Environment</h3>
            <p className="text-navy-600 leading-relaxed">
              Every session is conducted in a calm, professional, and
              supportive setting. Your comfort and well-being are the priority.
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-lg text-navy-600 leading-relaxed">
            Sessions are available both online and in-person, making it
            convenient for you to experience this journey from wherever you are.
            Each session is tailored to your individual needs and comfort level.
          </p>
        </div>
      </div>
    </section>
  );
}
