import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Personal Notes?",
      answer:
        "Personal Notes is a secure and organized platform for storing and managing your notes. You can create private, public, or shared notes with ease.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes! We use advanced encryption to keep your notes safe and private. Only you can access your private notes.",
    },
    {
      question: "Can I access my notes on multiple devices?",
      answer:
        "Absolutely! Personal Notes is accessible on any device with an internet connection.",
    },
    {
      question: "How do I share notes with others?",
      answer:
        "You can share your notes by setting them to 'Shared' and inviting specific users to view or edit them.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "We are currently working on a mobile app. Stay tuned for updates!",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-2xl w-full px-6 py-12 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center mb-6 text-2xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
              <button
                className="w-full text-left font-semibold text-lg flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? "▲" : "▼"}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
