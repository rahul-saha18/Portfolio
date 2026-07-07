"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Custom inline Github icon
function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Project Interface
interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  visualization: React.ReactNode;
}

// Interactive SQL Schema Visualization
function SQLVisualization() {
  return (
    <div className="relative w-full h-full bg-black/20 dark:bg-[#050505]/60 flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.06)_0%,transparent_70%)]" />
      <div className="w-full max-w-[200px] border border-card-border rounded-lg bg-card-bg p-4 font-mono text-[9px] text-gray-zinc flex flex-col space-y-2 select-none shadow-2xl relative z-10">
        <div className="flex items-center justify-between border-b border-card-border pb-1.5 mb-1">
          <span className="text-foreground font-bold tracking-wide">zepto_orders</span>
          <span className="text-primary-red text-[8px] border border-primary-red/30 px-1 rounded">TABLE</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground/80">order_id</span>
          <span className="text-primary-red/60 font-semibold">INT [PK]</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground/80">product_name</span>
          <span className="text-gray-zinc/40">VARCHAR</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground/80">order_hour</span>
          <span className="text-gray-zinc/40">INT</span>
        </div>
        <div className="flex items-center justify-between border-t border-card-border pt-1.5 mt-1 font-bold text-[8px] text-emerald-500">
          <span>SELECT SUM(total)</span>
          <span>GROUP BY...</span>
        </div>
      </div>
    </div>
  );
}

// Interactive Air Quality Line Chart Visualization
function AQIVisualization() {
  return (
    <div className="relative w-full h-full bg-black/20 dark:bg-[#050505]/60 flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.08)_0%,transparent_70%)]" />
      <div className="w-full max-w-[220px] flex flex-col space-y-2 relative z-10">
        {/* Graph Legend */}
        <div className="flex justify-between items-center text-[8px] font-mono text-gray-zinc">
          <span>AQI Trend (PM2.5)</span>
          <span className="text-primary-red font-bold animate-pulse">Live EDA</span>
        </div>
        <svg className="w-full h-[90px]" viewBox="0 0 100 50">
          <defs>
            <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D90429" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D90429" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 45 Q 15 20 30 40 T 60 15 T 90 25 L 100 10"
            fill="none"
            stroke="#D90429"
            strokeWidth="1.5"
          />
          <path
            d="M 0 45 Q 15 20 30 40 T 60 15 T 90 25 L 100 10 L 100 50 L 0 50 Z"
            fill="url(#aqiGrad)"
          />
          {/* Animated node dot */}
          <circle cx="60" cy="15" r="2.5" fill="#FFFFFF" className="animate-ping" />
          <circle cx="60" cy="15" r="1.5" fill="#D90429" />
        </svg>
      </div>
    </div>
  );
}

// Dynamic Sales Column Charts (matching screenshot 5)
function SalesVisualization() {
  return (
    <div className="relative w-full h-full bg-black/20 dark:bg-[#050505]/60 flex items-end justify-center p-8 overflow-hidden space-x-2.5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.06)_0%,transparent_70%)]" />
      
      <div className="w-5 h-[35%] bg-primary-red/10 border border-primary-red/30 rounded-t transition-all duration-500 hover:h-[50%] hover:bg-primary-red/50 relative z-10" />
      <div className="w-5 h-[55%] bg-primary-red/20 border border-primary-red/40 rounded-t transition-all duration-500 hover:h-[70%] hover:bg-primary-red/60 relative z-10" />
      <div className="w-5 h-[80%] bg-primary-red border border-primary-red rounded-t transition-all duration-500 hover:h-[90%] hover:shadow-[0_0_15px_rgba(217,4,41,0.6)] relative z-10" />
      <div className="w-5 h-[45%] bg-primary-red/15 border border-primary-red/35 rounded-t transition-all duration-500 hover:h-[60%] hover:bg-primary-red/50 relative z-10" />
      <div className="w-5 h-[70%] bg-primary-red/30 border border-primary-red/50 rounded-t transition-all duration-500 hover:h-[85%] hover:bg-primary-red/70 relative z-10" />
      <div className="w-5 h-[60%] bg-primary-red/25 border border-primary-red/45 rounded-t transition-all duration-500 hover:h-[75%] hover:bg-primary-red/65 relative z-10" />
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const projects: Project[] = [
    {
      id: "zepto-sql",
      category: "01 / SQL",
      title: "ZEPTO SQL ANALYSIS",
      description: "Designed and executed a comprehensive SQL-based analysis on Zepto's product and order dataset to uncover delivery efficiencies, order trends, peak hours, and product demand insights.",
      tags: ["MySQL", "JOINs", "Window Functions", "Query Optimization"],
      github: "https://github.com/rahul-saha18",
      visualization: <SQLVisualization />,
    },
    {
      id: "delhi-aqi",
      category: "02 / DATA SCIENCE",
      title: "DELHI AIR QUALITY EDA",
      description: "Performed end-to-end Exploratory Data Analysis on Delhi's historical air quality dataset, cleaning outliers and visualizing seasonal pollutant trends using Python plotting modules.",
      tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Data Cleaning"],
      github: "https://github.com/rahul-saha18",
      visualization: <AQIVisualization />,
    },
    {
      id: "coffee-sales",
      category: "03 / BI & DASHBOARDS",
      title: "COFFEE SHOP SALES ANALYSIS",
      description: "Analyzed multi-location transactions to spot revenue trends and top sellers, then built a dynamic Excel dashboard tracking revenue, AOV, and month-over-month growth.",
      tags: ["Excel", "Pivot Tables", "Data Visualization", "Dashboards"],
      github: "https://github.com/rahul-saha18",
      visualization: <SalesVisualization />,
    },
  ];

  return (
    <section id="projects" className="relative py-24 md:py-32 w-full overflow-hidden bg-background border-t border-card-border">
      {/* Glow highlight */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[120px] pointer-events-none opacity-30 dark:opacity-100" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2 mb-4"
        >
          <span className="w-8 h-[2px] bg-primary-red" />
          <span className="text-primary-red text-xs md:text-sm font-bold uppercase tracking-widest">
            Selected Works
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-black text-foreground uppercase tracking-wider mb-16"
        >
          FEATURED PROJECTS<span className="text-primary-red">.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-2xl overflow-hidden hover:border-primary-red/30 transition-all duration-500 shadow-2xl flex flex-col group h-full hover:shadow-[0_20px_40px_rgba(217,4,41,0.1)]"
            >
              {/* Visualization Container (Hover Zoom and Reveal) */}
              <div className="relative w-full aspect-video border-b border-card-border overflow-hidden">
                <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                  {project.visualization}
                </div>
                {/* Overlay gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-primary-red uppercase block mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-display font-black tracking-wide text-foreground uppercase mb-4 transition-colors group-hover:text-primary-red">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-zinc leading-relaxed font-light mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-semibold text-gray-zinc bg-card-bg border border-card-border px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center justify-between border-t border-card-border pt-4 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold uppercase tracking-wider text-foreground hover:text-primary-red flex items-center space-x-1.5 transition-colors cursor-none"
                    >
                      <GithubIcon size={14} />
                      <span className="border-b border-card-border group-hover:border-primary-red/50">View on GitHub</span>
                    </a>

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold uppercase tracking-wider text-primary-red hover:text-foreground flex items-center space-x-1.5 transition-colors cursor-none"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
