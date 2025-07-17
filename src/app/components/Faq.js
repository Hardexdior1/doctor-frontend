'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: 'How do I book a doctor?',
    answer: 'Simply choose your preferred doctor, select a date and time, fill in your details, and confirm your appointment — no sign-up required.',
  },
  {
    question: 'Can I cancel or reschedule my appointment?',
    answer:"Yes, but only registered users can reschedule via their dashboard. Creating an account makes it easier to manage your bookings"
  },
  {
    question: 'Will I receive a confirmation after booking?',
    answer: 'Yes. You’ll get an instant email confirmation with your appointment details and further instructions.',
  },
  {
    question: 'Is it safe to share my health information?',
    answer: 'Absolutely. We prioritize your privacy and use secure technology to protect your personal and medical data.',
  },
];

export default function LandingPageFAQ() {
  return (
    <section className=" bg-white py-14">
      <h2 className=" font-bold mb-4 text-center text-gray-900">Frequently Asked Questions</h2>
      <p className="text-center mb-10 max-w-xl mx-auto">
        Got questions? We’ve got answers. Here’s everything you need to know about booking a doctor with ease.
      </p>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300">
                <Disclosure.Button className="flex w-full justify-between items-center px-5 py-4 bg-gray-100 hover:bg-gray-200 transition-colors">
                  <span className="text-gray-900 text-base font-medium">{item.question}</span>
                  <ChevronUp
                    className={`h-5 w-5 text-gray-700 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-5 py-4 text-gray-700 text-sm bg-white">
                  {item.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
