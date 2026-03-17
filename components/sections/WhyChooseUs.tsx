"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const features = [
  {
    title: "Autonomous Payroll Automation",
    desc: "Run payroll in minutes with an AI-powered payroll engine that detects anomalies, calculates complex taxes across regions, and ensures 100% regulatory compliance automatically.",
  },
  {
    title: "Smart Attendance Tracking",
    desc: "Geofenced clock-ins, biometric integrations, and automated timesheets that sync directly with payroll to eliminate manual tracking.",
  },
  {
    title: "Built-in Compliance Engine",
    desc: "Stay compliant with evolving labor laws, tax regulations, and statutory requirements with automatic updates built directly into the system.",
  },
  {
    title: "Predictive Workforce Analytics",
    desc: "Use AI insights to predict employee retention risks, forecast workforce costs, and identify performance improvement opportunities.",
  },
  {
    title: "Global Hiring & Employer of Record",
    desc: "Hire and manage talent from 150+ countries while we handle contracts, compliance, payroll, and employer responsibilities.",
  },
  {
    title: "Employee Mobile Super App",
    desc: "Give employees a powerful self-service mobile experience for leave requests, expense claims, payslips, and HR support.",
  },
  {
    title: "Performance & Goals Management",
    desc: "Drive performance with OKRs, goal tracking, and 360-degree feedback cycles designed for modern high-growth teams.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-blue-400 font-semibold mb-3 tracking-wide uppercase text-sm">
            Why Companies Choose Us
          </p>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            The Complete{" "}
            <span className="text-blue-500">HR Operating System</span> for
            Modern Companies
          </h2>

          <p className="text-gray-400 text-lg">
            Replace fragmented HR tools with one intelligent platform designed
            to automate payroll, manage employees, maintain compliance, and
            unlock workforce insights that help your company scale faster.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
              }}
              className="group relative p-7 rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl hover:border-blue-500 transition-all duration-300"
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/5 transition pointer-events-none" />

              <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {feature.desc}
              </p>

              <Link
                href="#"
                className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:text-blue-500 transition"
              >
                Learn more
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
