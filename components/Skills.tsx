"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Languages",
    icon: "{ }",
    color: "#00f5ff",
    skills: ["JavaScript", "Java", "Python", "C", "C++"],
  },
  {
    category: "Frameworks",
    icon: "◈",
    color: "#a855f7",
    skills: ["React", "Next.js", "Flutter"],
  },
  {
    category: "Tools",
    icon: "⚙",
    color: "#3b82f6",
    skills: ["Git", "Docker", "Linux"],
  },
];

function SkillBadge({
  skill,
  color,
  index,
  isInView,
}: {
  skill: string;
  color: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium cursor-default transition-all duration-200"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}25`,
        color: color,
      }}
    >
      {skill}
    </motion.span>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
              02 / Skills
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/30 to-transparent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            What I{" "}
            <span className="text-neon-cyan glow-cyan">work with</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: groupIndex * 0.15 }}
              whileHover={{ y: -4 }}
              className="card-glass gradient-border rounded-2xl p-6 transition-all duration-300 hover:shadow-neon-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xl font-mono"
                  style={{ color: group.color }}
                >
                  {group.icon}
                </span>
                <h3 className="text-lg font-semibold text-slate-200">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    color={group.color}
                    index={groupIndex * 5 + skillIndex}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center text-slate-600 text-sm font-mono"
        >
          // always learning more...
        </motion.p>
      </div>
    </section>
  );
}
