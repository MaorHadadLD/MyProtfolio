"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    name: "Smart Hotel System",
    shortName: "SHS",
    description:
      "A comprehensive smart hotel management platform. Guests can control room features, request services, and check in/out digitally. Staff manages operations from a real-time dashboard.",
    tags: ["React Native", "Node.js", "Firebase", "IoT"],
    video:
      "https://drive.google.com/file/d/1m3FItDY1wmsESxfWclD3FtX1xWFvgfMu/preview",
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
    link: "https://garberwoodworks.com",
    accent: "#a855f7",
    icon: "🪵",
    highlights: ["Business landing page", "Portfolio gallery", "Responsive design"],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleClick = (project: any) => {
    if (project.video) {
      setSelectedVideo(project.video);
    } else if (project.link) {
      window.open(project.link, "_blank");
    }
  };

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
              onClick={() => handleClick(project)}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group card-glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
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
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Demo label */}
                {project.video && (
                  <div className="text-xs text-neon-cyan mb-4">
                    ▶ Watch Full Demo
                  </div>
                )}

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

        {/* GitHub link נשאר */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/MaorHadadLD"
            target="_blank"
            className="text-sm text-slate-500 hover:text-neon-cyan transition"
          >
            More on GitHub →
          </a>
        </div>
      </div>

      {/* 🎬 VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative w-[90%] max-w-5xl"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white text-2xl"
              >
                ✕
              </button>

              <iframe
                src={selectedVideo}
                className="w-full h-[500px] rounded-xl"
                allow="autoplay"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}