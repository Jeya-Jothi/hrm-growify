"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // cleanup (important when component unmounts)
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      {/* Nav Container */}
      <div
        className="mt-4 w-full md:max-w-7xl mx-4 flex items-center justify-between px-6 py-3 
      dark:bg-white/5 backdrop-blur-xl border border-gray-200/80 shadow-sm dark:shadow-none dark:border-white/10 rounded-full"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/hrm full logo.svg" alt="" className="w-24 lg:w-34" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-8 text-sm">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                const el = document.querySelector(item.href);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="cursor-pointer text-sm text-gray-900 dark:text-gray-300
           hover:text-white transition"
          >
            Sign in
          </button>

          <button
            className="flex items-center gap-1 cursor-pointer text-sm text-white
             bg-blue-500 p-2 rounded-2xl
            hover:bg-blue-600 transition"
          >
            <User size={16} />
            Create Account
          </button>

          <div>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className=" dark:text-white">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 w-[90%] dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:hidden backdrop-blur-xl">
          <nav className="flex flex-col gap-6 text-gray-900 dark:text-gray-300 text-base">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col items-start gap-4 pt-2 border-t border-gray-300 dark:border-white/10">
              <button>Sign in</button>

              <button
                className="flex items-center gap-1 cursor-pointer text-sm text-white
             bg-blue-500 p-2 rounded-2xl
            hover:bg-blue-600 transition"
              >
                <User size={16} />
                Create Account
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
