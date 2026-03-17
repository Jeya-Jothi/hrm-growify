"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const navItems = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      {/* Nav Container */}
      <div
        className="mt-4 w-[95%] max-w-7xl flex items-center justify-between px-6 py-3 
      dark:bg-white/5 backdrop-blur-xl border border-gray-200/80 shadow-sm dark:shadow-none dark:border-white/10 rounded-full"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-500 to-cyan-300" />
          <span className="font-semibold text-lg">
            Growify<span className="text-blue-500">HRM</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-8 text-sm ">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              {item.name}
            </Link>
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

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 w-[90%] bg-black border border-white/10 rounded-2xl p-6 md:hidden backdrop-blur-xl">
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

            <div className="flex flex-col items-start gap-4 pt-4 border-t border-white/10">
              <button>Sign in</button>

              <button className="flex items-center gap-1">
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
