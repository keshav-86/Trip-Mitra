// Landing Page Types
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
  logoSvg: string;
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

// Authenticated Application Types
export interface User {
  _id: string;
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Trip {
  _id: string;
  title: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  createdBy: string | User;
  members: (string | User)[];
  inviteCode?: string;
  createdAt?: string;
  updatedAt?: string;
  travelers?: number;
  itinerary?: {
    day: number;
    title: string;
    activities: string[];
  }[];
  budgetBreakdown?: {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    miscellaneous: number;
  };
  packingList?: string[];
  localFoods?: string[];
  travelTips?: string[];
}



export interface Expense {
  _id: string;
  trip: string;
  description: string;
  amount: number;
  category:
    | "FOOD"
    | "TRANSPORT"
    | "ACCOMMODATION"
    | "SHOPPING"
    | "ENTERTAINMENT"
    | "OTHER";
  paidBy: string | User;
  participants: (string | User)[];
  createdAt: string;
  updatedAt: string;
}

export interface Settlement {
  from: User;
  to: User;
  amount: number;
  paid?: boolean;
}

export interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  data: User;
}

export interface BudgetReport {
  budget: number;
  totalExpense: number;
  remainingBudget: number;
}
