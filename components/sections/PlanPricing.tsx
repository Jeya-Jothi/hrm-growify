"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "../ui/CountUp";
import {
  Check,
  Sparkles,
  Zap,
  Building2,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────── types ─────────────────────────── */
type BillingCycle = "monthly" | "annual";

interface Plan {
  name: string;
  icon: React.ElementType;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  popular: boolean;
  enterprise: boolean;
}

/* ─────────────────────────── data ──────────────────────────── */
const plans: Plan[] = [
  {
    name: "Starter",
    icon: Zap,
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for small teams getting started.",
    features: [
      "Up to 10 employees",
      "Basic Attendance",
      "Leave Management",
      "Email Support",
      "Mobile App Access",
    ],
    cta: "Start 14-Day Free Trial",
    ctaHref: "#",
    popular: false,
    enterprise: false,
  },
  {
    name: "Growth",
    icon: Sparkles,
    monthlyPrice: 99,
    annualPrice: 79,
    description: "Everything you need to scale operations.",
    features: [
      "Up to 50 employees",
      "Biometric Integration",
      "Automated Payroll",
      "WhatsApp Alerts",
      "Priority email & chat support",
      "Performance Analytics",
    ],
    cta: "Start 14-Day Free Trial",
    ctaHref: "#",
    popular: true,
    enterprise: false,
  },
  {
    name: "Enterprise",
    icon: Building2,
    monthlyPrice: null,
    annualPrice: null,
    description: "Custom solutions for large organizations.",
    features: [
      "Unlimited employees",
      "Custom Workflows",
      "Dedicated Success Manager",
      "SLA Support",
      "On-premise Deployment",
      "Custom API Access",
    ],
    cta: "Contact Sales",
    ctaHref: "#",
    popular: false,
    enterprise: true,
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: "SSL encrypted & secure" },
  { icon: BadgeCheck, label: "99.9% uptime guarantee" },
  { icon: BadgeCheck, label: "Cancel anytime" },
  { icon: BadgeCheck, label: "24 / 7 support on all plans" },
];

/* ─────────────────────────── variants ──────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.7, ease: "easeOut" as const },
  },
};

/* ─────────────────────────── component ─────────────────────── */
export default function PlanPricing() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const updated: Record<string, number> = {};

    plans.forEach((plan) => {
      updated[plan.name] =
        billing === "monthly" ? plan.monthlyPrice || 0 : plan.annualPrice || 0;
    });

    setPrevPrices(updated);

    // after first render, disable initial logic
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [billing]);

  useEffect(() => {
    setPrevPrices((prev) => ({
      ...prev,
      ...Object.fromEntries(
        plans.map((plan) => [
          plan.name,
          billing === "monthly"
            ? plan.monthlyPrice || 0
            : plan.annualPrice || 0,
        ]),
      ),
    }));
  }, [billing]);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-10 md:py-20 xl:py-28 px-6 lg:px-16 overflow-hidden"
    >
      {/* ── Background grid (light) ── */}
      <div
        className="absolute inset-0 -z-10 transition-opacity dark:opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* ── Background grid (dark) ── */}
      <div
        className="absolute inset-0 -z-10 opacity-0 dark:opacity-100 transition-opacity"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* ── Glow blobs ── */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-blue-500/10 blur-[130px] -z-10" />{" "}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[220px] rounded-full bg-blue-400/10 blur-[100px] -z-10" />
      <div className="xl:max-w-7xl mx-auto">
        {/* ════════ Header ════════ */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-5 md:mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
            Pricing
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gradient">
            Simple, transparent
            <br className="hidden sm:block" /> pricing.
          </h2>

          <p className="mt-5 text-neutral-500 dark:text-neutral-400 text-sm lg:text-lg md:max-w-xl mx-auto">
            No hidden fees. No credit card required. Cancel anytime.
            <br className="hidden sm:block" />
            Scale as you grow.
          </p>

          {/* ── Billing toggle ── */}
          <div className="mt-10 flex items-center justify-center gap-4 select-none">
            <span
              className={`text-sm font-medium transition-colors duration-200 ${
                billing === "monthly"
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              Monthly
            </span>

            <button
              onClick={() =>
                setBilling((b) => (b === "monthly" ? "annual" : "monthly"))
              }
              aria-label="Toggle billing cycle"
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                billing === "annual"
                  ? "bg-blue-500"
                  : "bg-neutral-200 dark:bg-neutral-700"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  billing === "annual" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-sm font-medium transition-colors duration-200 ${
                billing === "annual"
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 bg-emerald-500/15 text-emerald-500 text-xs font-semibold rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* ════════ Cards ════════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center"
        >
          {plans.map((plan) => {
            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;

            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                whileHover={
                  plan.popular
                    ? {}
                    : {
                        y: -6,
                        transition: { duration: 0.22, ease: "easeOut" },
                      }
                }
                className={`group relative flex flex-col rounded-3xl border p-5 md:p-8 transition-all duration-300
                  ${
                    plan.popular
                      ? "border-blue-500 bg-white dark:bg-neutral-900 z-10 md:scale-105 shadow-[0_0_50px_-5px_rgba(59,130,246,0.35)] dark:shadow-[0_0_50px_-5px_rgba(59,130,246,0.2)]"
                      : "border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/60 backdrop-blur-sm hover:border-blue-200 dark:hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10"
                  }
                `}
              >
                {/* ── Hover inner glow (non-popular) ── */}
                {!plan.popular && (
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-blue-500/0 group-hover:bg-blue-500/[0.03] dark:group-hover:bg-blue-500/[0.05] transition-colors duration-300" />
                )}

                {/* ── Most Popular badge ── */}
                {plan.popular && (
                  <div className="absolute -top-3.5 md:-top-5.5 inset-x-0 flex justify-center">
                    <motion.span
                      initial={{ opacity: 0, y: -8, scale: 0.88 }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{
                        delay: 0.42,
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-500 text-white text-[11px] font-extrabold tracking-[0.1em] rounded-full shadow-lg shadow-blue-500/40 uppercase"
                    >
                      <Sparkles size={11} />
                      Most Popular
                    </motion.span>
                  </div>
                )}

                {/* ── Plan name + icon ── */}
                <div className="flex items-center gap-3 mb-3 md:mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      plan.popular
                        ? "bg-blue-500/15 text-blue-500"
                        : plan.enterprise
                          ? "bg-amber-500/10 text-amber-500 dark:text-amber-400"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    <plan.icon size={20} />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold tracking-tight">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <motion.span
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 rounded-full bg-blue-500"
                      />
                    )}
                  </div>
                </div>

                {/* ── Price ── */}
                <div className="mb-2 md:min-h-18">
                  {plan.enterprise ? (
                    <p className="text-5xl font-extrabold text-gradient">
                      Custom
                    </p>
                  ) : (
                    <div className="flex items-end gap-1">
                      <motion.span
                        key={billing + plan.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22 }}
                        className="text-5xl font-extrabold tracking-tight flex"
                      >
                        ₹
                        <CountUp
                          from={
                            isFirstLoad
                              ? plan.name === "Growth"
                                ? 90
                                : 0
                              : (prevPrices[plan.name] ?? 0)
                          }
                          to={price || 0}
                          duration={1.2}
                          startWhen={inView}
                          separator=","
                        />
                      </motion.span>
                      <span className="text-neutral-500 dark:text-neutral-400 mb-2 text-sm">
                        /user/mo
                      </span>
                    </div>
                  )}

                  {billing === "annual" &&
                    !plan.enterprise &&
                    plan.monthlyPrice !== 0 && (
                      <motion.p
                        key="saving"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-emerald-500 font-semibold mt-1.5"
                      >
                        Billed annually · Save ₹
                        {(plan.monthlyPrice! - plan.annualPrice!) * 12}
                        /yr
                      </motion.p>
                    )}
                </div>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* ── Divider ── */}
                <div className="border-t border-gray-100 dark:border-neutral-800 mb-6" />

                {/* ── Features ── */}
                <ul className="flex-1 flex flex-col gap-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.popular
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ── CTA ── */}
                <Link
                  href={plan.ctaHref}
                  className={`group/cta mt-auto w-full py-3.5 px-6 rounded-2xl text-center font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
                    ${
                      plan.popular
                        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 animate-glow"
                        : "border border-gray-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }
                  `}
                >
                  {plan.cta}
                  <ArrowRight
                    size={15}
                    className="group-hover/cta:translate-x-0.5 transition-transform duration-200"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ════════ Trust badges ════════ */}
        <motion.div
          variants={footerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500"
            >
              <Icon size={15} className="text-blue-500 flex-shrink-0" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
