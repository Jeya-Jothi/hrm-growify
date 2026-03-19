"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is Growify secure?",
    a: "Yes, we follow industry standard security protocols including SOC2 compliance and end-to-end encryption for all sensitive data.",
  },
  {
    q: "Can Growify scale with my business?",
    a: "Absolutely. Our infrastructure is built to handle everything from 10-person startups to 10,000+ employee enterprises.",
  },
  {
    q: "Does it integrate with Slack?",
    a: "Yes, we offer deep 2-way integration with Slack, Microsoft Teams, and other collaboration tools.",
  },
  {
    q: "How does the free trial work?",
    a: "You get 14 days of full access to all features. No credit card required to start.",
  },
  {
    q: "Can I export my data?",
    a: "Yes, you can export all your employee data, payroll reports, and logs in CSV or PDF format at any time.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(null);

  const toggle = (i: number) => {
    setActive(active === i ? null : i);
  };
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 py-10 md:py-20 px-6 overflow-hidden"
    >
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-30 h-30 bg-blue-400/30 blur-[100px] rounded-full bottom-40 left-[200px] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Everything you need to know about the product and billing.
          </p>

          <button className="mt-6 text-blue-500 font-medium hover:underline">
            Contact support →
          </button>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden backdrop-blur bg-white/60 dark:bg-white/5"
            >
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.q}
                </span>

                <motion.span
                  animate={{ rotate: active === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-blue-500"
                >
                  ↓
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="px-5 overflow-hidden"
                  >
                    <p className="pb-4 text-gray-600 dark:text-gray-400">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
