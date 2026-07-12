export interface NavLink {
  href: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface TechLogo {
  name: string;
  logoSvg: string; // inline SVG path or rendering details
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DifferentiatorItem {
  title: string;
  description: string;
  iconName: string;
}

export interface TimelineStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  avatarUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
