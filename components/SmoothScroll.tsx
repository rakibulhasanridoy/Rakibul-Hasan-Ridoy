"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Extend window type for global lenis access
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis with v1.3.x compatible settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      syncTouch: false,
    });

    // Expose globally so other components (e.g., Navigation) can call lenis.scrollTo()
    window.__lenis = lenis;

    // ── Critical: Sync Lenis scroll events with GSAP ScrollTrigger ──
    // Without this, ScrollTrigger uses native scroll events, which
    // won't match Lenis' virtualised scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP's ticker instead of requestAnimationFrame
    // This keeps everything on one animation loop for perfect sync
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Prevent GSAP from auto-smoothing lag (Lenis handles this)
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
