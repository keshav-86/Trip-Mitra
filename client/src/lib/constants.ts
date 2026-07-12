export const APP_NAME = "TripMitra";
export const APP_TAGLINE = "Your Smart Travel Companion";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ABOUT: "/about",
  CONTACT: "/contact",
  FEATURES: "/#features",
};

export const NAV_LINKS = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.FEATURES, label: "Features" },
  { href: "/#ai", label: "AI Helpers" },
  { href: "/#explore", label: "Explore" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.CONTACT, label: "Contact" },
];

export const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://twitter.com/tripmitra", iconName: "Twitter" },
  { name: "Instagram", href: "https://instagram.com/tripmitra", iconName: "Instagram" },
  { name: "LinkedIn", href: "https://linkedin.com/company/tripmitra", iconName: "Linkedin" },
  { name: "Facebook", href: "https://facebook.com/tripmitra", iconName: "Facebook" },
];

export const THEME_COLORS = {
  primary: "#2563EB",
  secondary: "#10B981",
  accent: "#F59E0B",
  background: "#FFFFFF",
};
