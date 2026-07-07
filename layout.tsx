import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahul Saha | Data Analyst",
  description: "Futuristic personal brand and data analyst portfolio of Rahul Saha. Specializing in database query optimization, SQL analytics, Python, Tableau, and Power BI.",
  keywords: ["Rahul Saha", "Data Analyst Portfolio", "SQL Analysis", "Python Data Analyst", "Business Intelligence", "Jaipur Analyst"],
  authors: [{ name: "Rahul Saha" }],
  openGraph: {
    title: "Rahul Saha | Data Analyst",
    description: "Futuristic, cinematic data analyst portfolio of Rahul Saha.",
    type: "website",
    locale: "en_US",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              const savedTheme = localStorage.getItem('theme');
              const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
              if (initialTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
              } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
              }
            })()`
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground relative transition-colors duration-500">
        {/* Ambient background noise overlay */}
        <div className="noise-bg" />
        
        {/* Smooth Scrolling wrapper */}
        <SmoothScroll>
          <ThemeProvider>
            {/* Custom cursor (and mouse spotlight) */}
            <CustomCursor />
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
