"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    name: "Smart Hotel System",
    shortName: "SHS",
    description:
      "A comprehensive smart hotel management platform. Guests can control room features, request services, and check in/out digitally.",
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
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleClick = (project: any) => {
    if (project.video) {
      setSelectedVideo(project.video);
    } else if (project.link) {
      window.open(project.link, "_blank");
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <h2 className="text-4xl font-bold mb-12">
          Things I&apos;ve built
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => handleClick(project)}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="cursor-pointer rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{project.icon}</span>
                <div>
                  <h3 className="font-bold">{project.name}</h3>
                  <span className="text-xs text-gray-400">
                    /{project.shortName}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4">
                {project.description}
              </p>

              <div className="text-xs text-gray-500 mb-4">
                {project.video && "▶ Watch Full Demo"}
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🎬 Modal עם אנימציה */}
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
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white text-2xl"
              >
                ✕
              </button>

              {/* Video */}
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