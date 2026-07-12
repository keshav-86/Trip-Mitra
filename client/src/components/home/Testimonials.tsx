import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/landingData";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export type TestimonialsProps = Record<string, never>;

export default function Testimonials({}: TestimonialsProps) {
  return (
    <section id="explore" className="relative w-full py-20 lg:py-28 bg-card/20 transition-colors duration-300">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.04),transparent_40%)]" />

      <Container>
        <SectionHeading
          tagline="Reviews"
          title="Loved by Travelers Across India"
          description="Read experiences from backpackers, family trip coordinators, and modern tech professionals who rely on TripMitra to explore."
        />

        {/* Testimonials Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 rounded-2xl border border-card-border bg-card shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Star Rating Row */}
              <div className="flex items-center gap-1 text-accent mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent stroke-accent"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Traveler Quote */}
              <blockquote className="text-sm md:text-base text-foreground/90 italic leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Profile Avatar & Metadata (Using Next.js Image component) */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
                  <Image
                    src={item.avatarUrl}
                    alt={`${item.name}'s profile avatar`}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-bold text-foreground">{item.name}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    {item.role}, {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
