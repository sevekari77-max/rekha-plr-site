'use client';

import {
  Eye,
  Palmtree,
  Layers,
  TrendingUp,
  Heart,
  Compass
} from 'lucide-react';

const benefits = [
  {
    icon: Eye,
    title: 'Emotional Clarity',
    description:
      'Gain deeper understanding of your emotions and the feelings that shape your daily life.',
    color: 'sage',
  },
  {
    icon: Palmtree,
    title: 'Deep Relaxation',
    description:
      'Experience profound relaxation that helps reduce stress and brings calm to your mind.',
    color: 'lavender',
  },
  {
    icon: Layers,
    title: 'Understanding Patterns',
    description:
      'Recognize recurring patterns in your life and understand their origins.',
    color: 'gold',
  },
  {
    icon: TrendingUp,
    title: 'Personal Growth',
    description:
      'Use insights from your sessions to support your personal development journey.',
    color: 'sage',
  },
  {
    icon: Heart,
    title: 'Inner Peace',
    description:
      'Find a sense of peace and calm that extends beyond your session.',
    color: 'lavender',
  },
  {
    icon: Compass,
    title: 'Spiritual Exploration',
    description:
      'Explore your spiritual side in a safe, supportive environment.',
    color: 'gold',
  },
];

const colorClasses = {
  sage: {
    bg: 'bg-sage-100',
    icon: 'text-sage-600',
  },
  lavender: {
    bg: 'bg-lavender-100',
    icon: 'text-lavender-600',
  },
  gold: {
    bg: 'bg-gold-100',
    icon: 'text-gold-600',
  },
};

export function BenefitsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-lavender-50/20 to-white">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-navy-900 mb-6">
            Benefits of Past Life Regression
          </h2>
          <p className="text-lg text-navy-600">
            Discover how PLR can support your journey toward clarity and peace
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const colors = colorClasses[benefit.color as keyof typeof colorClasses];

            return (
              <div
                key={benefit.title}
                className="card-soft p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}
                >
                  <Icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h3 className="text-xl text-navy-900 mb-3">{benefit.title}</h3>
                <p className="text-navy-600 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
