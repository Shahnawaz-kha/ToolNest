export type CategoryId = 
  | 'pdf' | 'image' | 'text' | 'calculator' | 'developer' 
  | 'qr-barcode' | 'seo' | 'social-media' | 'design' | 'productivity';

export interface ToolMetadata {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: CategoryId;
  iconName: string;
  isPopular?: boolean;
  isNew?: boolean;
  component: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  instructions: {
    howTo: string[];
    features: string[];
    faqs: { question: string; answer: string }[];
  };
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
}