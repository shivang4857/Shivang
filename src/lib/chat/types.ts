export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  answer: string | null;
  error: string | null;
}

export interface PortfolioContext {
  name: string;
  headline: string;
  location: string;
  about: string;
  skills: Record<string, string[]>;
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    tools: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    description: string;
    highlights: string[];
  }[];
  projects: {
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    year: string;
  }[];
  achievements: string[];
  interests: string[];
  workStyle: string;
  personality: string;
  values: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}
