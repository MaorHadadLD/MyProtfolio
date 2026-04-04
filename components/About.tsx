"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/30 to-transparent" />
    </div>
  );
}

const stats = [
  { value: "2+", label: "Years coding" },
  { value: "5+", label: "Projects shipped" },
  { value: "Full", label: "Stack" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl bg-neon-purple pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionLabel>01 / About</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Who I{" "}
              <span className="text-neon-cyan glow-cyan">am</span>
            </h2>

            <div className="space-y-4 text-slate-400 text-base lg:text-lg leading-relaxed">
              <p>
                I&apos;m{" "}
                <span className="text-slate-200 font-medium">Maor Hadad</span>,
                a Junior Fullstack Software Engineer.
              </p>
              <p>
                I enjoy understanding how systems really work —
                from low-level logic to modern web applications.
              </p>
              <p>
                My approach is simple:{" "}
                <span className="text-slate-200 font-medium">
                  build things that are clean, efficient, and actually solve
                  problems.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right: Stats + decorative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="card-glass gradient-border rounded-xl p-5 text-center"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-neon-cyan glow-cyan mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Code snippet decoration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card-glass gradient-border rounded-xl p-5 font-mono text-xs sm:text-sm overflow-x-auto"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-slate-600 text-xs">maor.ts</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <div>
                  <span className="text-neon-purple">const</span>{" "}
                  <span className="text-neon-cyan">engineer</span>{" "}
                  <span className="text-slate-500">= {"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">focus</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-green-400">&quot;fullstack&quot;</span>
                  <span className="text-slate-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">approach</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-green-400">&quot;systems thinking&quot;</span>
                  <span className="text-slate-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">goal</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-green-400">&quot;code that makes sense&quot;</span>
                </div>
                <div>
                  <span className="text-slate-500">{"}"}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
