"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    id: 1,
    name: "Smart Hotel System",
    description:
      "Full hotel system for guests & staff with real-time control.",
    video:
      "https://drive.google.com/file/d/1m3FItDY1wmsESxfWclD3FtX1xWFvgfMu/preview",
    accent: "#00f5ff",
    thumbnail: "/shs-preview.jpg",
  },
  {
    id: 2,
    name: "Garber Woodworks",
    description: "Professional business website.",
    link: "https://garberwoodworks.com",
    accent: "#a855f7",
  },
  {
    id: 3,
    name: "Nexus Terminal",
    description: "Interactive cyber terminal game.",
    link: "https://nexus-terminal-two.vercel.app",
    accent: "#22c55e",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: true });

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // keyboard navigation
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scroll("right");
      if (e.key === "ArrowLeft") scroll("left");
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -w : w,
      behavior: "smooth",
    });
  };

  const handleClick = (p: any) => {
    if (p.video) setSelectedVideo(p.video);
    else if (p.link) window.open(p.link, "_blank");
  };

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <h2 className="text-4xl lg:text-5xl font-bold mb-12">
          Things I’ve <span className="text-cyan-400">built</span>
        </h2>

        <div className="relative">

          {/* arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white"
          >
            ←
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white"
          >
            →
          </button>

          {/* slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={(e) => {
              const c = e.currentTarget;
              const center = c.scrollLeft + c.offsetWidth / 2;

              let closest = 0;
              let dist = Infinity;

              Array.from(c.children).forEach((child: any, i) => {
                const childCenter =
                  child.offsetLeft + child.offsetWidth / 2;
                const d = Math.abs(center - childCenter);
                if (d < dist) {
                  dist = d;
                  closest = i;
                }
              });

              setActiveIndex(closest);
            }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                onClick={() => handleClick(p)}
                animate={{
                  scale: activeIndex === i ? 1.05 : 0.95,
                  opacity: activeIndex === i ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
                className="snap-center min-w-[320px] md:min-w-[400px] bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer backdrop-blur-sm"
                style={{
                  boxShadow:
                    activeIndex === i
                      ? `0 0 20px ${p.accent}40`
                      : "none",
                }}
              >
                {/* thumbnail */}
                {p.thumbnail && (
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img
                      src={p.thumbnail}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-2xl">
                      ▶
                    </div>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-white">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* video modal */}
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
              className="w-[90%] max-w-5xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
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