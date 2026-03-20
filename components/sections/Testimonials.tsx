"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

import Marquee from "react-fast-marquee";

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
      className="relative w-[280px] sm:w-[300px] min-w-[280px] sm:min-w-[300px] shrink-0 flex flex-col my-3
    rounded-2xl bg-white dark:bg-neutral-900/80 backdrop-blur-sm ring-1 ring-gray-200 dark:ring-neutral-800
     hover:ring-blue-300 dark:hover:ring-blue-500/40 px-5 sm:px-6 py-5 sm:py-6 overflow-hidden transition-all duration-300 group shadow-lg"
    >
      <span className="absolute -top-1 right-3 text-7xl sm:text-8xl font-black text-blue-500/[0.07] dark:text-blue-400/[0.1]">
        &#8220;
      </span>

      <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/[0.03] transition" />

      <Stars />

      <p className="flex-1 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 sm:mb-5">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="border-t border-gray-100 dark:border-neutral-800 mb-3 sm:mb-4" />

      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-white"
          style={{ backgroundColor: t.avatarBg }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
            {t.name}
          </p>
          <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
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
  speed = 40,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div
      className="md:py-2 mb-0 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <Marquee
        gradient={false}
        speed={speed}
        direction={direction}
        pauseOnHover
        pauseOnClick
        autoFill
      >
        {/* ✅ IMPORTANT FIX */}
        <div className="flex gap-4 sm:gap-5 px-2">
          {items.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </Marquee>
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
      className="relative py-10 lg:py-15 xl:py-20 overflow-hidden"
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
      <div className="md:max-w-7xl mx-auto px-6 lg:px-16">
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

          <p className="mt-5 text-neutral-500 dark:text-neutral-400 text-sm lg:text-lg max-w-xl mx-auto">
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
        className="mt-5 md:mt-14 space-y-4"
      >
        <MarqueeRow items={ROW_ONE} speed={38} />
        <MarqueeRow items={ROW_TWO} direction="right" speed={32} />
      </motion.div>
    </section>
  );
}
