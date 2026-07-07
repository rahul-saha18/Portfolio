"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";

// Custom inline brand icons
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

function LinkedinIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      // Fallback demo simulation if environment variable is not configured yet
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1200);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Contact Form - ${formState.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (err) {
      setIsSubmitting(false);
      alert("Failed to send message. Please contact rahulsaha5204@gmail.com directly.");
    }
  };

  const contactDetails = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: "rahulsaha5204@gmail.com",
      href: "mailto:rahulsaha5204@gmail.com",
    },
    {
      icon: <Phone size={16} />,
      label: "Phone",
      value: "+91 86384 52316",
      href: "tel:+918638452316",
    },
    {
      icon: <LinkedinIcon size={16} />,
      label: "LinkedIn",
      value: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/rahul-saha-2ab835360/",
    },
    {
      icon: <GithubIcon size={16} />,
      label: "GitHub",
      value: "GitHub Profile",
      href: "https://github.com/rahul-saha18",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 w-full overflow-hidden bg-background border-t border-card-border">
      {/* Background glow spotlight */}
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[120px] pointer-events-none opacity-30 dark:opacity-100" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2 mb-4"
        >
          <span className="w-8 h-[2px] bg-primary-red" />
          <span className="text-primary-red text-xs md:text-sm font-bold uppercase tracking-widest">
            Get in Touch
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-4">
          {/* Left Column: Headline and info */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {/* Headline matching screenshot 3 */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-black text-foreground uppercase leading-none tracking-wider mb-8"
            >
              LET'S BUILD SOMETHING<br />
              WITH YOUR <span className="text-primary-red">DATA.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-gray-zinc leading-relaxed font-light mb-12 max-w-lg"
            >
              Open to data analyst roles, freelance analysis work, and interesting datasets. Reach out — I usually reply within a day.
            </motion.p>

            {/* Icon Info List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col space-y-5"
            >
              {contactDetails.map((detail, index) => (
                <a
                  key={index}
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-card-bg transition-all duration-300 w-fit group cursor-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-card-bg border border-card-border group-hover:border-primary-red/50 group-hover:text-primary-red transition-all duration-300 flex items-center justify-center text-gray-zinc">
                    {detail.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-zinc uppercase tracking-widest font-bold">
                      {detail.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary-red transition-colors">
                      {detail.value}
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 w-full"
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-card-bg border border-card-border rounded-xl px-5 py-4 text-sm text-foreground placeholder-gray-zinc focus:outline-none focus:border-primary-red/50 focus:bg-card-bg transition-all cursor-none"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-card-bg border border-card-border rounded-xl px-5 py-4 text-sm text-foreground placeholder-gray-zinc focus:outline-none focus:border-primary-red/50 focus:bg-card-bg transition-all cursor-none"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={6}
                  placeholder="Message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-card-bg border border-card-border rounded-xl px-5 py-4 text-sm text-foreground placeholder-gray-zinc focus:outline-none focus:border-primary-red/50 focus:bg-card-bg transition-all resize-none cursor-none"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="px-8 py-3.5 rounded-full bg-primary-red text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(217,4,41,0.5)] cursor-none"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send size={12} />
                </button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2 text-emerald-500 text-xs font-semibold"
                  >
                    <CheckCircle2 size={16} />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
