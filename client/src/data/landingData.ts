import {
  Brain,
  Wallet,
  Receipt,
  Luggage,
  Map,
  CloudSun,
  Sparkles,
  Camera,
  FileText,
  MessageSquare,
  Users,
  Lock,
  Layers,
  Compass,
  MapPin,
  Smile,
  Bot,
  type LucideIcon
} from "lucide-react";
import {
  FeatureItem,
  DifferentiatorItem,
  TimelineStep,
  TestimonialItem,
  FAQItem,
  StatItem
} from "@/types";

// Icon Map Registry to support dynamic rendering without inline hardcoding
export const IconMap: Record<string, LucideIcon> = {
  Brain,
  Wallet,
  Receipt,
  Luggage,
  Map,
  CloudSun,
  Sparkles,
  Camera,
  FileText,
  MessageSquare,
  Users,
  Lock,
  Layers,
  Compass,
  MapPin,
  Smile,
  Bot
};

export const STATS_DATA: StatItem[] = [
  { value: "1,000+", label: "Trips Planned", description: "Across 28 Indian states" },
  { value: "50+", label: "Cities Covered", description: "From metro hubs to offbeat towns" },
  { value: "98%", label: "Happy Travelers", description: "Based on traveler satisfaction reviews" },
  { value: "24/7", label: "AI Assistant", description: "Instant itinerary & navigation guidance" }
];

export const POWERED_BY_DATA = [
  { name: "Next.js", logoKey: "Nextjs" },
  { name: "Gemini AI", logoKey: "Gemini" },
  { name: "MongoDB", logoKey: "Mongodb" },
  { name: "Google Maps", logoKey: "Googlemaps" },
  { name: "Cloudinary", logoKey: "Cloudinary" }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "ai-planner",
    title: "AI Trip Planner",
    description: "Custom multi-day itineraries crafted by advanced AI based on your pacing, dates, and local travel styles.",
    iconName: "Brain"
  },
  {
    id: "budget-manager",
    title: "Budget Manager",
    description: "Track your expenses, set budget thresholds, and review visual dashboards to keep your vacation spending on target.",
    iconName: "Wallet"
  },
  {
    id: "expense-split",
    title: "Expense Split",
    description: "Easily split group bills, track shares in Indian Rupees, and settle up instantly with friends.",
    iconName: "Receipt"
  },
  {
    id: "packing-assistant",
    title: "AI Packing Assistant",
    description: "Smart packing checklist custom-generated for your destination's microclimate, duration, and planned activities.",
    iconName: "Luggage"
  },
  {
    id: "smart-maps",
    title: "Smart Maps",
    description: "Interactive, offline-friendly mapping detailing transit routes, popular highlights, and custom waypoints.",
    iconName: "Map"
  },
  {
    id: "weather-forecast",
    title: "Weather Forecast",
    description: "Real-time updates, microclimate alert warnings, and packing adjustment recommendations.",
    iconName: "CloudSun"
  },
  {
    id: "hidden-gems",
    title: "Hidden Gems",
    description: "Discover offbeat travel paths and local sights curated by travel curators and regional reviews.",
    iconName: "Sparkles"
  },
  {
    id: "travel-memories",
    title: "Travel Memories",
    description: "Log photos, compile daily journals, and assemble shareable digital memory cards.",
    iconName: "Camera"
  },
  {
    id: "ocr-vault",
    title: "OCR Document Vault",
    description: "Securely store and parse tickets, Aadhaar, and bookings with AI-powered instant text retrieval.",
    iconName: "FileText"
  },
  {
    id: "travel-chat",
    title: "AI Travel Chat",
    description: "A secure AI companion bot ready to answer queries, translate languages, and recommend local cuisine.",
    iconName: "MessageSquare"
  }
];

export const WHY_CHOOSE_DATA: DifferentiatorItem[] = [
  {
    title: "AI Personalized Planning",
    description: "Tailored schedules centered on your tastes, budget, and travel speed rather than static, predefined tour lists.",
    iconName: "Brain"
  },
  {
    title: "Real-Time Group Collaboration",
    description: "Invite travel partners to coordinate itineraries, vote on spots, and distribute expenses seamlessly in one platform.",
    iconName: "Users"
  },
  {
    title: "Secure Travel Documents",
    description: "AES-256 grade encryption vault for travel docs with OCR scanning and instant offline retrieval.",
    iconName: "Lock"
  },
  {
    title: "Everything in One App",
    description: "Consolidate map routing, expense sheets, docs, packing lists, and local reviews. No app switching.",
    iconName: "Layers"
  }
];

export const TIMELINE_DATA: TimelineStep[] = [
  {
    stepNumber: "01",
    title: "Create Your Trip",
    description: "Input dates, destination hub, budget tier, and travel style to jumpstart your plan."
  },
  {
    stepNumber: "02",
    title: "AI Builds Your Itinerary",
    description: "Our algorithm crafts a custom routing, plotting stays, transport links, and hidden spots."
  },
  {
    stepNumber: "03",
    title: "Travel Smarter",
    description: "Refer to offline maps, split restaurant tabs in INR, monitor alerts, and query MitraBot."
  },
  {
    stepNumber: "04",
    title: "Save Memories Forever",
    description: "Pin pictures, write journal entries, and export gorgeous trip recap collections."
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: "TripMitra made planning our family trip to Himachal so simple! The AI planner custom-routed our road trip, avoiding tourist traps, and the expense splitter was perfect.",
    name: "Rohan Sharma",
    role: "Software Engineer",
    location: "Delhi",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
  },
  {
    quote: "The Hidden Gems section is a goldmine. We found a secluded waterfall near Munnar that wasn't on any major travel site. Best travel assistant app ever!",
    name: "Priya Patel",
    role: "Travel Blogger",
    location: "Mumbai",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    quote: "Splitting bills on group trips was always a headache. TripMitra split the costs between five of us seamlessly in Indian Rupees. The offline vault saved my life when signal dropped.",
    name: "Arjun Mehta",
    role: "Backpacker",
    location: "Bangalore",
    rating: 4.8,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What is TripMitra?",
    answer: "TripMitra is an all-in-one AI travel companion designed specifically for modern travelers. It combines itinerary generation, expense tracking, group bill splitting, packing assistance, and a secure document vault into a unified premium interface."
  },
  {
    question: "How does AI planning work?",
    answer: "Our AI analyzes travel styles, weather trends, historical data, and local reviews to build optimized schedules. It calculates routes, slots attractions efficiently, and suggests places to eat based on your profile."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, security is our top priority. The Document Vault uses bank-grade AES-256 encryption. Your tickets, IDs, and personal information are stored securely and accessible only by you, even when offline."
  },
  {
    question: "Can I plan group trips?",
    answer: "Absolutely! You can create a trip and invite your friends. Everyone can contribute to the itinerary, add expenses, chat in real-time, and split bills transparently."
  },
  {
    question: "Is TripMitra free?",
    answer: "Yes, all core features—including AI planning, group expense tracking, and basic document storage—are completely free for individual and small group travelers."
  }
];
