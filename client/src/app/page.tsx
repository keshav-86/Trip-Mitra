import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import PoweredBy from "@/components/home/PoweredBy";
import FeaturesSection from "@/components/home/FeaturesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Timeline from "@/components/home/Timeline";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import MitraBotFloating from "@/components/common/MitraBotFloating";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-sans antialiased overflow-x-hidden transition-colors duration-300">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern -z-20 pointer-events-none" />

      {/* Global Glowing Background Radial Accents */}
      <div className="absolute top-[10%] left-[-10%] -z-10 h-[700px] w-[700px] rounded-full bg-primary/3 blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[-10%] -z-10 h-[700px] w-[700px] rounded-full bg-secondary/3 blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Navigation Header */}
      <Navbar />

      {/* Landing Content Sections */}
      <main className="flex-1 flex flex-col w-full relative z-10">
        <Hero />
        <StatsSection />
        <PoweredBy />
        <FeaturesSection />
        <WhyChooseUs />
        <Timeline />
        <Testimonials />
        <FAQ />
      </main>

      {/* Footer Branding */}
      <Footer />

      {/* Floating UI Elements */}
      <MitraBotFloating />
    </div>
  );
}