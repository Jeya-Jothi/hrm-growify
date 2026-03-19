"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Users, ShieldCheck } from "lucide-react";

/* ─────────────────────────── constants ──────────────────────────── */
const RADIUS = 45;
const STROKE = 5;
const VIEWBOX = 110; // (RADIUS + STROKE/2 + padding) * 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ANIM_DURATION = 2400; // ms

/* ─────────────────────────── types ─────────────────────────────── */
interface MetricDef {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ElementType;
  ringColor: string;
  glowColor: string;
  textColorClass: string;
  iconClass: string;
  borderColor: string;
  maxForRing: number;
}

/* ─────────────────────────── data ──────────────────────────────── */
const METRICS: MetricDef[] = [
  {
    value: 30,
    suffix: "%",
    label: "Increase in Productivity",
    description: "Average gain in workforce efficiency within 3 months.",
    icon: TrendingUp,
    ringColor: "#60A5FA",
    glowColor: "rgba(96,165,250,0.45)",
    textColorClass: "text-blue-400",
    iconClass: "bg-blue-500/15 text-blue-400",
    borderColor: "rgba(59,130,246,0.25)",
    maxForRing: 100,
  },
  {
    value: 10,
    suffix: "hrs",
    label: "Saved Per Week",
    description: "Reduction in manual administrative tasks for HR managers.",
    icon: Clock,
    ringColor: "#A78BFA",
    glowColor: "rgba(167,139,250,0.45)",
    textColorClass: "text-violet-400",
    iconClass: "bg-violet-500/15 text-violet-400",
    borderColor: "rgba(139,92,246,0.25)",
    maxForRing: 40,
  },
  {
    value: 95,
    suffix: "%",
    label: "Employee Retention",
    description:
      "Improvement in retention rates for companies using our engagement tools.",
    icon: Users,
    ringColor: "#34D399",
    glowColor: "rgba(52,211,153,0.45)",
    textColorClass: "text-emerald-400",
    iconClass: "bg-emerald-500/15 text-emerald-400",
    borderColor: "rgba(16,185,129,0.25)",
    maxForRing: 100,
  },
  {
    value: 100,
    suffix: "%",
    label: "Compliance Accuracy",
    description: "Automated updates ensure you never miss a regulation change.",
    icon: ShieldCheck,
    ringColor: "#FCD34D",
    glowColor: "rgba(252,211,77,0.45)",
    textColorClass: "text-amber-400",
    iconClass: "bg-amber-500/15 text-amber-400",
    borderColor: "rgba(245,158,11,0.25)",
    maxForRing: 100,
  },
];

/* ─────────────────────────── easing ────────────────────────────── */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ─────────────────────────── hooks ─────────────────────────────── */
function useAnimatedCounter(to: number, inView: boolean): number {
  const [value, setValue] = useState(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    setValue(1);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / ANIM_DURATION, 1);
      setValue(Math.round(1 + (to - 1) * easeOutCubic(progress)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, to]);

  return value;
}

function useAnimatedOffset(
  value: number,
  maxForRing: number,
  inView: boolean,
): number {
  const [offset, setOffset] = useState(CIRCUMFERENCE);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const targetOffset = CIRCUMFERENCE * (1 - value / maxForRing);
    setOffset(CIRCUMFERENCE);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / ANIM_DURATION, 1);
      setOffset(
        CIRCUMFERENCE + (targetOffset - CIRCUMFERENCE) * easeOutCubic(progress),
      );
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value, maxForRing]);

  return offset;
}

/* ─────────────────────────── sub-components ────────────────────── */
function MetricRing({
  value,
  maxForRing,
  ringColor,
  glowColor,
  inView,
}: Pick<MetricDef, "value" | "maxForRing" | "ringColor" | "glowColor"> & {
  inView: boolean;
}) {
  const offset = useAnimatedOffset(value, maxForRing, inView);
  const cx = VIEWBOX / 2;
  const cy = VIEWBOX / 2;

  return (
    <svg
      width={VIEWBOX}
      height={VIEWBOX}
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className="absolute inset-0 -rotate-90"
      aria-hidden
    >
      {/* Outer decorative dashes ring */}
      <circle
        cx={cx}
        cy={cy}
        r={RADIUS + 10}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={1}
        strokeDasharray="3 6"
      />
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={STROKE}
      />
      {/* Glow layer (wider, blurry) */}
      <circle
        cx={cx}
        cy={cy}
        r={RADIUS}
        fill="none"
        stroke={ringColor}
        strokeWidth={STROKE + 4}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        opacity={0.15}
      />
      {/* Progress arc */}
      <circle
        cx={cx}
        cy={cy}
        r={RADIUS}
        fill="none"
        stroke={ringColor}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 5px ${glowColor})` }}
      />
    </svg>
  );
}

function MetricCard({
  metric,
  inView,
  index,
}: {
  metric: MetricDef;
  inView: boolean;
  index: number;
}) {
  const count = useAnimatedCounter(metric.value, inView);
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 64, scale: 0.88 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 64, scale: 0.88 }
      }
      transition={{
        duration: 0.65,
        delay: index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 28px 64px -12px ${metric.glowColor}`,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="group relative flex flex-col items-center text-center rounded-3xl bg-white dark:bg-neutral-900/80 backdrop-blur-sm shadow-xl px-6 py-8 overflow-hidden transition-colors duration-300"
      style={{ border: `1px solid ${metric.borderColor}` }}
    >
      {/* Gradient top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${metric.ringColor}, transparent)`,
        }}
      />

      {/* Top inner glow blob */}
      <div
        className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full blur-3xl opacity-[0.12] group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: metric.ringColor }}
      />

      {/* Ring + centre icon */}
      <div
        className="relative flex items-center justify-center mb-5"
        style={{ width: VIEWBOX, height: VIEWBOX }}
      >
        <MetricRing
          value={metric.value}
          maxForRing={metric.maxForRing}
          ringColor={metric.ringColor}
          glowColor={metric.glowColor}
          inView={inView}
        />
        {/* Icon centered in ring */}
        <div
          className={`relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center ${metric.iconClass}`}
        >
          <Icon size={20} />
        </div>
      </div>

      {/* Animated counter */}
      <div
        className={`text-5xl font-black tracking-tight leading-none mb-3 ${metric.textColorClass}`}
      >
        {count}
        <span className="text-3xl font-extrabold ml-0.5">{metric.suffix}</span>
      </div>

      {/* Label */}
      <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100 mb-2 leading-snug">
        {metric.label}
      </p>

      {/* Description */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {metric.description}
      </p>

      {/* Bottom animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-3xl bg-black/5 dark:bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: metric.ringColor }}
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : { width: "0%" }}
          transition={{
            duration: 2.4,
            delay: index * 0.13 + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
// ? { width: `${(metric.value / metric.maxForRing) * 100}%` }
/* ─────────────────────────── main component ─────────────────────── */
export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-10 xl:py-20 px-6 lg:px-16 overflow-hidden"
    >
      <div className="lg:max-w-7xl mx-auto">
        {/* ──── Section header ──── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
            Real Impact
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gradient">
            Driving Results for
            <br />
            <span className="text-blue-500">Modern Teams</span>
          </h2>

          <p className="mt-5 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg max-w-xl mx-auto">
            See how high-performing organizations use Growifyhrm to transform
            their workforce management.
          </p>
        </motion.div>

        {/* ──── Metric cards ──── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {METRICS.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              inView={inView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
