"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

/* ─── Feature data ─────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: "Autonomous Payroll Automation",
    desc: "Run payroll in minutes with AI that detects anomalies, calculates taxes, and ensures compliance automatically.",
  },
  {
    title: "Smart Attendance Tracking",
    desc: "Geofenced clock-ins, biometric integrations, and automated timesheets that sync directly with payroll.",
  },
  {
    title: "Built-in Compliance Engine",
    desc: "Stay compliant with evolving labor laws and tax regulations with automatic updates built into the system.",
  },
  {
    title: "Predictive Workforce Analytics",
    desc: "Predict retention risks, forecast workforce costs, and identify performance opportunities with AI.",
  },
  {
    title: "Global Hiring & Employer of Record",
    desc: "Hire from 150+ countries while we handle contracts, compliance, payroll, and employer responsibilities.",
  },
  {
    title: "Employee Mobile Super App",
    desc: "Powerful self-service mobile experience for leave, expense claims, payslips, and HR support.",
  },
  {
    title: "Performance & Goals Management",
    desc: "Drive performance with OKRs, goal tracking, and 360-degree feedback cycles for high-growth teams.",
  },
];

/* ─── SVG coordinate system (fixed 500 × 500) ──────────────────────────────── */
const SVG_SIZE = 500;
const SVG_CENTER = SVG_SIZE / 2; // 250
const SVG_SPOKE_RADIUS = 175; // spoke end distance in SVG units

/* Precompute angle for each feature once */
const ANGLES = FEATURES.map(
  (_, i) => (i / FEATURES.length) * Math.PI * 2 - Math.PI / 2,
);

/* SVG endpoint coordinates (stable, no hydration risk) */
const SVG_POSITIONS = ANGLES.map((a) => ({
  x: parseFloat((SVG_CENTER + SVG_SPOKE_RADIUS * Math.cos(a)).toFixed(4)),
  y: parseFloat((SVG_CENTER + SVG_SPOKE_RADIUS * Math.sin(a)).toFixed(4)),
}));

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function HRSystemWheel() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* Measured pixel width of the responsive container */
  const [containerSize, setContainerSize] = useState(0);
  /* Which mobile node is expanded (null = none) */
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerSize(containerRef.current.offsetWidth);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const pixelRadius = containerSize * (SVG_SPOKE_RADIUS / SVG_SIZE);

  const pixelPositions = ANGLES.map((a) => ({
    x: parseFloat((pixelRadius * Math.cos(a)).toFixed(4)),
    y: parseFloat((pixelRadius * Math.sin(a)).toFixed(4)),
  }));

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative scroll-mt-20 py-10 2xl:py-15 px-6 flex flex-col items-center"
      aria-labelledby="hr-wheel-heading"
    >
      {/* ── Section header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center md:max-w-2xl mb-8 md:mb-16"
      >
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
          Platform Overview
        </span>
        <h2
          id="hr-wheel-heading"
          className="text-3xl lg:text-4xl font-bold leading-tight"
        >
          One Central <span className="text-blue-500">HR Operating System</span>{" "}
          Powering Everything
        </h2>
        <p className="mt-4 text-gray-400 text-sm lg:text-lg">
          Replace fragmented tools with a single intelligent platform that
          automates, connects, and scales with your workforce.
        </p>
      </motion.div>

      {/* ── Wheel container ────────────────────────────────────────────────── */}
      {/* overflow:visible lets node cards render outside the measured square   */}
      <div
        ref={containerRef}
        className="relative  w-full sm:w-130 lg:w-200 xl:w-230 2xl:w-250 aspect-square mx-auto"
        style={{ overflow: "visible" }}
      >
        {containerSize > 0 && (
          <>
            {/* ── SVG layer: spokes + animated light rays ────────────────── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              aria-hidden="true"
            >
              <defs>
                {/* Glow filter for the traveling light dot */}
                <filter
                  id="hr-ray-glow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {SVG_POSITIONS.map((pos, i) => (
                <g key={i}>
                  {/* Static spoke line */}
                  <line
                    x1={SVG_CENTER}
                    y1={SVG_CENTER}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="rgba(59,130,246,0.22)"
                    strokeWidth="1.5"
                  />
                  {/* Traveling light dot: center → outer node, loops */}
                  <motion.circle
                    r="3.5"
                    fill="#60a5fa"
                    filter="url(#hr-ray-glow)"
                    initial={{ cx: SVG_CENTER, cy: SVG_CENTER }}
                    animate={
                      inView
                        ? {
                            cx: [SVG_CENTER, pos.x],
                            cy: [SVG_CENTER, pos.y],
                          }
                        : { cx: SVG_CENTER, cy: SVG_CENTER }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0.35,
                      delay: i * 0.28,
                      ease: "easeIn",
                    }}
                  />
                </g>
              ))}
            </svg>

            {/* ── Center node ────────────────────────────────────────────── */}
            <motion.div
              className={[
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
                "w-22 h-22 sm:w-27 sm:h-27 lg:w-33 lg:h-33",
                "rounded-full bg-linear-to-br from-blue-600 to-blue-400",
                "flex flex-col items-center justify-center text-white text-center",
                "shadow-[0_0_64px_rgba(59,130,246,0.55)]",
              ].join(" ")}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: 0.2,
              }}
              aria-label="HR Operating System — core platform hub"
            >
              <span className="text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-wide opacity-75">
                HR Operating
              </span>
              <span className="text-[11px] sm:text-xs lg:text-sm font-bold mt-0.5">
                System
              </span>
            </motion.div>

            {/* ── Outer feature nodes ────────────────────────────────────── */}
            {FEATURES.map((feature, i) => {
              const pos = pixelPositions[i];
              const isExpanded = expandedIndex === i;

              return (
                /* Motion wrapper: starts at container center (left-1/2 top-1/2),
                 * animates by pixel offset to final orbit position.
                 * Inner elements center themselves on this wrapper origin.      */
                <motion.div
                  key={feature.title}
                  className="absolute left-1/2 top-1/2 z-20"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={inView ? { x: pos.x, y: pos.y, opacity: 1 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.5 + i * 0.1,
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                  }}
                >
                  {/* ── Desktop card (≥ lg) ───────────────────────────── */}
                  <motion.div
                    className={[
                      "hidden lg:flex -translate-x-1/2 -translate-y-1/2",
                      "w-55 h-55 xl:w-70 xl:h-70 flex-col items-center justify-center text-center relative rounded-full",
                      "border border-blue-500/30 dark:bg-neutral-900/70 backdrop-blur-xl",
                      "p-3.5 cursor-default",
                      "focus-within:border-blue-500/60",
                    ].join(" ")}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(59,130,246,0.65)",
                    }}
                    transition={{ duration: 0.18 }}
                    role="article"
                    aria-label={feature.title}
                    tabIndex={0}
                  >
                    {/* Soft glow overlay on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      initial={{ backgroundColor: "rgba(59,130,246,0)" }}
                      whileHover={{ backgroundColor: "rgba(59,130,246,0.07)" }}
                      transition={{ duration: 0.18 }}
                    />
                    <h3 className="relative text-base xl:text-lg font-semibold dark:text-white mb-1.5 leading-snug w-[80%]">
                      {feature.title}
                    </h3>
                    <p className="relative text-xs xl:text-sm text-gray-400 leading-relaxed mb-2.5 w-[80%]">
                      {feature.desc}
                    </p>
                    <Link
                      href="#"
                      className="relative text-blue-400 text-[10px] font-medium hover:text-blue-300
                                 transition-colors flex items-center gap-0.5 group w-fit"
                      aria-label={`Learn more about ${feature.title}`}
                    >
                      Learn more
                      <span className="inline-block group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </Link>
                  </motion.div>

                  {/* ── Mobile circle button (< lg) ───────────────────── */}
                  <motion.button
                    className={[
                      "lg:hidden rounded-full flex items-center justify-center text-center",
                      "w-22.5 h-22.5 sm:w-35 sm:h-35",
                      "-translate-x-1/2 -translate-y-1/2",
                      "p-1.5 text-xs sm:text-sm font-medium dark:text-white",
                      "backdrop-blur-xl border transition-colors duration-200",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      isExpanded
                        ? "border-blue-200 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-500/25 shadow-[0_0_24px_rgba(59,130,246,0.55)]"
                        : "border-blue-500/30 dark:bg-neutral-900/70 hover:border-blue-500/55",
                    ].join(" ")}
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    whileTap={{ scale: 0.9 }}
                    aria-expanded={isExpanded}
                    aria-label={
                      isExpanded
                        ? `${feature.title} — tap to collapse`
                        : `${feature.title} — tap to expand`
                    }
                  >
                    {feature.title}
                  </motion.button>
                </motion.div>
              );
            })}
          </>
        )}
      </div>

      {/* ── Mobile expanded-feature panel ──────────────────────────────────── */}
      {/* Shown below the wheel; animates in when a node is tapped.            */}
      <div
        className="lg:hidden w-full max-w-full mt-8"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          {expandedIndex !== null && (
            <motion.div
              key={expandedIndex}
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 6, height: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="rounded-2xl border border-blue-200 dark:border-blue-500/40 bg-blue-100/30 dark:bg-neutral-900/80 
              backdrop-blur-xl p-5"
              >
                <h3 className="text-base font-semibold dark:text-white mb-2">
                  {FEATURES[expandedIndex].title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {FEATURES[expandedIndex].desc}
                </p>
                <Link
                  href="#"
                  className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors
                             flex items-center gap-1 group w-fit"
                  aria-label={`Learn more about ${FEATURES[expandedIndex].title}`}
                >
                  Learn more
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
