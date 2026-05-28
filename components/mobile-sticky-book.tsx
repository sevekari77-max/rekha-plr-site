'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MobileStickyBook() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-navy-100 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 pb-6 safe-area-inset-bottom">
      <Button
        className="w-full btn-primary text-lg py-6"
        onClick={() => {
          document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <Calendar className="mr-2 h-5 w-5" />
        Book Your Session
      </Button>
    </div>
  );
}
