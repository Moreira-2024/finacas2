
export interface Module {
  number: number;
  title: string;
  description: string;
}

export interface TestimonialVideo {
  id: string;
  title: string;
  youtubeId: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialStudent {
  id: number;
  quote: string;
  name: string;
  profession: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular: boolean;
}

export interface BookChapter {
  title: string;
  content: string;
}

export interface CourseMaterial {
  id: string;
  title: string;
  pages: number;
  description: string;
  benefits: string[];
  isHighlight?: boolean;
  type: 'book' | 'workbook' | 'guide' | 'task' | 'bundle';
}