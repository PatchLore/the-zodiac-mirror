export interface GoddessProfile {
  sign: string;
  title: string;
  auraGradient: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  traits: string[];
  powerPhrase: string;
  description: string;
  images: string[];
}

export const goddessProfiles: GoddessProfile[] = [
  {
    sign: 'aries',
    title: 'The Flameborn Goddess',
    auraGradient: 'Crimson to glowing gold gradient',
    element: 'fire',
    traits: ['Bold', 'Fearless', 'Passionate', 'Dynamic', 'Leader'],
    powerPhrase: 'I ignite paths no one dares to walk.',
    description: 'She is the first spark — a living flame who charges forward with fearless will. Her aura burns away doubt and awakens action wherever it moves.',
    images: ['/Signs/Aries.jpg'],
  },
  {
    sign: 'taurus',
    title: 'The Earthbloom Goddess',
    auraGradient: 'Soft green to rose-gold shimmer',
    element: 'earth',
    traits: ['Grounded', 'Sensual', 'Patient', 'Loyal', 'Abundant'],
    powerPhrase: 'I root myself in beauty and grow endlessly.',
    description: 'She embodies sacred stillness and earthly pleasure — a living garden in bloom. Her aura soothes and strengthens all it touches.',
    images: ['/Signs/Taurus.jpg'],
  },
  {
    sign: 'gemini',
    title: 'The Twinlight Goddess',
    auraGradient: 'Golden-yellow and electric blue split glow',
    element: 'air',
    traits: ['Curious', 'Expressive', 'Clever', 'Playful', 'Adaptable'],
    powerPhrase: 'I speak in mirrors and move with meaning.',
    description: 'Dual in spirit, her mind weaves light and language into shape. Her aura shimmers with infinite perspectives and playful truth.',
    images: ['/Signs/Gemini.jpg'],
  },
  {
    sign: 'cancer',
    title: 'The Moonveil Goddess',
    auraGradient: 'Pale silver and moonlit aqua',
    element: 'water',
    traits: ['Intuitive', 'Protective', 'Nurturing', 'Dreamy', 'Empathic'],
    powerPhrase: 'I am the tide that remembers everything.',
    description: 'Cloaked in starlight and sea-mist, she moves between emotion and moonlight. Her aura is a sanctuary, soft and strong.',
    images: ['/Signs/Cancer.jpg'],
  },
  {
    sign: 'leo',
    title: 'The Solar Flame Goddess',
    auraGradient: 'Radiant gold and ember-orange',
    element: 'fire',
    traits: ['Charismatic', 'Proud', 'Warm', 'Creative', 'Magnetic'],
    powerPhrase: 'I blaze with joy, and the world responds.',
    description: 'Crowned in sunlight, she radiates heart-centered fire. Her aura inspires loyalty, love, and luminous expression.',
    images: ['/Signs/Leo.jpg'],
  },
  {
    sign: 'virgo',
    title: 'The Crystallight Goddess',
    auraGradient: 'White light with pale green sparkles',
    element: 'earth',
    traits: ['Precise', 'Gentle', 'Observant', 'Purifying', 'Wise'],
    powerPhrase: 'I bring order to chaos with sacred care.',
    description: 'Her glow is clean and subtle — a crystalline rhythm that heals and refines. She sees meaning in every detail.',
    images: ['/Signs/Virgo.jpg'],
  },
  {
    sign: 'libra',
    title: 'The Harmonic Veil Goddess',
    auraGradient: 'Rose-gold and violet balance',
    element: 'air',
    traits: ['Graceful', 'Diplomatic', 'Romantic', 'Idealistic', 'Fair'],
    powerPhrase: 'I balance light and shadow with elegance.',
    description: 'She walks between symmetry and soul. Her aura is a living dance of contrast, beauty, and truth.',
    images: ['/Signs/Libra.jpg'],
  },
  {
    sign: 'scorpio',
    title: 'The Shadow Flame Goddess',
    auraGradient: 'Deep violet and crimson-black glow',
    element: 'water',
    traits: ['Intense', 'Transformative', 'Mysterious', 'Loyal', 'Empowering'],
    powerPhrase: 'I burn, I break, I rise.',
    description: 'She is the serpent of rebirth, wrapped in passion and power. Her aura is both danger and desire — pure alchemy.',
    images: ['/Signs/Scorpio.jpg'],
  },
  {
    sign: 'sagittarius',
    title: 'The Celestial Archer Goddess',
    auraGradient: 'Indigo and fiery orange spark',
    element: 'fire',
    traits: ['Free', 'Bold', 'Visionary', 'Adventurous', 'Honest'],
    powerPhrase: 'I aim beyond stars and speak in fire.',
    description: 'She carries the infinite horizon in her eyes. Her aura blazes trails through philosophy, passion, and sky.',
    images: ['/Signs/Sagittarius.jpg', '/Signs/Sagittarius2.jpg'],
  },
  {
    sign: 'capricorn',
    title: 'The Earthlight Goddess',
    auraGradient: 'Silvery stone and soft gold cracks',
    element: 'earth',
    traits: ['Disciplined', 'Enduring', 'Noble', 'Wise', 'Composed'],
    powerPhrase: 'I ascend with purpose and patience.',
    description: 'She rises like the mountain itself — carved from time and silence. Her aura hums with legacy and grounded light.',
    images: ['/Signs/Capricorn.jpg'],
  },
  {
    sign: 'aquarius',
    title: 'The Starlit Wave Goddess',
    auraGradient: 'Electric violet and shimmering aqua',
    element: 'air',
    traits: ['Visionary', 'Independent', 'Eccentric', 'Inventive', 'Cool'],
    powerPhrase: 'I pour light into futures unknown.',
    description: 'She is starlight in motion — the vessel of awakening. Her aura ripples with innovation and unshaken clarity.',
    images: ['/Signs/Aquarius.jpg'],
  },
  {
    sign: 'pisces',
    title: 'The Dreamtide Goddess',
    auraGradient: 'Lavender mist and deep ocean teal',
    element: 'water',
    traits: ['Mystical', 'Compassionate', 'Imaginative', 'Emotional', 'Fluid'],
    powerPhrase: 'I dissolve into dreams and return as light.',
    description: 'Drifting between realms, she speaks in waves and visions. Her aura carries healing and endings reborn.',
    images: ['/Signs/Pisces.jpg'],
  },
];

