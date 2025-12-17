import { ZodiacGoddess } from '@/types';

export const zodiacGoddesses: Record<string, ZodiacGoddess> = {
  aries: {
    sign: 'aries',
    name: 'The Warrior Empress',
    symbol: '♈',
    auraColor: 'Fiery Crimson',
    element: 'fire',
    traits: ['Bold', 'Passionate', 'Independent', 'Courageous'],
    powerPhrase: 'I am the fire that ignites change',
    description: 'A fearless leader whose blazing spirit lights the path for others. Your fiery aura radiates courage and unstoppable determination.',
    gradient: 'from-red-600 via-pink-600 to-orange-500',
  },
  taurus: {
    sign: 'taurus',
    name: 'The Earthly Sovereign',
    symbol: '♉',
    auraColor: 'Emerald Green',
    element: 'earth',
    traits: ['Grounded', 'Sensual', 'Patient', 'Luxurious'],
    powerPhrase: 'I am abundance made manifest',
    description: 'Rooted in earthly wisdom, you embody stability and sensuality. Your verdant aura attracts prosperity and deep fulfillment.',
    gradient: 'from-green-600 via-emerald-500 to-teal-400',
  },
  gemini: {
    sign: 'gemini',
    name: 'The Twin Oracle',
    symbol: '♊',
    auraColor: 'Brilliant Yellow',
    element: 'air',
    traits: ['Curious', 'Adaptable', 'Witty', 'Communicative'],
    powerPhrase: 'I am the dance of duality',
    description: 'Dual-natured and endlessly curious, you weave magic through words and ideas. Your golden aura sparkles with infinite possibility.',
    gradient: 'from-yellow-400 via-amber-500 to-orange-400',
  },
  cancer: {
    sign: 'cancer',
    name: 'The Lunar Guardian',
    symbol: '♋',
    auraColor: 'Silvery Moonlight',
    element: 'water',
    traits: ['Intuitive', 'Nurturing', 'Emotional', 'Protective'],
    powerPhrase: 'I am the keeper of sacred waters',
    description: 'Guided by the moon, you protect what matters most with tender strength. Your silvery aura flows with deep emotion and intuition.',
    gradient: 'from-slate-400 via-blue-400 to-indigo-500',
  },
  leo: {
    sign: 'leo',
    name: 'The Solar Queen',
    symbol: '♌',
    auraColor: 'Golden Sunlight',
    element: 'fire',
    traits: ['Radiant', 'Generous', 'Confident', 'Dramatic'],
    powerPhrase: 'I am the light that others seek',
    description: 'Born to shine, your golden presence illuminates every room. Your solar aura commands attention and inspires greatness.',
    gradient: 'from-yellow-500 via-orange-400 to-amber-600',
  },
  virgo: {
    sign: 'virgo',
    name: 'The Sacred Weaver',
    symbol: '♍',
    auraColor: 'Pearlescent White',
    element: 'earth',
    traits: ['Precise', 'Analytical', 'Service-Oriented', 'Pure'],
    powerPhrase: 'I am perfection through practice',
    description: 'Master of detail and refinement, you transform chaos into order. Your pearlescent aura radiates purity and purposeful intention.',
    gradient: 'from-gray-200 via-purple-200 to-indigo-200',
  },
  libra: {
    sign: 'libra',
    name: 'The Harmonious Judge',
    symbol: '♎',
    auraColor: 'Rose Gold',
    element: 'air',
    traits: ['Balanced', 'Diplomatic', 'Aesthetic', 'Just'],
    powerPhrase: 'I am beauty in perfect balance',
    description: 'Seeker of harmony and beauty, you bring grace to every encounter. Your rose gold aura emanates elegance and fair judgment.',
    gradient: 'from-pink-400 via-rose-500 to-purple-400',
  },
  scorpio: {
    sign: 'scorpio',
    name: 'The Mystic Transformer',
    symbol: '♏',
    auraColor: 'Deep Magenta',
    element: 'water',
    traits: ['Intense', 'Mysterious', 'Transformative', 'Powerful'],
    powerPhrase: 'I am death and rebirth',
    description: 'Keeper of secrets and depths, you transmute pain into power. Your magenta aura pulses with profound transformation.',
    gradient: 'from-purple-900 via-fuchsia-700 to-red-800',
  },
  sagittarius: {
    sign: 'sagittarius',
    name: 'The Wild Wanderer',
    symbol: '♐',
    auraColor: 'Vibrant Turquoise',
    element: 'fire',
    traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Free'],
    powerPhrase: 'I am the arrow of truth',
    description: 'Boundless explorer of worlds and wisdom, you seek truth beyond horizons. Your turquoise aura radiates freedom and expansive joy.',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
  },
  capricorn: {
    sign: 'capricorn',
    name: 'The Mountain Monarch',
    symbol: '♑',
    auraColor: 'Deep Brown & Gold',
    element: 'earth',
    traits: ['Ambitious', 'Disciplined', 'Resilient', 'Wise'],
    powerPhrase: 'I am the peak that others climb',
    description: 'Climber of highest peaks, you build lasting legacies with unwavering focus. Your earthy aura grounds all in wisdom and achievement.',
    gradient: 'from-amber-800 via-brown-700 to-yellow-700',
  },
  aquarius: {
    sign: 'aquarius',
    name: 'The Cosmic Revolutionary',
    symbol: '♒',
    auraColor: 'Electric Blue',
    element: 'air',
    traits: ['Innovative', 'Humanitarian', 'Eccentric', 'Visionary'],
    powerPhrase: 'I am the future made present',
    description: 'Rebel with a cause, you envision a better world and make it real. Your electric aura crackles with innovation and revolutionary spirit.',
    gradient: 'from-blue-400 via-cyan-500 to-teal-400',
  },
  pisces: {
    sign: 'pisces',
    name: 'The Ocean Dreamer',
    symbol: '♓',
    auraColor: 'Mystical Lavender',
    element: 'water',
    traits: ['Empathetic', 'Imaginative', 'Spiritual', 'Boundless'],
    powerPhrase: 'I am the dream that flows through all',
    description: 'Connected to all souls, you flow between realms of reality and dreams. Your lavender aura shimmers with infinite compassion and mysticism.',
    gradient: 'from-purple-400 via-pink-400 to-blue-500',
  },
};

export function getZodiacFromDate(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}

