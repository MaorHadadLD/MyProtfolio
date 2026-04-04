"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    name: "Smart Hotel System",
    shortName: "SHS",
    description:
      "A comprehensive smart hotel management platform. Guests can control room features, request services, and check in/out digitally. Staff manages operations from a real-time dashboard.",
    tags: ["React Native", "Node.js", "Firebase", "IoT"],
    github: "https://github.com/MaorHadadLD/SHS-SmartHotel",
    accent: "#00f5ff",
    icon: "🏨",
    highlights: ["Real-time dashboard", "Digital check-in/out", "IoT integration"],
  },
  {
    id: 2,
    name: "Garber Woodworks",
    shortName: "GW",
    description:
      "Professional homepage for a woodworking business. Clean, conversion-focused design showcasing craftsmanship with portfolio gallery and contact flow.",
    tags: ["Next.js", "Tailwind CSS", "React"],
    github: "https://github.com/garber-squared/garber-woodworks-homepage",
    accent: "#a855f7",
    icon: "🪵",
    highlights: ["Business landing page", "Portfolio gallery", "Responsive design"],
  },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7M17 7H7M17 7v10"
      />
    </svg>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl bg-neon-cyan pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
              03 / Projects
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/30 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Things I&apos;ve{" "}
            <span className="text-neon-cyan glow-cyan">built</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group card-glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                borderColor: `${project.accent}15`,
              }}
            >
              {/* Card top accent */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${project.accent}60, transparent)`,
                }}
              />

              <div className="p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{project.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                        {project.name}
                      </h3>
                      <span
                        className="text-xs font-mono"
                        style={{ color: project.accent }}
                      >
                        /{project.shortName.toLowerCase()}
                      </span>
                    </div>
                  </div>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="group flex items-center gap-1.5 text-xs font-medium px-3 py-2 sm:py-1.5 rounded-lg transition-all duration-200 touch-manipulation"
                    style={{
                      background: `${project.accent}10`,
                      border: `1px solid ${project.accent}25`,
                      color: project.accent,
                    }}
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                    <ArrowIcon />
                  </motion.a>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-col gap-1.5 mb-5">
                  {project.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-slate-500">
                      <span style={{ color: project.accent }}>▸</span>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md font-mono text-slate-500 border border-white/5 bg-white/3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/MaorHadadLD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-neon-cyan transition-colors duration-200 group"
          >
            <GitHubIcon />
            <span>More on GitHub</span>
            <ArrowIcon />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
