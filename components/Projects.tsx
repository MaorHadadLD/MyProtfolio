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
      "Professional homepage for a woodworking business. Clean, conversion-focused design.",
    tags: ["Next.js", "Tailwind CSS", "React"],
    link: "https://garberwoodworks.com",
    accent: "#a855f7",
    icon: "🪵",
    highlights: ["Business landing page", "Portfolio gallery", "Responsive design"],
  },
  {
    id: 3,
    name: "Nexus Terminal",
    shortName: "NT",
    description:
      "Interactive terminal-based game experience. A cyber-style interface where users navigate commands and explore a simulated system.",
    tags: ["Next.js", "Game UI", "Interactive", "Terminal"],
    link: "https://nexus-terminal-two.vercel.app",
    accent: "#22c55e",
    icon: "🧠",
    highlights: [
      "Interactive terminal UI",
      "Command-based gameplay",
      "Cyberpunk experience",
    ],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleClick = (project: any) => {
    if (project.video) {
      setSelectedVideo(project.video);
    } else if (project.link) {
      window.open(project.link, "_blank");
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;

    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
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

        {/* 🔥 Slider */}
        <div className="relative">

          {/* Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur px-3 py-2 rounded-full text-white hover:bg-black/70"
          >
            ←
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur px-3 py-2 rounded-full text-white hover:bg-black/70"
          >
            →
          </button>

          <motion.div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing px-10"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => handleClick(project)}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.08, y: -10 }}
                className="snap-center min-w-[320px] md:min-w-[420px] max-w-[420px] group card-glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  borderColor: `${project.accent}15`,
                  filter: "brightness(0.9)",
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
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{project.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">
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

                  <p className="text-slate-400 text-sm mb-5">
                    {project.description}
                  </p>

                  {project.video && (
                    <div className="text-xs text-neon-cyan mb-3">
                      ▶ Watch Demo
                    </div>
                  )}

                  {!project.video && project.link && (
                    <div className="text-xs text-green-400 mb-3">
                      ▶ Live Project
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 mb-5">
                    {project.highlights.map((h) => (
                      <div key={h} className="text-xs text-slate-500">
                        ▸ {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-white/10 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white text-2xl"
                onClick={() => setSelectedVideo(null)}
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