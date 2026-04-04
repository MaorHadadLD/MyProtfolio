"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial gradient fade */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" />
    </div>
  );
}

// Floating orbs
function Orbs() {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 rounded-full opacity-8 sm:opacity-10 blur-3xl bg-neon-cyan pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-40 sm:w-80 h-40 sm:h-80 rounded-full opacity-5 sm:opacity-8 blur-3xl bg-neon-purple pointer-events-none" />
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GridBackground />
      <Orbs />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 pt-24 lg:pt-20">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-shrink-0 flex items-center justify-center"
        >
          {/* Sizing wrapper */}
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72">

            {/* Subtle edge glow — tight to the circle, low opacity */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(0,245,255,0.18), 0 0 14px rgba(0,245,255,0.12), 0 4px 24px rgba(0,0,0,0.5)",
              }}
            />

            {/* Thin gradient border ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,245,255,0.55) 0%, rgba(59,130,246,0.3) 40%, rgba(168,85,247,0.15) 70%, transparent 100%)",
                padding: "1.5px",
                borderRadius: "50%",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Photo — hover scale */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 rounded-full overflow-hidden bg-surface-2 cursor-default"
            >
              <Image
                src="/profile.jpg"
                alt="Maor Hadad"
                fill
                className="object-cover"
                style={{ objectPosition: "center 35%" }}
                priority
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 224px, 288px"
              />
            </motion.div>

            {/* Available dot — sits on bottom-right edge of circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.35, type: "spring", stiffness: 200 }}
              className="absolute bottom-[10%] right-[10%] z-10"
            >
              <div className="relative flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40 animate-ping" />
                <span className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 border-[1.5px] border-background" />
              </div>
            </motion.div>
          </div>

          {/* Available for hire label */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-slate-500 tracking-wide"
          >
            available for hire
          </motion.p>
        </motion.div>

        {/* Text content */}
        <div className="text-center lg:text-left w-full lg:w-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono text-neon-cyan text-sm tracking-[0.3em] uppercase mb-3">
              Software Engineer
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-2"
          >
            Maor
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-neon-cyan glow-cyan"
          >
            Hadad
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
              I don&apos;t just build features.
              <br />
              <span className="text-slate-200 font-medium">
                I build systems that make sense.
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="group relative px-6 py-3.5 sm:py-3 rounded-lg font-medium text-sm overflow-hidden transition-all duration-300 touch-manipulation"
              style={{
                background: "rgba(0,245,255,0.08)",
                border: "1px solid rgba(0,245,255,0.3)",
                color: "#00f5ff",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 sm:py-3 rounded-lg font-medium text-sm text-slate-400 hover:text-slate-200 active:text-slate-200 transition-colors duration-200 border border-white/10 hover:border-white/20 touch-manipulation"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
      >
        <span className="text-xs text-slate-600 font-mono tracking-widest uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-neon-cyan/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
