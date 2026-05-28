'use client';

import { FAQ } from '@/lib/supabase/types';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { HelpCircle, MessageCircle, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'What is Past Life Regression?',
    answer:
      'Past Life Regression is a guided relaxation technique that helps you access memories and experiences from previous lifetimes. It uses gentle, safe methods to help you explore and understand patterns in your current life.',
    category: 'general',
    display_order: 1,
    is_active: true,
    created_at: '',
  },
  {
    id: '2',
    question: 'Is Past Life Regression safe?',
    answer:
      'Yes, when conducted by a trained professional, PLR is completely safe. You remain aware and in control throughout the session. It is a gentle, relaxing experience that many find deeply peaceful and insightful.',
    category: 'safety',
    display_order: 2,
    is_active: true,
    created_at: '',
  },
  {
    id: '3',
    question: 'Are online sessions effective?',
    answer:
      'Absolutely. Online sessions are just as effective as in-person sessions. Many clients find they can relax more deeply in their own familiar environment. All you need is a quiet space and a stable internet connection.',
    category: 'online',
    display_order: 3,
    is_active: true,
    created_at: '',
  },
  {
    id: '4',
    question: 'How should I prepare for my session?',
    answer:
      'Choose a quiet, comfortable space where you won\'t be disturbed. Avoid caffeine for a few hours before the session. Wear comfortable clothing. Most importantly, come with an open mind and a willingness to explore.',
    category: 'preparation',
    display_order: 4,
    is_active: true,
    created_at: '',
  },
  {
    id: '5',
    question: 'What happens during a session?',
    answer:
      'The session begins with a conversation about your intentions. You will then be gently guided into a relaxed state. During this state, you may experience memories or insights. Afterward, there is time to discuss and integrate your experience.',
    category: 'session',
    display_order: 5,
    is_active: true,
    created_at: '',
  },
];

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setFaqs(data && data.length > 0 ? data : defaultFAQs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setFaqs(defaultFAQs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender-100 mb-6">
            <HelpCircle className="w-8 h-8 text-lavender-600" />
          </div>
          <h2 className="text-navy-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-navy-600">
            Find answers to common questions about Past Life Regression
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="card-soft border-none px-6"
                >
                  <AccordionTrigger className="text-left text-xl text-navy-900 hover:text-navy-700 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-navy-600 text-lg leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-navy-500 text-lg mb-6">
            Still have questions? We're happy to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/916351433751"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-lg text-sage-600 hover:text-sage-700 font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <span className="text-navy-300 hidden sm:inline">or</span>
            <a
              href="mailto:rekhavasantkoranne@gmail.com"
              className="inline-flex items-center justify-center gap-2 text-lg text-lavender-600 hover:text-lavender-700 font-medium"
            >
              <Mail className="w-5 h-5" />
              Send us an-email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
