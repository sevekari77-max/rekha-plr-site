'use client';

import { Button } from '@/components/ui/button';
import { Clock, Video, MapPin, Check } from 'lucide-react';
import { SessionType } from '@/lib/supabase/types';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

const defaultSessionTypes: SessionType[] = [
  {
    id: '1',
    name: 'Introductory Session',
    description: 'A gentle introduction to Past Life Regression for those new to this practice. Experience your first guided journey in a safe, supportive environment.',
    duration_minutes: 60,
    features: ['Guided relaxation', 'First past life exploration', 'Supportive environment', 'Post-session discussion'],
    is_online: true,
    is_in_person: true,
    is_active: true,
    display_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    name: 'Deep PLR Session',
    description: 'An extended session for deeper exploration. Ideal for addressing specific patterns, recurring themes, or seeking greater understanding.',
    duration_minutes: 90,
    features: ['Extended exploration time', 'Pattern recognition', 'Deeper relaxation', 'Comprehensive session', 'Integration support'],
    is_online: true,
    is_in_person: true,
    is_active: true,
    display_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    name: 'PLR + Guidance Session',
    description: 'A comprehensive session combining Past Life Regression with personal guidance. Perfect for those seeking clarity on life direction.',
    duration_minutes: 120,
    features: ['Complete PLR session', 'Personal guidance', 'Clarity exploration', 'Life direction insights', 'Extended support'],
    is_online: true,
    is_in_person: true,
    is_active: true,
    display_order: 3,
    created_at: '',
    updated_at: '',
  },
];

export function SessionTypesSection() {
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessionTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('session_types')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSessionTypes(data && data.length > 0 ? data : defaultSessionTypes);
      } catch (error) {
        console.error('Error fetching session types:', error);
        setSessionTypes(defaultSessionTypes);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionTypes();
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-navy-900 mb-6">Session Options</h2>
          <p className="text-lg text-navy-600">
            Choose the session that feels right for you. All sessions include
            personalized care and a supportive environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            <div className="col-span-3 flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
            </div>
          ) : (
            sessionTypes.map((session) => (
              <div
                key={session.id}
                className="card-soft p-8 flex flex-col"
              >
                <div className="space-y-4 mb-6">
                  <h3 className="text-2xl text-navy-900">{session.name}</h3>
                  <p className="text-navy-600 text-lg leading-relaxed">
                    {session.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-navy-500 mb-4">
                  <span className="flex items-center gap-2 text-base">
                    <Clock className="w-5 h-5" />
                    {session.duration_minutes} minutes
                  </span>
                </div>

                <div className="flex items-center gap-3 text-navy-500 mb-6">
                  {session.is_online && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lavender-50 text-lavender-700 text-sm">
                      <Video className="w-4 h-4" />
                      Online
                    </span>
                  )}
                  {session.is_in_person && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-50 text-sage-700 text-sm">
                      <MapPin className="w-4 h-4" />
                      In-Person
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {session.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-navy-600"
                    >
                      <Check className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="btn-primary w-full"
                  onClick={() => {
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Book Session
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
