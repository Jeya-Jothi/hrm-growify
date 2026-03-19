"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

/* ─────────────────────────── types ─────────────────────────── */
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarBg: string;
}

/* ─────────────────────────── data ──────────────────────────── */
const ROW_ONE: Testimonial[] = [
  {
    quote:
      "Growifyhrm completely changed the way we recruit. We've cut our hiring time in half while improving candidate quality.",
    name: "Sarah Jenkins",
    role: "VP of People",
    company: "TechFlow",
    initials: "SJ",
    avatarBg: "#3B82F6",
  },
  {
    quote:
      "The automated payroll features alone have saved us thousands of dollars in potential errors and late fees. It's a lifesaver.",
    name: "Michael Chen",
    role: "Founder",
    company: "Innovate Labs",
    initials: "MC",
    avatarBg: "#8B5CF6",
  },
  {
    quote:
      "Finally, an HR platform that employees actually love using. The mobile app is intuitive and the self-service portal is fantastic.",
    name: "James Wilson",
    role: "CEO",
    company: "NovaCorp",
    initials: "JW",
    avatarBg: "#10B981",
  },
  {
    quote:
      "Onboarding new hires went from 3 days to 3 hours. The automated workflows completely transformed our people operations.",
    name: "Priya Sharma",
    role: "HR Manager",
    company: "ScaleUp Inc",
    initials: "PS",
    avatarBg: "#EC4899",
  },
  {
    quote:
      "Real-time workforce analytics gave us visibility we never had before. Data-driven decisions are now the norm here.",
    name: "David Kim",
    role: "COO",
    company: "TechVentures",
    initials: "DK",
    avatarBg: "#F59E0B",
  },
];

const ROW_TWO: Testimonial[] = [
  {
    quote:
      "Finally, an HR platform that employees actually love. The mobile app is incredibly intuitive and the self-service portal is fantastic.",
    name: "Elena Rodriguez",
    role: "HR Director",
    company: "Global Synergy",
    initials: "ER",
    avatarBg: "#14B8A6",
  },
  {
    quote:
      "The leave management system is flawless. Our entire team adopted it within a week with absolutely zero training required.",
    name: "Lisa Thompson",
    role: "People Ops Lead",
    company: "FutureWave",
    initials: "LT",
    avatarBg: "#6366F1",
  },
  {
    quote:
      "ROI was evident within the first quarter. Payroll errors dropped to zero and we reclaimed hours of admin time every single week.",
    name: "Marcus Reeves",
    role: "Founder",
    company: "BuildForward",
    initials: "MR",
    avatarBg: "#EF4444",
  },
  {
    quote:
      "Integration with our existing tools was seamless. The API is excellent and the support team consistently goes above and beyond.",
    name: "Aisha Patel",
    role: "HR Director",
    company: "Zento Group",
    initials: "AP",
    avatarBg: "#06B6D4",
  },
  {
    quote:
      "Approval workflows are now incredibly intuitive. What used to take days now happens in minutes — with full audit trails.",
    name: "Tom Bradley",
    role: "CFO",
    company: "CloudBase",
    initials: "TB",
    avatarBg: "#F97316",
  },
];

/* ─────────────────────────── sub-components ─────────────────── */
function Stars() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className="relative w-[300px] mr-5 shrink-0 flex flex-col rounded-2xl bg-white dark:bg-neutral-900/80 backdrop-blur-sm ring-1 ring-gray-200 dark:ring-neutral-800 hover:ring-blue-300 dark:hover:ring-blue-500/40 px-6 py-6 
    overflow-hidden cursor-default transition-all duration-300 group shadow-lg"
    >
      {/* Large decorative quote in corner */}
      <span
        className="absolute -top-1 right-3 text-8xl font-black leading-none text-blue-500/[0.07] dark:text-blue-400/[0.1] select-none pointer-events-none"
        aria-hidden
      >
        &#8220;
      </span>

      {/* Inner hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/[0.02] dark:group-hover:bg-blue-500/[0.04] transition-colors duration-300" />

      {/* Stars */}
      <Stars />

      {/* Quote text */}
      <p className="flex-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-neutral-800 mb-4" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 ring-2 ring-white dark:ring-neutral-900"
          style={{ backgroundColor: t.avatarBg }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
            {t.name}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {t.role}, {t.company}
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = "42s",
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  duration?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }}
    >
      <div
        className="flex w-max"
        style={{
          animation: `${direction === "left" ? "tmLeft" : "tmRight"} ${duration} linear infinite`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "running";
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── header variants ────────────────── */
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

/* ─────────────────────────── main component ─────────────────── */
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-28 overflow-hidden"
    >
      {/* ── CSS keyframes injected inline ── */}
      <style>{`
        @keyframes tmLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tmRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* ──────── Section header ──────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-5"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
            Testimonials
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gradient">
            Trusted by Teams
            <br />
            <span className="text-blue-500">That Grow</span>
          </h2>

          <p className="mt-5 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg max-w-xl mx-auto">
            From startups to enterprises — teams across every industry rely on
            Growifyhrm to manage their most valuable asset.
          </p>
        </motion.div>
      </div>

      {/* ──────── Marquee rows (full-width, no padding container) ──────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-14 space-y-4"
      >
        <MarqueeRow items={ROW_ONE} direction="left" duration="44s" />
        {/* <MarqueeRow items={ROW_TWO} direction="right" duration="37s" /> */}
      </motion.div>
    </section>
  );
}
