"use client";

import LivePulseIcon from "@/components/ui/LivePluseIcon";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef } from "react";

// Degrees per second — matches the original 250 s CSS cycle
const DEG_PER_SEC = 360 / 250;

const Hero = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null); // null = "anchor on next frame"
  const zRef = useRef(0); // Z angle drives the whole rotation

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const animate = (ts: number) => {
      // First frame after a (re)start: anchor timestamp, produce zero delta
      if (lastTsRef.current === null) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const delta = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      zRef.current += DEG_PER_SEC * delta;
      const z = zRef.current;
      const rad = (z * Math.PI) / 180;

      // Gentle oscillation on X / Y tied to the Z rotation — mirrors the
      // original keyframe wobble without any discrete jumps
      const x = 10 * Math.sin(rad);
      const y = 15 * Math.sin(rad + Math.PI / 6);

      el.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      lastTsRef.current = null; // ← prevents catch-up spin on tab resume
      rafRef.current = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden px-6 py-15 md:py-25 lg:py-35 mt-20"
    >
      {/* Background Animated Graphic */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pb-20">
        <div className="perspective:distance">
          <Image
            src="/animation/anime 1.svg"
            alt="Background animation"
            ref={imgRef}
            width={900}
            height={900}
            className="w-[120%] sm:w-125 md:w-150 xl:w-200 opacity-8 dark:opacity-5"
            style={{ willChange: "transform", transformStyle: "preserve-3d" }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="md:max-w-4xl text-center flex flex-col items-center gap-6">
        {/* Announcement Badge */}
        <div className="flex items-center gap-2 px-4 py-1 text-xs md:text-sm rounded-full border border-gray-200 bg-white shadow-xs dark:border-neutral-700 dark:bg-neutral-900/50 backdrop-blur">
          <LivePulseIcon />

          <p>New: AI-Powered Payroll Automation</p>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gradient">
          Simplified HR & Payroll Management <br />
          Powered by AI
        </h1>

        {/* Subtitle */}
        <p className="md:max-w-2xl text-neutral-600 dark:text-neutral-300 text-sm md:text-lg sm:text-xl">
          Manage employees, automate payroll, track attendance, and stay
          compliant — all in one intelligent HR platform built for growing
          companies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Primary CTA */}
          <Link
            href="#"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium 
            hover:bg-blue-500 transition-all duration-300 animate-glow"
          >
            Start Free Trial
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#"
            className="px-6 py-3 rounded-lg border border-neutral-700 
            hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
          >
            View Live Demo
          </Link>
        </div>

        {/* Trust line */}
        <p className="text-xs md:text-sm text-neutral-500 mt-2 hover:text-neutral-400 transition">
          No credit card required · Free trial · Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default Hero;
