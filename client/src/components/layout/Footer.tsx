import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { APP_NAME, APP_TAGLINE, SOCIAL_LINKS, ROUTES } from "@/lib/constants";
import Container from "@/components/ui/Container";

export type FooterProps = Record<string, never>;

export default function Footer({}: FooterProps) {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "AI Planner", href: "#" },
        { label: "Expense Splitter", href: "#" },
        { label: "Document Vault", href: "#" },
        { label: "MitraBot Help", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: ROUTES.ABOUT },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: ROUTES.CONTACT }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Travel Guides", href: "#" },
        { label: "Indian Landmarks", href: "#" },
        { label: "Safety Tips", href: "#" },
        { label: "Blog", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Security Policy", href: "#" },
        { label: "Cookie Policy", href: "#" }
      ]
    }
  ];

  const socialIcons: Record<string, React.ReactNode> = {
    Twitter: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    Instagram: (
      <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    LinkedIn: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
      </svg>
    ),
    Facebook: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  };

  return (
    <footer className="w-full border-t border-border bg-card/30 transition-colors duration-300 py-16">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary text-white">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-foreground">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              {APP_TAGLINE}. Leverage next-generation AI to design, coordinate, and experience India like never before.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 hover:scale-105 transition-all duration-300"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {Icon}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME} Technologies Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made for Indian travelers with <span className="text-red-500 text-sm">❤️</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
