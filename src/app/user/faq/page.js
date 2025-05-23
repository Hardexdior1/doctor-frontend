'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: 'How do I reschedule an appointment?',
    answer: 'Go to your Appointments page, find the one you want to change, and click "Reschedule". You can then pick a new date and time.',
  },
  {
    question: 'Where can I see my visit history?',
    answer: 'Click on the Dashboard and select "Visit History" to see all your past appointments with details.',
  },
  {
    question: 'How can I print my payment receipts?',
    answer: 'Navigate to "Payment History", then click the print icon or button beside the payment you want a receipt for.',
  },
  {
    question: 'Can I change my password?',
    answer: 'Yes. Go to "Change Password" from your profile settings, enter your current password and new password, then save.',
  },
  {
    question: 'When will I know the doctor assigned to me?',
    answer: 'Once an admin assigns a doctor, your dashboard will update, and you’ll get an email with the doctor’s details.',
  },
];

export default function DashboardFAQ() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="border border-[#207dff]/50 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out">
                <Disclosure.Button
                  className={`flex w-full justify-between items-center px-5 py-4 bg-[#207dff] hover:bg-[#1a6ee2] transition-all duration-300 ease-in-out`}
                >
                  <span className="text-white text-base font-semibold">{item.question}</span>
                  <ChevronUp
                    className={`h-5 w-5 text-white transform transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-5 py-4 text-sm text-black bg-gray-50 transition-all duration-300 ease-in-out">
                  {item.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
