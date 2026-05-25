"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    label: "Email",
    value: "rakibulhasanridoy1@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           style={{ color: "var(--color-primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           style={{ color: "var(--color-primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Availability",
    value: "Open to Opportunities",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           style={{ color: "var(--color-primary)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// ── Fancy input field ─────────────────────────────────────────────────────────
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Field({ label, id, ...rest }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm mb-2 font-medium transition-colors duration-200"
        style={{ color: focused ? "var(--color-primary)" : "var(--color-text)" }}
      >
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
        style={{
          background: "rgba(10,10,15,0.7)",
          border: focused
            ? "1px solid rgba(201,162,39,0.7)"
            : "1px solid rgba(201,162,39,0.2)",
          color: "var(--color-text)",
          boxShadow: focused ? "0 0 0 3px rgba(201,162,39,0.1)" : "none",
        }}
        onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
        onBlur={(e)  => { setFocused(false); rest.onBlur?.(e);  }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children ?? [], {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });

      gsap.from(formRef.current, {
        opacity: 0, y: 50, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 82%", once: true },
      });

      gsap.from(infoRef.current?.children ?? [], {
        opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: infoRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowToast(true);
    e.currentTarget.reset();
    setTimeout(() => setShowToast(false), 3200);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-6 z-10 overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Ambient blobs */}
      <div className="section-blob-left" />
      <div className="section-blob-right" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(201,162,39,0.1)",
              border: "1px solid rgba(201,162,39,0.25)",
              color: "var(--color-primary)",
            }}
          >
            Get In Touch
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Let&apos;s Work Together
          </h2>
          <div className="gold-line w-16 mx-auto mb-5" />
          <p style={{ color: "var(--color-text)", opacity: 0.75 }}>
            Have a project in mind? I&apos;d love to hear about it. Send me a message and
            let&apos;s create something amazing.
          </p>
        </div>

        {/* Form */}
        <div ref={formRef}>
          <div
            className="p-8 rounded-2xl glass-card"
            style={{ border: "1px solid rgba(201,162,39,0.18)" }}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Your Name"  id="name"  name="name"  type="text"  required />
                <Field label="Your Email" id="email" name="email" type="email" required />
              </div>
              <Field label="Subject" id="subject" name="subject" type="text" required />

              {/* Textarea */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className="block text-sm mb-2 font-medium transition-colors duration-200"
                  style={{ color: textareaFocused ? "var(--color-primary)" : "var(--color-text)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 resize-none"
                  style={{
                    background: "rgba(10,10,15,0.7)",
                    border: textareaFocused
                      ? "1px solid rgba(201,162,39,0.7)"
                      : "1px solid rgba(201,162,39,0.2)",
                    color: "var(--color-text)",
                    boxShadow: textareaFocused ? "0 0 0 3px rgba(201,162,39,0.1)" : "none",
                  }}
                  onFocus={() => setTextareaFocused(true)}
                  onBlur={()  => setTextareaFocused(false)}
                />
              </div>

              <div className="text-center pt-2">
                <motion.button
                  type="submit"
                  className="px-10 py-4 rounded-full font-semibold tracking-widest uppercase text-sm glow"
                  style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
                  whileHover={{ scale: 1.06, boxShadow: "0 12px 36px rgba(201,162,39,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact info cards */}
        <div ref={infoRef} className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          {CONTACT_INFO.map(({ label, value, icon }) => (
            <motion.div
              key={label}
              className="p-5 rounded-2xl glass-card border-sweep"
              style={{ border: "1px solid rgba(201,162,39,0.15)" }}
              whileHover={{ scale: 1.04, borderColor: "rgba(201,162,39,0.4)" }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <div
                className="w-11 h-11 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,162,39,0.15)" }}
              >
                {icon}
              </div>
              <p className="text-xs uppercase tracking-widest mb-1"
                 style={{ color: "var(--color-text)", opacity: 0.5 }}>
                {label}
              </p>
              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
            style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            <span className="text-lg">✓</span>
            <p className="font-semibold">Message sent successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
