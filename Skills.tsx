"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, BarChart3, Database, Cpu } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <Code2 className="text-primary-red" size={24} />,
      skills: ["Python", "SQL"],
    },
    {
      title: "Data Analysis & ML",
      icon: <BarChart3 className="text-primary-red" size={24} />,
      skills: ["Pandas", "NumPy", "Scikit-learn", "Statistical Analysis", "Predictive Modeling"],
    },
    {
      title: "Databases & BI",
      icon: <Database className="text-primary-red" size={24} />,
      skills: ["MySQL", "PostgreSQL", "Query Optimization", "Tableau", "Power BI", "Matplotlib", "Seaborn"],
    },
    {
      title: "Analytics & Tools",
      icon: <Cpu className="text-primary-red" size={24} />,
      skills: ["Excel (Pivot Tables)", "VLOOKUP", "ETL Pipelines", "Data Cleaning", "Git", "Google Colab"],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section id="skills" className="relative py-24 md:py-32 w-full overflow-hidden bg-background border-t border-card-border">
      {/* Background neon elements */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-red/5 rounded-full blur-[120px] pointer-events-none opacity-30 dark:opacity-100" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2 mb-4"
        >
          <span className="w-8 h-[2px] bg-primary-red" />
          <span className="text-primary-red text-xs md:text-sm font-bold uppercase tracking-widest">
            Expertise & Stack
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-black text-foreground uppercase tracking-wider mb-16"
        >
          TECHNICAL CAPABILITIES<span className="text-primary-red">.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              custom={catIdx}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="glass-panel p-8 rounded-2xl hover:border-primary-red/30 transition-all duration-500 shadow-xl group hover:shadow-[0_15px_35px_-15px_rgba(217,4,41,0.15)] relative overflow-hidden"
            >
              {/* Inner card subtle gradient hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-card-bg border border-card-border rounded-xl group-hover:bg-primary-red/10 group-hover:border-primary-red/30 transition-colors duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-wide">{cat.title}</h3>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      rotate: 1,
                      boxShadow: "0 0 15px rgba(217, 4, 41, 0.4)",
                      borderColor: "#D90429",
                      backgroundColor: "rgba(217, 4, 41, 0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-4 py-2 text-xs font-semibold text-gray-zinc bg-card-bg border border-card-border rounded-full hover:text-foreground transition-all cursor-none"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
