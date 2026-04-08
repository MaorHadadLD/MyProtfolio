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
    link: "https://garberwoodworks.com", // 🔥 האתר שלך
    accent: "#a855f7",
    icon: "🪵",
    highlights: ["Business landing page", "Portfolio gallery", "Responsive design"],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            Things I&apos;ve{" "}
            <span className="text-neon-cyan glow-cyan">built</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group card-glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 block"
              style={{
                borderColor: `${project.accent}15`,
              }}
            >
              {/* Accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${project.accent}60, transparent)`,
                }}
              />

              <div className="p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}