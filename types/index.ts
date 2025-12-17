export type ZodiacSign = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export interface ZodiacGoddess {
  sign: ZodiacSign;
  name: string;
  symbol: string;
  auraColor: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  traits: string[];
  powerPhrase: string;
  description: string;
  gradient: string;
}

export interface QuizAnswer {
  questionId: number;
  answerIndex: number;
  score: number;
}

export interface BirthChart {
  date: string;
  time: string;
  location: string;
}

