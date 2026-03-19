"use client";

import { motion } from "framer-motion";
import { Compare } from "@/components/ui/compare";

export default function Showcase() {
  return (
    <section className="relative py-5 pb-15 lg:py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          <span className="text-3xl lg:text-4xl font-bold">
            <span className="text-blue-400">Chaos</span> to{" "}
            <span className="text-blue-400">Clarity</span>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Transform messy workflows into a streamlined, productive system with
          powerful automation and team collaboration.
        </motion.p>

        {/* Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mt-12"
        >
          {/* Outer Glow Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 via-blue-400/20 to-blue-500/40 blur-2xl opacity-60" />

          {/* Glass Frame */}
          <div className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-3 md:p-5 shadow-xl">
            {/* Top Bar (like app window) */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden">
              <Compare
                firstImage="/chaos.jpg"
                secondImage="/clarity.jpg"
                firstImageClassName="object-cover"
                secondImageClassname="object-cover"
                className="w-full h-[280px] sm:h-[300px] md:h-[500px] lg:h-[600px]"
                slideMode="drag"
              />

              {/* Keep your overlay for consistency */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating Elements (Tech vibe) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block absolute -top-6 -left-6 bg-white dark:bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-xs text-gray-700 dark:text-gray-300 shadow"
          >
            ⚡ Smart Automation
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block absolute -bottom-6 -right-6 bg-white dark:bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-xs text-gray-700 dark:text-gray-300 shadow"
          >
            📊 Real-time Insights
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
