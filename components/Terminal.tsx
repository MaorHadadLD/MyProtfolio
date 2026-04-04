"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  whoami     — who is Maor",
    "  skills     — list tech stack",
    "  projects   — list projects",
    "  contact    — get contact info",
    "  clear      — clear terminal",
    "  exit       — close terminal",
  ],
  whoami: [
    "Maor Hadad",
    "Junior Fullstack Software Engineer",
    "Focus: building systems that make sense.",
    "Status: available for hire",
  ],
  skills: [
    "Languages:  JavaScript, Java, Python, C, C++",
    "Frameworks: React, Next.js, Flutter",
    "Tools:      Git, Docker, Linux",
  ],
  projects: [
    "1. Smart Hotel System (SHS)",
    "   → https://github.com/MaorHadadLD/SHS-SmartHotel",
    "",
    "2. Garber Woodworks Homepage",
    "   → https://github.com/garber-squared/garber-woodworks-homepage",
  ],
  contact: [
    "GitHub:   https://github.com/MaorHadadLD",
    "LinkedIn: linkedin.com/in/maor-hadad-software-engineer",
    "Email:    maorhadad94@gmail.com",
  ],
};

type Line = { type: "input" | "output" | "error"; text: string };

const INITIAL_LINES: Line[] = [
  { type: "output", text: "Welcome to maor.dev terminal v1.0" },
  { type: "output", text: 'Type "help" to see available commands.' },
  { type: "output", text: "" },
];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: Line[] = [...lines, { type: "input", text: `$ ${cmd}` }];

      if (trimmed === "") {
        setLines([...newLines, { type: "output", text: "" }]);
        return;
      }

      if (trimmed === "clear") {
        setLines(INITIAL_LINES);
        return;
      }

      if (trimmed === "exit") {
        setOpen(false);
        return;
      }

      const result = COMMANDS[trimmed];
      if (result) {
        const outputs = Array.isArray(result) ? result : [result];
        setLines([
          ...newLines,
          ...outputs.map((t) => ({ type: "output" as const, text: t })),
          { type: "output", text: "" },
        ]);
      } else {
        setLines([
          ...newLines,
          {
            type: "error",
            text: `command not found: ${trimmed}. Type "help" for available commands.`,
          },
          { type: "output", text: "" },
        ]);
      }

      setHistory((h) => [cmd, ...h].slice(0, 50));
      setHistoryIdx(-1);
    },
    [lines]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 font-mono text-xs px-4 py-3 sm:py-2.5 rounded-lg transition-all duration-200 group touch-manipulation"
        style={{
          background: "rgba(0,245,255,0.06)",
          border: "1px solid rgba(0,245,255,0.2)",
          color: "rgba(0,245,255,0.7)",
          boxShadow: "0 0 20px rgba(0,245,255,0.05)",
        }}
        title="Open terminal easter egg"
      >
        <span className="text-neon-cyan animate-pulse">▮</span>
        <span className="group-hover:text-neon-cyan transition-colors">terminal</span>
      </motion.button>

      {/* Terminal modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:w-[640px] sm:h-[400px] z-50 rounded-xl overflow-hidden flex flex-col"
              style={{
                background: "#0d0d1a",
                border: "1px solid rgba(0,245,255,0.15)",
                boxShadow:
                  "0 0 0 1px rgba(0,245,255,0.05), 0 25px 50px rgba(0,0,0,0.6)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b shrink-0"
                style={{ borderColor: "rgba(0,245,255,0.08)", background: "#0a0a14" }}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                />
                <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-auto font-mono text-xs text-slate-600">
                  maor@portfolio:~
                </span>
              </div>

              {/* Output */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-0.5 text-slate-300">
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      line.type === "input"
                        ? "text-neon-cyan"
                        : line.type === "error"
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}
                  >
                    {line.text || "\u00A0"}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-t shrink-0"
                style={{ borderColor: "rgba(0,245,255,0.08)" }}
                onClick={() => inputRef.current?.focus()}
              >
                <span className="font-mono text-sm text-neon-cyan">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent font-mono text-sm text-slate-200 outline-none caret-neon-cyan placeholder-slate-700"
                  placeholder="type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
