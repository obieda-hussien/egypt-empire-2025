export interface OrganizationInfo {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  benefits: string[];
  benefitsAr: string[];
  obligations: string[];
  obligationsAr: string[];
  membershipFee: number;
}

export const organizationsData: OrganizationInfo[] = [
  {
    id: 'arab_league',
    name: 'Arab League',
    nameAr: 'جامعة الدول العربية',
    description: 'Regional organization of Arab states promoting political and economic cooperation.',
    descriptionAr: 'منظمة إقليمية للدول العربية تعزز التعاون السياسي والاقتصادي.',
    benefits: [
      '10% trade bonus with Arab countries',
      'Political support in conflicts',
      'Mediation services',
      'Cultural exchange programs',
    ],
    benefitsAr: [
      'مكافأة تجارية 10٪ مع الدول العربية',
      'الدعم السياسي في النزاعات',
      'خدمات الوساطة',
      'برامج التبادل الثقافي',
    ],
    obligations: [
      'Annual contribution: $50 million',
      'Support Arab causes',
      'Host summits periodically',
      'Contribute to joint defense',
    ],
    obligationsAr: [
      'مساهمة سنوية: 50 مليون دولار',
      'دعم القضايا العربية',
      'استضافة القمم بشكل دوري',
      'المساهمة في الدفاع المشترك',
    ],
    membershipFee: 50000000,
  },
  {
    id: 'african_union',
    name: 'African Union',
    nameAr: 'الاتحاد الأفريقي',
    description: 'Continental union promoting integration and development across Africa.',
    descriptionAr: 'اتحاد قاري يعزز التكامل والتنمية في جميع أنحاء أفريقيا.',
    benefits: [
      'Infrastructure development projects',
      'Free movement agreements',
      'Trade integration benefits',
      'Development aid access',
    ],
    benefitsAr: [
      'مشاريع تطوير البنية التحتية',
      'اتفاقيات حرية التنقل',
      'فوائد التكامل التجاري',
      'الوصول إلى المساعدات الإنمائية',
    ],
    obligations: [
      'Annual contribution: $30 million',
      'Participate in peacekeeping',
      'Support development initiatives',
      'Respect continental decisions',
    ],
    obligationsAr: [
      'مساهمة سنوية: 30 مليون دولار',
      'المشاركة في حفظ السلام',
      'دعم مبادرات التنمية',
      'احترام القرارات القارية',
    ],
    membershipFee: 30000000,
  },
  {
    id: 'united_nations',
    name: 'United Nations',
    nameAr: 'الأمم المتحدة',
    description: 'International organization promoting peace, security, and cooperation.',
    descriptionAr: 'منظمة دولية تعزز السلام والأمن والتعاون.',
    benefits: [
      'International recognition',
      'Humanitarian aid access',
      'Security Council participation',
      'Global diplomatic platform',
      'Development assistance',
    ],
    benefitsAr: [
      'الاعتراف الدولي',
      'الوصول إلى المساعدات الإنسانية',
      'المشاركة في مجلس الأمن',
      'منصة دبلوماسية عالمية',
      'المساعدة الإنمائية',
    ],
    obligations: [
      'Annual contribution: $100 million',
      'Comply with international law',
      'Support peacekeeping missions',
      'Respect human rights',
      'Participate in global initiatives',
    ],
    obligationsAr: [
      'مساهمة سنوية: 100 مليون دولار',
      'الامتثال للقانون الدولي',
      'دعم بعثات حفظ السلام',
      'احترام حقوق الإنسان',
      'المشاركة في المبادرات العالمية',
    ],
    membershipFee: 100000000,
  },
];

export const getOrganizationById = (id: string): OrganizationInfo | undefined => {
  return organizationsData.find(org => org.id === id);
};
