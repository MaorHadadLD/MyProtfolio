"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/MaorHadadLD",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maor-hadad-software-engineer",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const errors = {
    name: touched.name && !name.trim() ? "Name is required." : "",
    email: touched.email && !email.trim() ? "Email is required." : touched.email && !emailValid ? "Enter a valid email." : "",
    message: touched.message && !message.trim() ? "Message is required." : "",
  };
  const isValid = name.trim() && email.trim() && emailValid && message.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setFormState("error");
      } else {
        setFormState("success");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setFormState("error");
    }
  }

  const inputBase =
    "w-full bg-surface border rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 font-mono";
  const inputIdle = "border-white/5 hover:border-white/10 focus:border-neon-cyan/50 focus:shadow-[0_0_0_2px_rgba(0,245,255,0.08)]";
  const inputError = "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.08)]";

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
              04 / Contact
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/30 to-transparent" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
            Let&apos;s build{" "}
            <span className="text-neon-cyan glow-cyan">something real.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Open to junior roles, freelance projects, and interesting collaborations.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="card-glass gradient-border rounded-2xl p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="py-12 flex flex-col items-center gap-4 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-neon-cyan/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium text-lg">Message sent successfully.</p>
                    <p className="text-slate-500 text-sm mt-1">I&apos;ll get back to you soon.</p>
                  </div>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setName("");
                      setEmail("");
                      setMessage("");
                      setTouched({ name: false, email: false, message: false });
                    }}
                    className="mt-2 text-xs font-mono text-neon-cyan/60 hover:text-neon-cyan transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-500 tracking-wider uppercase">
                      Name <span className="text-neon-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      placeholder="Your name"
                      disabled={formState === "loading"}
                      className={`${inputBase} ${errors.name ? inputError : inputIdle}`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 font-mono"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-500 tracking-wider uppercase">
                      Email <span className="text-neon-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      placeholder="you@example.com"
                      disabled={formState === "loading"}
                      className={`${inputBase} ${errors.email ? inputError : inputIdle}`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 font-mono"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-500 tracking-wider uppercase">
                      Message <span className="text-neon-cyan">*</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                      placeholder="Tell me about your project..."
                      rows={5}
                      disabled={formState === "loading"}
                      className={`${inputBase} resize-none ${errors.message ? inputError : inputIdle}`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 font-mono"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* API error */}
                  <AnimatePresence>
                    {formState === "error" && errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/8 border border-red-500/20 text-red-400 text-sm font-mono"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === "loading"}
                    whileHover={formState !== "loading" ? { scale: 1.02 } : {}}
                    whileTap={formState !== "loading" ? { scale: 0.98 } : {}}
                    className="relative mt-1 w-full py-3.5 rounded-lg font-mono text-sm font-medium tracking-wider uppercase overflow-hidden
                      bg-neon-cyan text-background
                      shadow-neon-sm
                      hover:shadow-neon-cyan
                      transition-all duration-300
                      disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${formState === "loading" ? "opacity-0" : "opacity-100"}`}>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    {formState === "loading" && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-neon-cyan transition-colors duration-200"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
            <span className="text-slate-700">·</span>
            <a
              href="mailto:maorhadad94@gmail.com"
              className="text-xs font-mono text-slate-600 hover:text-neon-cyan transition-colors duration-200"
            >
              maorhadad94@gmail.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
