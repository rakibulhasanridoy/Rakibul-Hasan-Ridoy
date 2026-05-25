"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"] as const;

const logoVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const navContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const navLinkVariant = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect which section is in view and highlight nav link
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase())).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(href, { offset: -80 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,15,0.97)" : "rgba(10,10,15,0.75)",
        borderBottom: scrolled ? "1px solid rgba(201,162,39,0.12)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.div variants={logoVariant}>
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="font-display text-xl font-bold tracking-tight cursor-pointer"
            style={{ color: "var(--color-primary)" }}
          >
            &lt;RR/&gt;
          </a>
        </motion.div>

        {/* Nav links */}
        <motion.div className="flex items-center gap-2" variants={navContainerVariant}>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
                className="nav-link text-sm tracking-widest uppercase font-medium transition-all duration-300 px-4 py-1.5 rounded-full"
                style={
                  isActive
                    ? {
                        background: "rgba(201,162,39,0.12)",
                        color: "var(--color-primary)",
                        border: "1px solid rgba(201,162,39,0.3)",
                        boxShadow: "0 0 10px rgba(201,162,39,0.15)",
                      }
                    : {
                        color: "var(--color-text)",
                        border: "1px solid transparent",
                      }
                }
                variants={navLinkVariant}
                whileHover={
                  isActive ? {} : { color: "var(--color-primary)", background: "rgba(201,162,39,0.06)" }
                }
              >
                {link}
              </motion.a>
            );
          })}

          {/* CTA button */}
          <motion.a
            href="mailto:rakibulhasanridoy1@gmail.com"
            className="ml-3 px-5 py-2 rounded-full text-sm font-semibold tracking-wider uppercase hidden md:block"
            style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
            variants={navLinkVariant}
            whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(201,162,39,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Hire Me
          </motion.a>
        </motion.div>
      </div>
    </motion.nav>
  );
}
