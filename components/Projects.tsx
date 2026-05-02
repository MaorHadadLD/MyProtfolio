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
    description: "Full hotel system (guest + staff).",
    video:
      "https://drive.google.com/file/d/1m3FItDY1wmsESxfWclD3FtX1xWFvgfMu/preview",
    accent: "#00f5ff",
    thumbnail: "/shs-preview.jpg",
  },
  {
    id: 2,
    name: "Garber Woodworks",
    link: "https://garberwoodworks.com",
    accent: "#a855f7",
  },
  {
    id: 3,
    name: "Nexus Terminal",
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

  // 🎮 keyboard
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
    <section className="py-32 relative overflow-hidden">
      
      {/* 🌌 Parallax background */}
      <div className="absolute inset-0 opacity-10 blur-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 animate-pulse" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <h2 className="text-5xl font-bold mb-16">
          Things I’ve built
        </h2>

        <div className="relative">

          {/* arrows */}
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 z-20">←</button>
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 z-20">→</button>

          <div
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
            onScroll={(e) => {
              const c = e.currentTarget;
              const center = c.scrollLeft + c.offsetWidth / 2;

              let closest = 0;
              let dist = Infinity;

              Array.from(c.children).forEach((child: any, i) => {
                const childCenter = child.offsetLeft + child.offsetWidth / 2;
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
                  scale: activeIndex === i ? 1.1 : 0.85,
                  opacity: activeIndex === i ? 1 : 0.3,
                }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="snap-center min-w-[340px] p-6 rounded-2xl cursor-pointer"
                style={{
                  border: `1px solid ${p.accent}`,
                  boxShadow:
                    activeIndex === i
                      ? `0 0 60px ${p.accent}`
                      : "none",
                }}
              >
                {/* 🎥 thumbnail */}
                {p.thumbnail && (
                  <div className="relative mb-4">
                    <img
                      src={p.thumbnail}
                      className="rounded-xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-3xl">
                      ▶
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-sm text-gray-400 mt-2">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎬 cinematic modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center backdrop-blur-xl z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.6, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.6, y: 100 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative w-[90%] max-w-6xl"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white text-3xl"
              >
                ✕
              </button>

              <iframe
                src={selectedVideo}
                className="w-full h-[600px] rounded-xl"
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