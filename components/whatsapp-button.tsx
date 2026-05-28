'use client';

import { useState, useEffect } from 'react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/916351433751?text=Hello!%20I%27m%20interested%20in%20learning%20more%20about%20Past%20Life%20Regression%20sessions."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 right-5 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.866 9.866 0 01-5.091-1.396L3.879 19.6l1.378-4.079A9.835 9.835 0 013 11.025C3 5.505 7.505 1 12.025 1a9.828 9.828 0 016.993 2.896 9.816 9.816 0 012.907 6.993c-.003 5.515-4.508 10.02-10.027 10.02m5.552-15.52A7.747 7.747 0 0012.03 3.3c-4.282 0-7.768 3.488-7.77 7.77a7.747 7.747 0 001.242 4.164l.176.278-.749 2.736 2.809-.737.27.162a7.757 7.757 0 003.918 1.072c4.28 0 7.766-3.488 7.766-7.769 0-2.069-.806-4.014-2.269-5.48" />
      </svg>
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </a>
  );
}
