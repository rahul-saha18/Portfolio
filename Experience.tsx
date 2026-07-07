"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  location: string;
  bullets: string[];
}

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const experienceData: TimelineItem[] = [
    {
      date: "DEC 2025 – JAN 2026",
      title: "DATA ANALYST INTERN",
      company: "Analytics Career Connect (ACC)",
      location: "Remote",
      bullets: [
        "Analyzed business datasets with Python (Pandas, NumPy) and SQL to extract actionable insights for strategic decisions.",
        "Built interactive Tableau dashboards visualizing KPIs, streamlining stakeholder data interpretation.",
        "Cleaned and preprocessed large datasets, ensuring 99% data quality for downstream analysis.",
        "Implemented ETL workflows automating data extraction, cutting manual processing time significantly.",
        "Applied ML fundamentals to build predictive models using regression and classification algorithms.",
      ],
    },
    {
      date: "AUG 2023 – JUN 2026",
      title: "BCA (COMPUTER SCIENCE)",
      company: "NIMS University",
      location: "Jaipur, Rajasthan, India",
      bullets: [
        "Bachelor of Computer Applications - core studies in programming algorithms, databases, and analysis.",
        "Maintained academic performance with a cumulative score of CGPA - 6.9.",
        "Developed custom scripting solutions and academic database structures using Python and MySQL.",
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-24 md:py-32 w-full overflow-hidden bg-background border-t border-card-border">
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] left-[-15%] w-[500px] h-[500px] bg-secondary-red/5 rounded-full blur-[140px] pointer-events-none opacity-30 dark:opacity-100" />

      <div ref={containerRef} className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2 mb-4"
        >
          <span className="w-8 h-[2px] bg-primary-red" />
          <span className="text-primary-red text-xs md:text-sm font-bold uppercase tracking-widest">
            History & Milestones
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-black text-foreground uppercase tracking-wider mb-20"
        >
          WHERE I'VE WORKED<span className="text-primary-red">.</span>
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative border-l border-primary-red/30 pl-8 md:pl-12 ml-4 md:ml-6 space-y-16">
          {experienceData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Timeline Glowing Node */}
              <div className="absolute top-1.5 left-[-41px] md:left-[-57px] w-5 h-5 rounded-full bg-primary-red border-4 border-background flex items-center justify-center shadow-[0_0_15px_#D90429] z-10" />

              <div className="flex flex-col items-start">
                <span className="text-xs md:text-sm font-bold text-primary-red uppercase tracking-widest mb-2 font-mono">
                  {item.date}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-wide text-foreground uppercase leading-none mb-1">
                  {item.title}
                </h3>
                
                <span className="text-sm font-semibold text-gray-zinc mb-6">
                  {item.company} &middot; <span className="font-light">{item.location}</span>
                </span>

                {/* Bullets matching screenshot 4: red dashes, regular spacing */}
                <ul className="flex flex-col space-y-3.5 max-w-2xl text-sm text-gray-zinc/90 font-light leading-relaxed">
                  {item.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start">
                      <span className="text-primary-red mr-2 font-semibold shrink-0">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
