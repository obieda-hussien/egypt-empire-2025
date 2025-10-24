import { ResourceType } from '../types/game';

export interface ResourceInfo {
  id: ResourceType;
  name: string;
  nameAr: string;
  category: 'natural' | 'agricultural' | 'industrial' | 'service';
  basePrice: number;
  unit: string;
}

export const resourcesData: ResourceInfo[] = [
  // Natural Resources
  {
    id: 'oil',
    name: 'Oil',
    nameAr: 'نفط',
    category: 'natural',
    basePrice: 80,
    unit: 'barrel',
  },
  {
    id: 'gas',
    name: 'Natural Gas',
    nameAr: 'غاز طبيعي',
    category: 'natural',
    basePrice: 3.5,
    unit: 'MMBtu',
  },
  {
    id: 'cotton',
    name: 'Cotton',
    nameAr: 'قطن',
    category: 'natural',
    basePrice: 1.5,
    unit: 'kg',
  },
  {
    id: 'phosphates',
    name: 'Phosphates',
    nameAr: 'فوسفات',
    category: 'natural',
    basePrice: 100,
    unit: 'ton',
  },
  {
    id: 'iron',
    name: 'Iron',
    nameAr: 'حديد',
    category: 'natural',
    basePrice: 120,
    unit: 'ton',
  },
  {
    id: 'gold',
    name: 'Gold',
    nameAr: 'ذهب',
    category: 'natural',
    basePrice: 60000,
    unit: 'kg',
  },
  // Agricultural Resources
  {
    id: 'wheat',
    name: 'Wheat',
    nameAr: 'قمح',
    category: 'agricultural',
    basePrice: 250,
    unit: 'ton',
  },
  {
    id: 'rice',
    name: 'Rice',
    nameAr: 'أرز',
    category: 'agricultural',
    basePrice: 450,
    unit: 'ton',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    nameAr: 'فواكه',
    category: 'agricultural',
    basePrice: 800,
    unit: 'ton',
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    nameAr: 'خضروات',
    category: 'agricultural',
    basePrice: 600,
    unit: 'ton',
  },
  // Industrial Resources
  {
    id: 'textiles',
    name: 'Textiles',
    nameAr: 'منسوجات',
    category: 'industrial',
    basePrice: 2000,
    unit: 'ton',
  },
  {
    id: 'chemicals',
    name: 'Chemicals',
    nameAr: 'كيماويات',
    category: 'industrial',
    basePrice: 3000,
    unit: 'ton',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    nameAr: 'إلكترونيات',
    category: 'industrial',
    basePrice: 50000,
    unit: 'unit',
  },
  {
    id: 'steel',
    name: 'Steel',
    nameAr: 'صلب',
    category: 'industrial',
    basePrice: 800,
    unit: 'ton',
  },
  // Services
  {
    id: 'tourism',
    name: 'Tourism',
    nameAr: 'سياحة',
    category: 'service',
    basePrice: 1000,
    unit: 'visitor',
  },
  {
    id: 'suez_canal',
    name: 'Suez Canal',
    nameAr: 'قناة السويس',
    category: 'service',
    basePrice: 100000,
    unit: 'passage',
  },
  {
    id: 'finance',
    name: 'Finance',
    nameAr: 'مالية',
    category: 'service',
    basePrice: 5000,
    unit: 'transaction',
  },
];

export const getResourceInfo = (resourceId: ResourceType): ResourceInfo | undefined => {
  return resourcesData.find(r => r.id === resourceId);
};

export const getResourcesByCategory = (category: string): ResourceInfo[] => {
  return resourcesData.filter(r => r.category === category);
};
