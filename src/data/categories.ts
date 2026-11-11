import { Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'pdf', name: 'PDF Tools', description: 'Compress, merge, split, and convert PDF files', iconName: 'FileText' },
  { id: 'image', name: 'Image Tools', description: 'Resize, crop, compress, and convert images', iconName: 'Image' },
  { id: 'text', name: 'Text Tools', description: 'Manipulate, format, and count text elements', iconName: 'Type' },
  { id: 'calculator', name: 'Calculator Tools', description: 'Financial, math, and unit conversion calculators', iconName: 'Calculator' },
  { id: 'developer', name: 'Developer Tools', description: 'Formatters, encoders, parsers, and utilities', iconName: 'Code' },
  { id: 'qr-barcode', name: 'QR & Barcode', description: 'Generate and scan QR codes and barcodes', iconName: 'QrCode' },
  { id: 'seo', name: 'SEO Tools', description: 'Meta tag generators, keyword analyzers, and auditors', iconName: 'Search' },
  { id: 'social-media', name: 'Social Media', description: 'Post formatters, hashtag creators, and downloaders', iconName: 'Share2' },
  { id: 'design', name: 'Design Tools', description: 'Color palettes, contrast checkers, and CSS tools', iconName: 'Palette' },
  { id: 'productivity', name: 'Productivity Tools', description: 'Timers, task trackers, notes, and utilities', iconName: 'CheckCircle2' },
];