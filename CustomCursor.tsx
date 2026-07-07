"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  
  // Coordinates refs for lerping
  const mouseRef = useRef({ x: -100, y: -100 });
  const dotRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const spotlightRef = useRef({ x: -100, y: -100 });

  const dotElRef = useRef<HTMLDivElement>(null);
  const ringElRef = useRef<HTMLDivElement>(null);
  const spotlightElRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Instantly position elements if they were offscreen
      if (!visible) {
        dotRef.current = { x: e.clientX, y: e.clientY };
        ringRef.current = { x: e.clientX, y: e.clientY };
        spotlightRef.current = { x: e.clientX, y: e.clientY };
      }
      
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop (lerp)
    let animationFrameId: number;

    const render = () => {
      // Lerp formula: current = current + (target - current) * factor
      const dotFactor = 0.25;
      const ringFactor = 0.08;
      const spotlightFactor = 0.05;

      dotRef.current.x += (mouseRef.current.x - dotRef.current.x) * dotFactor;
      dotRef.current.y += (mouseRef.current.y - dotRef.current.y) * dotFactor;

      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * ringFactor;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * ringFactor;

      spotlightRef.current.x += (mouseRef.current.x - spotlightRef.current.x) * spotlightFactor;
      spotlightRef.current.y += (mouseRef.current.y - spotlightRef.current.y) * spotlightFactor;

      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${dotRef.current.x - 3}px, ${dotRef.current.y - 3}px, 0) scale(${hovered ? 0.5 : 1})`;
      }

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringRef.current.x - 16}px, ${ringRef.current.y - 16}px, 0) scale(${hovered ? 1.8 : 1})`;
        if (hovered) {
          ringElRef.current.style.backgroundColor = "rgba(217, 4, 41, 0.1)";
          ringElRef.current.style.borderColor = "#D90429";
        } else {
          ringElRef.current.style.backgroundColor = "transparent";
          ringElRef.current.style.borderColor = "#D90429";
        }
      }

      if (spotlightElRef.current) {
        spotlightElRef.current.style.transform = `translate3d(${spotlightRef.current.x - 300}px, ${spotlightRef.current.y - 300}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"], .clickable');
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [hovered, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Spotlight */}
      <div
        ref={spotlightElRef}
        className={`fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none rounded-full z-0 transition-opacity duration-500 hidden md:block ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.06)_0%,rgba(139,0,0,0.02)_40%,transparent_70%)] mix-blend-screen"
            : "bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.03)_0%,transparent_70%)] mix-blend-normal"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Main Cursor Dot */}
      <div
        ref={dotElRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-foreground rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      />

      {/* Outer Cursor Ring */}
      <div
        ref={ringElRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary-red rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
