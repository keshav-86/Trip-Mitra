import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { APP_TAGLINE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroDashboard from "./HeroDashboard";

export type HeroProps = Record<string, never>;

export default function Hero({}: HeroProps) {
  return (
    <section id="hero" className="relative w-full overflow-hidden py-20 lg:py-28">
      {/* Background Gradients and Ambient Circles */}
      <div className="absolute top-0 left-0 right-0 -z-10 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06),transparent_50%)]" />
      <div className="absolute top-[20%] left-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Copy (Text Column) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 md:max-w-2xl mx-auto lg:mx-0">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{APP_TAGLINE}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] md:leading-[1.15]">
              Plan Smarter.
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Travel Better.
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              TripMitra helps Indian travelers plan trips using AI, manage expenses, split bills, organize travel documents, discover hidden gems, and create unforgettable memories.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
              <Button variant="primary" size="lg" href="#timeline" className="w-full sm:w-auto gap-2 group">
                Start Planning
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" href="#features" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </div>
          </div>

          {/* Hero Illustration (Interactive dashboard preview) */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <HeroDashboard />
          </div>
        </div>
      </Container>
    </section>
  );
}
