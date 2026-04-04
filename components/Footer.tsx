"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} Maor Hadad
        </span>
        <span className="font-mono text-xs text-slate-700">
          built with Next.js + Tailwind + Framer Motion
        </span>
        <a
          href="#hero"
          className="font-mono text-xs text-slate-600 hover:text-neon-cyan transition-colors duration-200"
        >
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
