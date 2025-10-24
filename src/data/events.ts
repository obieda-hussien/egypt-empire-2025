import { EventType } from '../types/game';

export interface EventTemplate {
  type: EventType;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  choices: Array<{
    text: string;
    textAr: string;
    effects: {
      treasury?: number;
      happiness?: number;
      popularity?: number;
      relations?: { [key: string]: number };
      resources?: { [key: string]: number };
    };
  }>;
  probability: number;
  conditions?: {
    minHappiness?: number;
    maxHappiness?: number;
    minTreasury?: number;
    minYear?: number;
  };
}

export const eventTemplates: EventTemplate[] = [
  // Economic Events
  {
    type: 'economic',
    title: 'Oil Price Surge',
    titleAr: 'ارتفاع أسعار النفط',
    description: 'Global oil prices have increased dramatically, boosting Egypt\'s oil revenues.',
    descriptionAr: 'ارتفعت أسعار النفط العالمية بشكل كبير، مما يعزز إيرادات مصر النفطية.',
    choices: [
      {
        text: 'Increase production to maximize profits',
        textAr: 'زيادة الإنتاج لتعظيم الأرباح',
        effects: {
          treasury: 5000000000,
          resources: { oil: 1000 },
        },
      },
      {
        text: 'Maintain current production levels',
        textAr: 'الحفاظ على مستويات الإنتاج الحالية',
        effects: {
          treasury: 2000000000,
        },
      },
    ],
    probability: 0.15,
  },
  {
    type: 'economic',
    title: 'Tourism Boom',
    titleAr: 'انتعاش السياحة',
    description: 'Tourist arrivals have increased by 40% this quarter!',
    descriptionAr: 'زادت أعداد السياح بنسبة 40٪ هذا الربع!',
    choices: [
      {
        text: 'Invest in tourism infrastructure',
        textAr: 'الاستثمار في البنية التحتية السياحية',
        effects: {
          treasury: -1000000000,
          happiness: 5,
        },
      },
      {
        text: 'Just enjoy the increased revenue',
        textAr: 'الاستمتاع بالإيرادات المتزايدة فقط',
        effects: {
          treasury: 3000000000,
        },
      },
    ],
    probability: 0.2,
  },
  {
    type: 'economic',
    title: 'Currency Devaluation',
    titleAr: 'تخفيض قيمة العملة',
    description: 'The Egyptian Pound has lost value against major currencies.',
    descriptionAr: 'فقد الجنيه المصري قيمته مقابل العملات الرئيسية.',
    choices: [
      {
        text: 'Use foreign reserves to stabilize',
        textAr: 'استخدام الاحتياطيات الأجنبية للاستقرار',
        effects: {
          treasury: -3000000000,
          happiness: 3,
        },
      },
      {
        text: 'Let market forces adjust',
        textAr: 'السماح لقوى السوق بالتعديل',
        effects: {
          happiness: -5,
          popularity: -3,
        },
      },
    ],
    probability: 0.12,
  },
  // Political Events
  {
    type: 'political',
    title: 'Mass Protests',
    titleAr: 'احتجاجات جماهيرية',
    description: 'Large protests have broken out demanding economic reforms.',
    descriptionAr: 'اندلعت احتجاجات كبيرة تطالب بإصلاحات اقتصادية.',
    choices: [
      {
        text: 'Dialogue with protesters and reform',
        textAr: 'الحوار مع المتظاهرين والإصلاح',
        effects: {
          treasury: -2000000000,
          happiness: 10,
          popularity: 5,
        },
      },
      {
        text: 'Increase security measures',
        textAr: 'زيادة الإجراءات الأمنية',
        effects: {
          happiness: -8,
          popularity: -5,
        },
      },
    ],
    probability: 0.1,
    conditions: {
      maxHappiness: 50,
    },
  },
  {
    type: 'political',
    title: 'Corruption Scandal',
    titleAr: 'فضيحة فساد',
    description: 'A major corruption scandal involving government officials has been exposed.',
    descriptionAr: 'تم الكشف عن فضيحة فساد كبيرة تورط فيها مسؤولون حكوميون.',
    choices: [
      {
        text: 'Launch full investigation',
        textAr: 'إطلاق تحقيق شامل',
        effects: {
          popularity: 8,
          happiness: 5,
        },
      },
      {
        text: 'Minimize the issue',
        textAr: 'تقليل أهمية القضية',
        effects: {
          popularity: -10,
          happiness: -8,
        },
      },
    ],
    probability: 0.08,
  },
  // Natural Disasters
  {
    type: 'natural_disaster',
    title: 'Nile Flooding',
    titleAr: 'فيضان النيل',
    description: 'Heavy rains have caused the Nile to flood, affecting agricultural areas.',
    descriptionAr: 'تسببت الأمطار الغزيرة في فيضان النيل، مما أثر على المناطق الزراعية.',
    choices: [
      {
        text: 'Emergency aid and evacuation',
        textAr: 'المساعدات الطارئة والإخلاء',
        effects: {
          treasury: -1500000000,
          happiness: 2,
          resources: { wheat: -500, rice: -300 },
        },
      },
      {
        text: 'Limited response',
        textAr: 'استجابة محدودة',
        effects: {
          treasury: -500000000,
          happiness: -5,
          resources: { wheat: -1000, rice: -600 },
        },
      },
    ],
    probability: 0.05,
  },
  {
    type: 'natural_disaster',
    title: 'Earthquake',
    titleAr: 'زلزال',
    description: 'An earthquake has struck, causing damage to infrastructure.',
    descriptionAr: 'ضرب زلزال، مما تسبب في أضرار للبنية التحتية.',
    choices: [
      {
        text: 'Immediate reconstruction efforts',
        textAr: 'جهود إعادة البناء الفورية',
        effects: {
          treasury: -3000000000,
          happiness: 3,
        },
      },
      {
        text: 'Gradual reconstruction',
        textAr: 'إعادة البناء التدريجي',
        effects: {
          treasury: -1000000000,
          happiness: -3,
        },
      },
    ],
    probability: 0.03,
  },
  // Opportunities
  {
    type: 'opportunity',
    title: 'Scientific Breakthrough',
    titleAr: 'اختراق علمي',
    description: 'Egyptian scientists have made a major breakthrough in renewable energy!',
    descriptionAr: 'حقق علماء مصريون اختراقًا كبيرًا في مجال الطاقة المتجددة!',
    choices: [
      {
        text: 'Invest heavily in research',
        textAr: 'الاستثمار بكثافة في البحث',
        effects: {
          treasury: -2000000000,
          popularity: 10,
          happiness: 8,
        },
      },
      {
        text: 'Acknowledge but limited funding',
        textAr: 'الاعتراف ولكن تمويل محدود',
        effects: {
          popularity: 3,
          happiness: 2,
        },
      },
    ],
    probability: 0.05,
  },
  {
    type: 'opportunity',
    title: 'Archaeological Discovery',
    titleAr: 'اكتشاف أثري',
    description: 'A major archaeological discovery has been made in Luxor!',
    descriptionAr: 'تم اكتشاف أثري كبير في الأقصر!',
    choices: [
      {
        text: 'Promote internationally',
        textAr: 'الترويج دولياً',
        effects: {
          treasury: -500000000,
          happiness: 10,
          resources: { tourism: 500 },
        },
      },
      {
        text: 'Local announcement only',
        textAr: 'إعلان محلي فقط',
        effects: {
          happiness: 5,
          resources: { tourism: 200 },
        },
      },
    ],
    probability: 0.1,
  },
  // International Events
  {
    type: 'international',
    title: 'Trade Deal Opportunity',
    titleAr: 'فرصة صفقة تجارية',
    description: 'A major economic power wants to establish a trade agreement with Egypt.',
    descriptionAr: 'قوة اقتصادية كبرى تريد إبرام اتفاقية تجارية مع مصر.',
    choices: [
      {
        text: 'Accept the deal',
        textAr: 'قبول الصفقة',
        effects: {
          treasury: 5000000000,
          happiness: 5,
        },
      },
      {
        text: 'Negotiate better terms',
        textAr: 'التفاوض على شروط أفضل',
        effects: {
          treasury: 3000000000,
          popularity: 3,
        },
      },
      {
        text: 'Decline',
        textAr: 'رفض',
        effects: {
          popularity: -2,
        },
      },
    ],
    probability: 0.15,
  },
  {
    type: 'international',
    title: 'Regional Conflict',
    titleAr: 'صراع إقليمي',
    description: 'A conflict has erupted in a neighboring country. Refugees are seeking entry.',
    descriptionAr: 'اندلع صراع في دولة مجاورة. لاجئون يسعون للدخول.',
    choices: [
      {
        text: 'Open borders and provide aid',
        textAr: 'فتح الحدود وتقديم المساعدات',
        effects: {
          treasury: -3000000000,
          happiness: -3,
          popularity: 5,
          relations: { libya: 10, sudan: 10 },
        },
      },
      {
        text: 'Limited acceptance',
        textAr: 'قبول محدود',
        effects: {
          treasury: -1000000000,
          happiness: -1,
        },
      },
      {
        text: 'Close borders',
        textAr: 'إغلاق الحدود',
        effects: {
          happiness: 2,
          relations: { libya: -5, sudan: -5 },
        },
      },
    ],
    probability: 0.1,
  },
];

export const getRandomEvent = (
  currentHappiness: number,
  currentTreasury: number,
  yearsInPower: number
): EventTemplate | null => {
  const eligibleEvents = eventTemplates.filter(event => {
    if (event.conditions) {
      if (event.conditions.minHappiness && currentHappiness < event.conditions.minHappiness) {
        return false;
      }
      if (event.conditions.maxHappiness && currentHappiness > event.conditions.maxHappiness) {
        return false;
      }
      if (event.conditions.minTreasury && currentTreasury < event.conditions.minTreasury) {
        return false;
      }
      if (event.conditions.minYear && yearsInPower < event.conditions.minYear) {
        return false;
      }
    }
    return Math.random() < event.probability;
  });

  if (eligibleEvents.length === 0) return null;
  
  return eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
};
