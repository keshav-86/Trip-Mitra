import React from "react";
import Container from "@/components/ui/Container";

export type PoweredByProps = Record<string, never>;

export default function PoweredBy({}: PoweredByProps) {
  // Inline SVGs for technology logos to ensure vector sharp loading and dark mode integration
  const logos = [
    {
      name: "Next.js",
      svg: (
        <svg viewBox="0 0 180 35" className="h-5 w-auto fill-foreground" aria-hidden="true">
          <path d="M19.1 27.5c-4.7 0-8.3-3.6-8.3-8.2 0-4.6 3.6-8.2 8.3-8.2 3.1 0 5.6 1.7 6.9 4.3l-2.6 1.5c-1-1.7-2.4-2.6-4.3-2.6-2.9 0-5.1 2.2-5.1 5s2.2 5 5.1 5c2 0 3.4-1 4.4-2.7l2.6 1.5c-1.3 2.7-3.8 4.4-7 4.4zm16.5-16.1h3.1v15.7h-3.1V11.4zm12.3 5c0-3.3 2.2-5.3 5.4-5.3 3.1 0 5.4 2 5.4 5.3v10.7h-3.1V16.7c0-1.7-1-2.7-2.6-2.7-1.7 0-2.7 1-2.7 2.7v10.7h-3.1V16.4zm23.2-5h3.2l6.2 9.6 6.1-9.6h3.2v15.7h-3.1V16.6l-5.3 8.3h-1.8l-5.3-8.3v10.5h-3.1V11.4zm26.4 8.2c0-4.7 3.6-8.2 8.2-8.2 4.6 0 8.2 3.5 8.2 8.2 0 4.7-3.6 8.2-8.2 8.2-4.6 0-8.2-3.5-8.2-8.2zm13.3 0c0-2.8-2.2-5.1-5.1-5.1-2.9 0-5.1 2.3-5.1 5.1s2.2 5.1 5.1 5.1c2.9 0 5.1-2.3 5.1-5.1zm12.1-7.9h3.1v3.2h-3.1v-3.2zm0 4.8h3.1v10.9h-3.1V16.5z" />
          <text x="145" y="24" className="font-extrabold text-[15px] tracking-widest font-mono">16</text>
        </svg>
      )
    },
    {
      name: "Gemini AI",
      svg: (
        <div className="flex items-center gap-1 text-foreground font-extrabold tracking-wide">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary fill-primary" aria-hidden="true">
            <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
          </svg>
          <span className="text-sm">Gemini AI</span>
        </div>
      )
    },
    {
      name: "MongoDB",
      svg: (
        <div className="flex items-center gap-1 text-foreground font-semibold">
          <svg viewBox="0 0 32 32" className="h-6 w-6 text-secondary fill-secondary" aria-hidden="true">
            <path d="M16 1.833c-.705 0-1.282.723-1.63 1.884l-.19.643v20.473c.487 1.543 1.137 2.766 1.82 2.766.685 0 1.332-1.223 1.82-2.766V4.36l-.19-.643c-.347-1.16-.925-1.884-1.63-1.884zM13.238 6.45c-.328.784-.66 1.85-.972 3.125-.976 3.992-1.393 9.475-.382 13.064.675 2.392 1.815 4.148 2.684 4.57V8.586c-.524-.872-.942-1.576-1.33-2.136zM18.762 6.45c-.387.56-.806 1.264-1.33 2.136v18.623c.87-.422 2.01-2.178 2.684-4.57 1.01-3.59.593-9.072-.382-13.064-.312-1.275-.644-2.34-.972-3.125z" />
          </svg>
          <span className="text-sm font-bold tracking-tight">MongoDB</span>
        </div>
      )
    },
    {
      name: "Google Maps",
      svg: (
        <div className="flex items-center gap-1 text-foreground font-semibold">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-sm font-bold tracking-tight">Google Maps</span>
        </div>
      )
    },
    {
      name: "Cloudinary",
      svg: (
        <div className="flex items-center gap-1.5 text-foreground font-bold tracking-tighter">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary fill-primary" aria-hidden="true">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
          </svg>
          <span className="text-sm">Cloudinary</span>
        </div>
      )
    }
  ];

  return (
    <section className="w-full py-8 border-b border-border/50 bg-muted/20 transition-colors duration-300">
      <Container>
        <div className="flex flex-col gap-5 items-center justify-center">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Powering Premium Indian Travel Tech
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 dark:opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-105"
                title={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
