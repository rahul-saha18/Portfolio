"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";

interface ParticleData {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  randomX: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const glow = glowRef.current;
    
    if (!container || !image) return;

    // GSAP parallax mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = container.getBoundingClientRect();
      const x = (clientX - left - width / 2) / (width / 2);
      const y = (clientY - top - height / 2) / (height / 2);

      // Move portrait in 3D space
      gsap.to(image, {
        x: x * 20,
        y: y * 20,
        rotationY: x * 6,
        rotationX: -y * 6,
        duration: 0.8,
        ease: "power2.out",
      });

      // Move lighting behind portrait
      if (glow) {
        gsap.to(glow, {
          x: x * 35,
          y: y * 35,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      if (glow) {
        gsap.to(glow, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Generate random particles client-side only to prevent SSR/Hydration mismatch
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 20,
      randomX: Math.random() * 80 - 40,
    }));
    setParticles(generated);
  }, []);

  // Text letters array for mounting animations
  const titleText = "RAHUL SAHA";
  const letters = Array.from(titleText);


  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background pt-20"
      style={{ perspective: "1000px" }}
    >
      {/* Background Grids (Light/Dark specific) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none opacity-40 dark:block hidden" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none opacity-40 dark:hidden block" />

      {/* Floating Red Rings (background elements) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full border border-primary-red/10 animate-[spin_40s_linear_infinite] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full border border-secondary-red/5 animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />

      {/* Glow ambient spotlights */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary-red/10 rounded-full blur-[120px] pointer-events-none opacity-30 dark:opacity-100" />
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-secondary-red/10 rounded-full blur-[140px] pointer-events-none opacity-30 dark:opacity-100" />

      {/* Subtle floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary-red/30 pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-20px",
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: ["0px", `${p.randomX}px`],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Giant Background Text RAHUL SAHA (Behind portrait) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[14vw] font-display font-black tracking-widest text-foreground leading-none select-none opacity-[0.06] dark:opacity-[0.08] text-center mt-[-5vh]">
          RAHUL SAHA
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        {/* Left Side: Tagline, Main Title, Description, CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left select-text relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-2 mb-4"
          >
            <span className="w-8 h-[2px] bg-primary-red" />
            <span className="text-primary-red text-xs md:text-sm font-bold uppercase tracking-widest">
              Creative Data Analyst
            </span>
          </motion.div>

          {/* Animating Letters of RAHUL SAHA */}
          <motion.h1
            className="text-6xl md:text-8xl font-display font-black tracking-wider text-foreground mb-6 uppercase leading-tight"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={{
                  hidden: { y: 60, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 120,
                    },
                  },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-base md:text-lg text-gray-zinc max-w-xl mb-10 leading-relaxed font-light"
          >
            Transforming complex datasets into clear, actionable business insights. Specialized in statistical analysis, predictive modeling, database query optimization, and dynamic interactive dashboards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-full bg-primary-red text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 group hover:bg-foreground hover:text-background hover:shadow-[0_0_25px_rgba(217,4,41,0.4)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>View Projects</span>
              <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/Rahul_Saha_Resume.pdf"
              download="Rahul_Saha_Resume.pdf"
              className="px-8 py-4 rounded-full border border-card-border hover:border-primary-red bg-card-bg hover:bg-primary-red/10 text-foreground text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 transform hover:-translate-y-1"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right Side: Portrait Image with Cinematic Overlaps */}
        <div className="lg:col-span-5 flex justify-center items-center relative select-none">
          {/* Spotlight behind photo */}
          <div
            ref={glowRef}
            className="absolute w-[350px] md:w-[450px] h-[350px] md:h-[450px] bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.25)_0%,rgba(139,0,0,0.05)_40%,transparent_70%)] rounded-full blur-[40px] z-0 pointer-events-none"
          />

          {/* Glowing lighting rings */}
          <div className="absolute w-[280px] md:w-[360px] h-[280px] md:h-[360px] rounded-full border border-primary-red/20 z-0 animate-[pulse_4s_easeInOut_infinite]" />

          {/* Interactive Floating Portrait Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 80,
              delay: 0.4,
            }}
            className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Soft hover border glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-red/10 via-transparent to-transparent z-10 pointer-events-none" />

            {/* Smooth Floating Loop Animation inside the parallax container */}
            <motion.div
              className="w-full h-full relative"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/rahul_portrait_v2.png"
                alt="Rahul Saha"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 280px, (max-width: 1200px) 340px, 380px"
              />
            </motion.div>
          </motion.div>

          {/* Little abstract details */}
          <div className="absolute bottom-[-10px] left-[10%] px-4 py-2 bg-card-bg border border-card-border backdrop-blur-md rounded-lg text-xs font-mono text-gray-zinc tracking-wider flex items-center space-x-2 shadow-2xl z-20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
}
