export type FurPattern = 'solid' | 'pointed' | 'bicolor' | 'tabby' | 'shaded';

export interface Breed {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  origin: string;
  temperament: string[];
  /** Default fur color (hex) */
  fur: string;
  /** Secondary / belly / point color */
  accent: string;
  eyeColor: string;
  pattern: FurPattern;
  /** Body scale: fluffiness / bulk */
  fluff: number;
  earSize: number;
  faceRoundness: number;
}

export const BREEDS: Breed[] = [
  {
    id: 'ragdoll',
    name: '布偶猫',
    nameEn: 'Ragdoll',
    tagline: '温柔巨人，抱起来像布偶',
    description:
      '布偶猫体型硕大、性格温顺，被抱起时常全身放松，因此得名。毛质柔顺，面部多为重点色，蓝眼睛是标志特征。',
    origin: '美国 · 1960s',
    temperament: ['温顺', '粘人', '安静'],
    fur: '#f2ebe3',
    accent: '#c4a484',
    eyeColor: '#5b8def',
    pattern: 'pointed',
    fluff: 1.15,
    earSize: 0.95,
    faceRoundness: 1.1,
  },
  {
    id: 'golden',
    name: '金渐层',
    nameEn: 'Golden Shaded',
    tagline: '阳光落在绒毛上的颜色',
    description:
      '金渐层以暖金色被毛与浅色底绒闻名，在光线下呈现由深到浅的渐变层次，眼神多为翠绿或蓝绿。',
    origin: '英国短毛衍生色',
    temperament: ['粘人', '活泼', '亲人'],
    fur: '#e8b86d',
    accent: '#f7e6c4',
    eyeColor: '#3cb371',
    pattern: 'shaded',
    fluff: 1.05,
    earSize: 0.9,
    faceRoundness: 1.2,
  },
  {
    id: 'british-shorthair',
    name: '英短蓝猫',
    nameEn: 'British Shorthair',
    tagline: '圆脸、厚垫、英伦绅士',
    description:
      '英国短毛猫脸圆体壮，蓝灰色被毛最为经典。性格沉稳独立，适合陪伴型家庭。',
    origin: '英国',
    temperament: ['沉稳', '独立', '忠诚'],
    fur: '#8a9aab',
    accent: '#b8c4d0',
    eyeColor: '#d4a017',
    pattern: 'solid',
    fluff: 1.2,
    earSize: 0.85,
    faceRoundness: 1.25,
  },
  {
    id: 'siamese',
    name: '暹罗猫',
    nameEn: 'Siamese',
    tagline: '重点色与高音量的优雅',
    description:
      '暹罗猫身形修长，面部、耳、爪、尾为深色重点色，蓝眼睛锐利。性格外向爱叫，互动感极强。',
    origin: '泰国',
    temperament: ['外向', '聪明', '话痨'],
    fur: '#f5f0e8',
    accent: '#5c4033',
    eyeColor: '#4a90d9',
    pattern: 'pointed',
    fluff: 0.85,
    earSize: 1.25,
    faceRoundness: 0.85,
  },
  {
    id: 'american-shorthair',
    name: '美短虎斑',
    nameEn: 'American Shorthair',
    tagline: '经典银虎斑的街头英雄',
    description:
      '美国短毛猫以银虎斑最为人熟知，体格结实、适应性强，是典型的「家庭好搭档」。',
    origin: '美国',
    temperament: ['友好', '适应强', '活泼'],
    fur: '#c9cdd3',
    accent: '#4a4f57',
    eyeColor: '#6b8e23',
    pattern: 'tabby',
    fluff: 1.0,
    earSize: 1.0,
    faceRoundness: 1.0,
  },
  {
    id: 'maine-coon',
    name: '缅因猫',
    nameEn: 'Maine Coon',
    tagline: '北美森林里的温柔巨人',
    description:
      '缅因猫是体型最大的家猫之一，耳尖常有簇毛，尾巴蓬松如扫帚。性格友善、好奇心强。',
    origin: '美国缅因州',
    temperament: ['友善', '好奇', '温厚'],
    fur: '#b8956c',
    accent: '#5c4033',
    eyeColor: '#c4a35a',
    pattern: 'tabby',
    fluff: 1.35,
    earSize: 1.15,
    faceRoundness: 0.95,
  },
  {
    id: 'persian',
    name: '波斯猫',
    nameEn: 'Persian',
    tagline: '扁脸长毛的宫廷风',
    description:
      '波斯猫以扁平面孔与华丽长毛著称，气质高贵安静，需要定期梳毛护理。',
    origin: '伊朗 / 欧洲培育',
    temperament: ['安静', '优雅', '粘人'],
    fur: '#f7f2ec',
    accent: '#e8d5c4',
    eyeColor: '#6bbf59',
    pattern: 'solid',
    fluff: 1.4,
    earSize: 0.75,
    faceRoundness: 1.3,
  },
  {
    id: 'bengal',
    name: '孟加拉豹猫',
    nameEn: 'Bengal',
    tagline: '野生斑纹落在家猫身上',
    description:
      '孟加拉豹猫拥有接近野生豹猫的玫瑰斑或大理石纹，精力充沛、爱玩水，运动需求高。',
    origin: '美国杂交培育',
    temperament: ['精力旺盛', '聪明', '爱玩'],
    fur: '#d4a574',
    accent: '#3d2914',
    eyeColor: '#c9a227',
    pattern: 'tabby',
    fluff: 0.9,
    earSize: 1.05,
    faceRoundness: 0.9,
  },
];

export const FUR_PRESETS = [
  { id: 'cream', label: '奶油', color: '#f2ebe3' },
  { id: 'golden', label: '金色', color: '#e8b86d' },
  { id: 'blue', label: '蓝灰', color: '#8a9aab' },
  { id: 'chocolate', label: '巧克力', color: '#5c4033' },
  { id: 'silver', label: '银灰', color: '#c9cdd3' },
  { id: 'orange', label: '橘', color: '#e07a3d' },
  { id: 'black', label: '黑色', color: '#2a2a2a' },
  { id: 'white', label: '白色', color: '#f8f6f2' },
];
