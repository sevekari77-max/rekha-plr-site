'use client';

import { BookingForm } from '@/components/booking-form';
import { SessionType } from '@/lib/supabase/types';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

const defaultSessionTypes: SessionType[] = [
  {
    id: '1',
    name: 'Introductory Session',
    description: 'A gentle introduction to Past Life Regression.',
    duration_minutes: 60,
    features: ['Guided relaxation', 'First exploration', 'Supportive environment'],
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
    description: 'Extended session for deeper exploration.',
    duration_minutes: 90,
    features: ['Extended exploration', 'Pattern recognition', 'Integration support'],
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
    description: 'Complete PLR with personal guidance.',
    duration_minutes: 120,
    features: ['Complete session', 'Personal guidance', 'Extended support'],
    is_online: true,
    is_in_person: true,
    is_active: true,
    display_order: 3,
    created_at: '',
    updated_at: '',
  },
];

export function BookingSection() {
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
    <section
      id="booking"
      className="section-padding bg-gradient-to-b from-white via-sage-50/20 to-white"
    >
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-navy-900 mb-6">Book Your Session</h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Fill out the form below to request a session. We will contact you
            within 24 hours to confirm your booking.
          </p>
        </div>

        <div className="card-soft p-6 md:p-10">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
            </div>
          ) : (
            <BookingForm sessionTypes={sessionTypes} />
          )}
        </div>
      </div>
    </section>
  );
}
