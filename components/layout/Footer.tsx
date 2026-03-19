"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300); // show after scrolling down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t border-gray-200 dark:border-white/10 overflow-hidden">
      {/* Gradient Half Circle Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-full h-full lg:h-[50%] bg-linear-to-b from-blue-500/30 to-transparent blur-3xl rounded-full top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Growify<span className="text-blue-500">HRM</span>
              </h3>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              The intelligence layer for modern HR teams. Automate operations,
              engage employees, and focus on people—not paperwork.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[FaTwitter, FaGithub, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 group flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  <Icon
                    size={16}
                    className="group-hover:text-blue-300 transition"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:text-blue-500 cursor-pointer">Features</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Integrations
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Pricing</li>
              <li className="hover:text-blue-500 cursor-pointer">Changelog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:text-blue-500 cursor-pointer">About</li>
              <li className="hover:text-blue-500 cursor-pointer">Careers</li>
              <li className="hover:text-blue-500 cursor-pointer">Blog</li>
              <li className="hover:text-blue-500 cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:text-blue-500 cursor-pointer">Privacy</li>
              <li className="hover:text-blue-500 cursor-pointer">Terms</li>
              <li className="hover:text-blue-500 cursor-pointer">Security</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Cookie Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 Growifyhrm Inc. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-blue-500 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-blue-500 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </motion.div>
      {showTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full 
    bg-blue-500 text-white flex items-center justify-center 
    shadow-lg hover:bg-blue-600 transition"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </footer>
  );
}
