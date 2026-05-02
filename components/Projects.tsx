"use client";

import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    id: 1,
    name: "Smart Hotel System",
    shortName: "SHS",
    description:
      "Smart hotel system for guests & staff with real-time control.",
    tags: ["React Native", "Node.js", "Firebase"],
    video:
      "https://drive.google.com/file/d/1m3FItDY1wmsESxfWclD3FtX1xWFvgfMu/preview",
    accent: "#00f5ff",
    icon: "🏨",
    thumbnail: "/shs-preview.jpg",
  },
  {
    id: 2,
    name: "Garber Woodworks",
    shortName: "GW",
    description: "Professional business website.",
    link: "https://garberwoodworks.com",
    accent: "#a855f7",
    icon: "🪵",
  },
  {
    id: 3,
    name: "Nexus Terminal",
    shortName: "NT",
    description: "Interactive cyber terminal game.",
    link: "https://nexus-terminal-two.vercel.app",
    accent: "#22c55e",
    icon: "🧠",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: true });

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🎮 keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!scrollRef.current) return;

      if (e.key === "ArrowRight") scroll("right");
      if (e.key === "ArrowLeft") scroll("left");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;

    scrollRef.current.scrollTo({
      left:
        dir === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  const handleClick = (project: any) => {
    if (project.video) setSelectedVideo(project.video);
    else if (project.link) window.open(project.link, "_blank");
  };

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <h2 className="text-4xl font-bold mb-12">
          Things I've built
        </h2>

        <div className="relative">

          {/* Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10"
          >
            ←
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10"
          >
            →
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={(e) => {
              const container = e.currentTarget;
              const center =
                container.scrollLeft + container.offsetWidth / 2;

              const children = Array.from(container.children);

              let closest = 0;
              let closestDistance = Infinity;

              children.forEach((child: any, index) => {
                const childCenter =
                  child.offsetLeft + child.offsetWidth / 2;

                const distance = Math.abs(center - childCenter);

                if (distance < closestDistance) {
                  closestDistance = distance;
                  closest = index;
                }
              });

              setActiveIndex(closest);
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => handleClick(project)}
                animate={{
                  scale: activeIndex === index ? 1.08 : 0.9,
                  opacity: activeIndex === index ? 1 : 0.4,
                }}
                transition={{ duration: 0.4 }}
                className="snap-center min-w-[300px] p-6 rounded-xl cursor-pointer"
                style={{
                  border: "1px solid",
                  borderColor: project.accent,
                  boxShadow:
                    activeIndex === index
                      ? `0 0 40px ${project.accent}`
                      : "none",
                }}
              >
                {/* Thumbnail */}
                {project.video && (
                  <div className="relative mb-4">
                    <img
                      src={project.thumbnail}
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      ▶
                    </div>
                  </div>
                )}

                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎬 Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <iframe
                src={selectedVideo}
                className="w-[800px] h-[500px]"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}