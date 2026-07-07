"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, BookOpen, Briefcase } from "lucide-react";

// Count-up Statistics Component
function StatCounter({ target, duration = 1.5, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    // Calculate increment time based on step size
    const steps = Math.min(end, 50); // cap steps at 50 to avoid ultra-fast loops
    const stepVal = Math.max(1, Math.floor(end / steps));
    const incrementTime = Math.max(25, Math.floor(totalMiliseconds / steps));

    const timer = setInterval(() => {
      start += stepVal;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-black text-primary-red tracking-wider">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const stats = [
    { label: "Projects Finished", target: 8, suffix: "+" },
    { label: "Months Experience", target: 3, suffix: "+" },
    { label: "Tech Stack Tools", target: 15, suffix: "+" },
    { label: "Core Strengths", target: 6, suffix: "" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 w-full overflow-hidden bg-background border-t border-card-border">
      {/* Background glow overlay */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-primary-red/5 rounded-full blur-[100px] pointer-events-none opacity-30 dark:opacity-100" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center space-x-2 mb-4"
        >
          <span className="w-8 h-[2px] bg-primary-red" />
          <span className="text-primary-red text-xs md:text-sm font-bold uppercase tracking-widest">
            Profile Introduction
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl md:text-6xl font-display font-black text-foreground uppercase tracking-wider mb-16"
        >
          WHO IS R.SAHA<span className="text-primary-red">?</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Styled Portrait/Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative w-full aspect-square md:max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-card-border shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-primary-red/10 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            
            <Image
              src="/rahul_about.png"
              alt="Data Visualization Concept"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>

          {/* Right Column: Bio & Core Info */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Translating Complex Datasets into Actionable Insights
              </h3>
              <p className="text-gray-zinc leading-relaxed font-light mb-6">
                I am a data analyst from Jaipur, Rajasthan, with a background in Computer Science (BCA). I specialize in analyzing large datasets, uncovering hidden business trends, and creating interactive visualization dashboards that empower teams to make data-backed strategic decisions.
              </p>
              <p className="text-gray-zinc leading-relaxed font-light">
                Leveraging core skills in SQL, Python, and business intelligence suites like Tableau and Power BI, I bridge the gap between complex raw data systems and clear business directives. I prioritize data quality, pipeline efficiency, and clear storytelling.
              </p>
            </motion.div>

            {/* Structured Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-card-bg border border-card-border hover:border-primary-red/20 transition-all shadow-sm">
                <MapPin className="text-primary-red shrink-0" size={20} />
                <div>
                  <div className="text-[10px] text-gray-zinc uppercase tracking-widest font-bold">Location</div>
                  <div className="text-sm font-semibold text-foreground">Jaipur, Rajasthan, India</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl bg-card-bg border border-card-border hover:border-primary-red/20 transition-all shadow-sm">
                <BookOpen className="text-primary-red shrink-0" size={20} />
                <div>
                  <div className="text-[10px] text-gray-zinc uppercase tracking-widest font-bold">Education</div>
                  <div className="text-sm font-semibold text-foreground">BCA (Computer Science)</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl bg-card-bg border border-card-border hover:border-primary-red/20 transition-all shadow-sm">
                <Briefcase className="text-primary-red shrink-0" size={20} />
                <div>
                  <div className="text-[10px] text-gray-zinc uppercase tracking-widest font-bold">Role Preference</div>
                  <div className="text-sm font-semibold text-foreground">Data Analyst</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl bg-card-bg border border-card-border hover:border-primary-red/20 transition-all shadow-sm">
                <Calendar className="text-primary-red shrink-0" size={20} />
                <div>
                  <div className="text-[10px] text-gray-zinc uppercase tracking-widest font-bold">Availability</div>
                  <div className="text-sm font-semibold text-foreground">Immediate Joiner</div>
                </div>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-card-border pt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <StatCounter target={stat.target} suffix={stat.suffix} />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-zinc mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
