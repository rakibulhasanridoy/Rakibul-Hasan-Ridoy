"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBg() {
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        backgroundPosition: "20% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPosition: "120px 120px",
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 3,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Gradient blobs — parallax */}
      <div
        ref={bgRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(124,106,154,0.18) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 100%, rgba(201,162,39,0.12) 0%, transparent 50%), " +
            "#0a0a0f",
        }}
      />

      {/* Subtle grid */}
      <div
        ref={gridRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,39,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(201,162,39,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="particle-dot"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${10 + Math.random() * 16}s`,
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              opacity: 0.15 + Math.random() * 0.25,
            }}
          />
        ))}
      </div>
    </>
  );
}
