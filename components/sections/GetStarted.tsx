"use client";

import { motion } from "framer-motion";
import { CircleCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import LivePulseIcon from "@/components/ui/LivePluseIcon";

/* ─────────────────────────── data ──────────────────────────── */
const TRUST_ITEMS = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
] as const;

/* ─────────────────────────── animation helper ───────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

/* ─────────────────────────── component ──────────────────────── */
export default function GetStarted() {
  return (
    <section className="relative py-15 md:py-24 px-6 lg:px-16 overflow-hidden">
      {/* ── Ambient glow behind the card ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[700px] h-[420px] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>
      <div className="pointer-events-none absolute bottom-50 left-1/4 -z-10 w-[400px] h-[250px] rounded-full bg-violet-400/10 blur-[100px]" />

      {/* ── Card wrapper (animation) ── */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ══ First div: gradient background — creates the gradient border ══ */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-500/70 via-violet-500/50 to-blue-200/50 p-0.5">
            {/* ══ Second div: p-0.5 + glass effect ══ */}
            <div className="rounded-[22px] p-0.5 backdrop-blur-2xl bg-white/85 dark:bg-neutral-950/90">
              {/* ── Inner content area ── */}
              <div className="relative rounded-[21px] overflow-hidden px-8 py-20 sm:px-16 sm:py-24 text-center">
                {/* Radial glows inside the card */}
                <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blue-500/10 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-20 right-1/4 w-[320px] h-[240px] rounded-full bg-violet-500/10 blur-[80px]" />

                {/* Subtle dot grid texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* ── Badge ── */}
                <motion.div
                  {...fadeUp(0.1)}
                  className="flex justify-center mb-8"
                >
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900/70 backdrop-blur">
                    <LivePulseIcon />
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                      Get Started
                    </span>
                  </div>
                </motion.div>

                {/* ── Heading ── */}
                <motion.h2
                  {...fadeUp(0.18)}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
                >
                  <span className="text-neutral-900 dark:text-white">
                    Ready to modernize
                  </span>
                  <br />
                  <span className="text-blue-500">your workforce?</span>
                </motion.h2>

                {/* ── Subtitle ── */}
                <motion.p
                  {...fadeUp(0.26)}
                  className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
                >
                  Join thousands of companies using Growifyhrm to automate HR
                  tasks and empower their teams.
                </motion.p>

                {/* ── CTA Buttons ── */}
                <motion.div
                  {...fadeUp(0.34)}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                >
                  <Link
                    href="#"
                    className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-300 animate-glow shadow-lg shadow-blue-500/25"
                  >
                    Get Started for Free
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform duration-200"
                    />
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-200"
                  >
                    Schedule Demo
                  </Link>
                </motion.div>

                {/* ── Trust badges ── */}
                <motion.div
                  {...fadeUp(0.42)}
                  className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                >
                  {TRUST_ITEMS.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      <CircleCheck
                        size={14}
                        className="text-blue-500 shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          {/* ══ End gradient border card ══ */}
        </motion.div>
      </div>
    </section>
  );
}
