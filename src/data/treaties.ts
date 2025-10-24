import { TreatyType } from '../types/game';

export interface TreatyInfo {
  type: TreatyType;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  benefits: string[];
  benefitsAr: string[];
  requirements: {
    minRelations: number;
    cost: number;
  };
}

export const treatyTypes: TreatyInfo[] = [
  {
    type: 'trade_agreement',
    name: 'Trade Agreement',
    nameAr: 'اتفاقية تجارية',
    description: 'Reduce tariffs and increase bilateral trade.',
    descriptionAr: 'تخفيض الرسوم الجمركية وزيادة التجارة الثنائية.',
    benefits: [
      'Reduce trade costs by 30%',
      'Increase export opportunities',
      '+5 relations bonus',
    ],
    benefitsAr: [
      'تقليل تكاليف التجارة بنسبة 30٪',
      'زيادة فرص التصدير',
      '+5 مكافأة علاقات',
    ],
    requirements: {
      minRelations: 20,
      cost: 100000000,
    },
  },
  {
    type: 'military_alliance',
    name: 'Military Alliance',
    nameAr: 'تحالف عسكري',
    description: 'Mutual defense pact and joint military exercises.',
    descriptionAr: 'اتفاق دفاع مشترك وتدريبات عسكرية مشتركة.',
    benefits: [
      'Mutual defense guarantee',
      '+15% military strength in wars',
      'Joint military technology',
      '+10 relations bonus',
    ],
    benefitsAr: [
      'ضمان الدفاع المتبادل',
      '+15٪ قوة عسكرية في الحروب',
      'تكنولوجيا عسكرية مشتركة',
      '+10 مكافأة علاقات',
    ],
    requirements: {
      minRelations: 50,
      cost: 500000000,
    },
  },
  {
    type: 'non_aggression',
    name: 'Non-Aggression Pact',
    nameAr: 'معاهدة عدم اعتداء',
    description: 'Mutual commitment to avoid military conflict.',
    descriptionAr: 'التزام متبادل بتجنب الصراع العسكري.',
    benefits: [
      'Prevents war declaration',
      'Reduces military spending pressure',
      '+5 relations bonus',
    ],
    benefitsAr: [
      'يمنع إعلان الحرب',
      'يقلل من ضغط الإنفاق العسكري',
      '+5 مكافأة علاقات',
    ],
    requirements: {
      minRelations: 10,
      cost: 50000000,
    },
  },
  {
    type: 'strategic_cooperation',
    name: 'Strategic Cooperation',
    nameAr: 'تعاون استراتيجي',
    description: 'Long-term partnership in multiple sectors.',
    descriptionAr: 'شراكة طويلة الأجل في قطاعات متعددة.',
    benefits: [
      'Enhanced diplomatic ties',
      'Joint infrastructure projects',
      'Cultural exchange programs',
      '+8 relations bonus',
    ],
    benefitsAr: [
      'تعزيز العلاقات الدبلوماسية',
      'مشاريع بنية تحتية مشتركة',
      'برامج التبادل الثقافي',
      '+8 مكافأة علاقات',
    ],
    requirements: {
      minRelations: 30,
      cost: 200000000,
    },
  },
  {
    type: 'technology_exchange',
    name: 'Technology Exchange',
    nameAr: 'تبادل تكنولوجي',
    description: 'Share scientific and technological knowledge.',
    descriptionAr: 'تبادل المعرفة العلمية والتكنولوجية.',
    benefits: [
      '+10% technology advancement',
      'Joint research projects',
      'Knowledge transfer',
      '+5 relations bonus',
    ],
    benefitsAr: [
      '+10٪ التقدم التكنولوجي',
      'مشاريع بحثية مشتركة',
      'نقل المعرفة',
      '+5 مكافأة علاقات',
    ],
    requirements: {
      minRelations: 40,
      cost: 300000000,
    },
  },
];

export const getTreatyInfo = (type: TreatyType): TreatyInfo | undefined => {
  return treatyTypes.find(t => t.type === type);
};
