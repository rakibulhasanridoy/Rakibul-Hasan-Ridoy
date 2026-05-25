"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// ── Variants ────────────────────────────────────────────────────────────────
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineItem = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1, scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const iconItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Tech badges that orbit the profile photo ─────────────────────────────────
const ORBIT_BADGES = [
  { label: "React",      color: "#61DAFB", bg: "rgba(97,218,251,0.12)",  border: "rgba(97,218,251,0.35)",  pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { label: "Node.js",   color: "#68A063", bg: "rgba(104,160,99,0.12)",  border: "rgba(104,160,99,0.35)",  pos: "top-1/4 -right-4 md:right-0" },
  { label: "MongoDB",   color: "#4DB33D", bg: "rgba(77,179,61,0.12)",   border: "rgba(77,179,61,0.35)",   pos: "bottom-1/4 -right-4 md:right-0" },
  { label: "Express",   color: "#aaaaaa", bg: "rgba(170,170,170,0.10)", border: "rgba(170,170,170,0.3)",  pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
  { label: "Next.js",   color: "#ffffff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)",  pos: "bottom-1/4 -left-4 md:left-0" },
  { label: "TypeScript",color: "#3178C6", bg: "rgba(49,120,198,0.12)",  border: "rgba(49,120,198,0.35)",  pos: "top-1/4 -left-4 md:left-0" },
];

// ── Typewriter hook ──────────────────────────────────────────────────────────
const TITLES = ["MERN Stack Developer", "Full Stack Engineer", "React Specialist", "Node.js Developer"];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function Hero() {
  const typewritten = useTypewriter(TITLES);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(href, { offset: -80 });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 z-10">
      <motion.div
        className="max-w-5xl mx-auto w-full"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* ── Two-column layout ────────────────────────────────────────── */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* Left — text content */}
          <div className="flex-1 text-center md:text-left">

            {/* Greeting label */}
            <motion.div variants={heroItem}>
              <span
                className="inline-block text-xs tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-5 font-semibold"
                style={{
                  background: "rgba(201,162,39,0.12)",
                  border: "1px solid rgba(201,162,39,0.3)",
                  color: "var(--color-primary)",
                }}
              >
                👋 Hello, I am
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={heroItem}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              MD Rakibul<br />
              <span style={{ color: "var(--color-primary)" }}>Hasan Ridoy</span>
            </motion.h1>

            {/* Gold accent line */}
            <motion.div
              variants={lineItem}
              className="mb-5"
              style={{
                transformOrigin: "left center",
                height: "2px",
                width: "72px",
                background: "linear-gradient(90deg, var(--color-primary), transparent)",
                margin: "0 auto 20px",
              }}
            />

            {/* Typewriter title */}
            <motion.div variants={heroItem} className="mb-6">
              <p className="text-lg md:text-xl font-light" style={{ color: "var(--color-text)", opacity: 0.8 }}>
                <span style={{ color: "var(--color-secondary)", fontWeight: 600 }}>&lt;</span>
                <span
                  className="font-mono mx-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {typewritten}
                </span>
                <span
                  className="inline-block w-0.5 h-5 align-middle ml-0.5 animate-pulse"
                  style={{ background: "var(--color-primary)", opacity: 0.9 }}
                />
                <span style={{ color: "var(--color-secondary)", fontWeight: 600 }}>/&gt;</span>
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={heroItem}
              className="text-base md:text-lg mb-8 leading-relaxed"
              style={{ color: "var(--color-text)", opacity: 0.7 }}
            >
              Building scalable, high-performance web applications
              with <strong style={{ color: "var(--color-text)", opacity: 1 }}>MongoDB</strong>,{" "}
              <strong style={{ color: "var(--color-text)", opacity: 1 }}>Express</strong>,{" "}
              <strong style={{ color: "var(--color-text)", opacity: 1 }}>React</strong> &amp;{" "}
              <strong style={{ color: "var(--color-text)", opacity: 1 }}>Node.js</strong>.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={heroItem} className="flex justify-center md:justify-start gap-4 flex-wrap">
              <motion.a
                href="#projects"
                onClick={(e) => handleScroll(e, "#projects")}
                className="px-8 py-3 rounded-full font-semibold tracking-widest uppercase text-sm"
                style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
                whileHover={{ scale: 1.06, boxShadow: "0 8px 30px rgba(201,162,39,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                View Work
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="px-8 py-3 rounded-full font-semibold tracking-widest uppercase text-sm"
                style={{ border: "1px solid var(--color-primary)", color: "var(--color-primary)" }}
                whileHover={{
                  scale: 1.06,
                  background: "rgba(201,162,39,0.1)",
                  boxShadow: "0 8px 30px rgba(201,162,39,0.2)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social icon links */}
            <motion.div variants={heroItem} className="flex justify-center md:justify-start gap-3 mt-6">
              {[
                { label: "GitHub",   href: "https://github.com/rakibulhasanridoy",                        path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/rakibulhasanridoy/",              path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                { label: "Facebook", href: "https://www.facebook.com/rakibulhasan.ridoy.144",             path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              ].map(({ label, href, path }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.2)", color: "var(--color-text)" }}
                  whileHover={{ scale: 1.15, background: "rgba(201,162,39,0.18)", borderColor: "rgba(201,162,39,0.55)", color: "var(--color-primary)", boxShadow: "0 4px 16px rgba(201,162,39,0.22)" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — profile photo with orbit ring + badges */}
          <motion.div variants={iconItem} className="flex-shrink-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mt-16 md:mt-0 mb-10 md:mb-0">

              {/* Spinning orbit ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-28px",
                  border: "1.5px dashed rgba(201,162,39,0.25)",
                  animation: "spin-orbit 28s linear infinite",
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-14px",
                  border: "1px solid rgba(201,162,39,0.12)",
                  animation: "spin-orbit 18s linear infinite reverse",
                }}
              />

              {/* Tech badges orbiting */}
              <div className="absolute" style={{ inset: "-52px" }}>
                {ORBIT_BADGES.map(({ label, color, bg, border, pos }) => (
                  <div
                    key={label}
                    className={`absolute ${pos} px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap backdrop-blur-md shadow-lg`}
                    style={{
                      background: bg,
                      border: `1px solid ${border}`,
                      color,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Profile photo */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                  border: "2px solid var(--color-primary)",
                  boxShadow: "0 0 40px rgba(201,162,39,0.35)",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="https://i.ibb.co.com/N22QCb7K/Gemini-Generated-Image-1q3di91q3di91q3d.png"
                  alt="MD Rakibul Hasan Ridoy — MERN Stack Developer"
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-110"
                  priority
                  unoptimized
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "linear-gradient(135deg, rgba(201,162,39,0.1), transparent, rgba(124,106,154,0.1))" }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div variants={heroItem} className="mt-14 flex justify-center">
          <div
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: "2px solid var(--color-secondary)" }}
          >
            <motion.div
              className="w-1 h-3 rounded-full"
              style={{ background: "var(--color-primary)" }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* CSS for orbit ring spin */}
      <style>{`
        @keyframes spin-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}