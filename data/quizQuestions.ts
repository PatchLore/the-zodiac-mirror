export interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    text: string;
    scores: Record<string, number>;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'When facing a challenge, you...',
    answers: [
      { text: 'Charge ahead fearlessly', scores: { aries: 3, leo: 2, sagittarius: 2 } },
      { text: 'Plan carefully and execute', scores: { virgo: 3, capricorn: 3, taurus: 2 } },
      { text: 'Seek creative solutions', scores: { gemini: 3, aquarius: 2, libra: 2 } },
      { text: 'Follow your intuition', scores: { cancer: 3, pisces: 3, scorpio: 2 } },
    ],
  },
  {
    id: 2,
    question: 'Your ideal Friday night is...',
    answers: [
      { text: 'An epic adventure or party', scores: { sagittarius: 3, aries: 2, leo: 2 } },
      { text: 'Cozy night in with loved ones', scores: { cancer: 3, taurus: 2, pisces: 2 } },
      { text: 'Trying something new and exciting', scores: { gemini: 3, aquarius: 2, libra: 2 } },
      { text: 'Working on a passion project', scores: { virgo: 3, capricorn: 3, scorpio: 2 } },
    ],
  },
  {
    id: 3,
    question: 'In relationships, you value...',
    answers: [
      { text: 'Independence and freedom', scores: { aquarius: 3, sagittarius: 2, aries: 2 } },
      { text: 'Security and stability', scores: { taurus: 3, capricorn: 3, cancer: 2 } },
      { text: 'Deep emotional connection', scores: { scorpio: 3, pisces: 3, cancer: 2 } },
      { text: 'Harmony and balance', scores: { libra: 3, virgo: 2, gemini: 2 } },
    ],
  },
  {
    id: 4,
    question: 'Your communication style is...',
    answers: [
      { text: 'Direct and bold', scores: { aries: 3, scorpio: 2, leo: 2 } },
      { text: 'Thoughtful and analytical', scores: { virgo: 3, capricorn: 2, aquarius: 2 } },
      { text: 'Expressive and animated', scores: { gemini: 3, leo: 2, sagittarius: 2 } },
      { text: 'Diplomatic and graceful', scores: { libra: 3, pisces: 2, cancer: 2 } },
    ],
  },
  {
    id: 5,
    question: 'When stressed, you tend to...',
    answers: [
      { text: 'Take action immediately', scores: { aries: 3, leo: 2, sagittarius: 2 } },
      { text: 'Retreat and process alone', scores: { cancer: 3, scorpio: 3, pisces: 2 } },
      { text: 'Analyze the situation thoroughly', scores: { virgo: 3, capricorn: 2, aquarius: 2 } },
      { text: 'Talk it through with others', scores: { gemini: 3, libra: 2, aquarius: 2 } },
    ],
  },
  {
    id: 6,
    question: 'Your greatest strength is...',
    answers: [
      { text: 'Leadership and courage', scores: { leo: 3, aries: 2, capricorn: 2 } },
      { text: 'Intuition and empathy', scores: { pisces: 3, cancer: 3, scorpio: 2 } },
      { text: 'Intellect and innovation', scores: { aquarius: 3, gemini: 2, virgo: 2 } },
      { text: 'Creativity and expression', scores: { libra: 3, sagittarius: 2, gemini: 2 } },
    ],
  },
  {
    id: 7,
    question: 'You feel most powerful when...',
    answers: [
      { text: 'Leading others toward a goal', scores: { leo: 3, aries: 2, capricorn: 2 } },
      { text: 'Helping and nurturing others', scores: { virgo: 3, cancer: 2, pisces: 2 } },
      { text: 'Creating something beautiful', scores: { libra: 3, taurus: 2, pisces: 2 } },
      { text: 'Transforming and evolving', scores: { scorpio: 3, aquarius: 2, sagittarius: 2 } },
    ],
  },
  {
    id: 8,
    question: 'Your dream life includes...',
    answers: [
      { text: 'Adventure and exploration', scores: { sagittarius: 3, aries: 2, aquarius: 2 } },
      { text: 'Luxury and comfort', scores: { taurus: 3, libra: 2, leo: 2 } },
      { text: 'Purpose and achievement', scores: { capricorn: 3, virgo: 2, scorpio: 2 } },
      { text: 'Connection and depth', scores: { cancer: 3, pisces: 2, scorpio: 2 } },
    ],
  },
  {
    id: 9,
    question: 'In conflict, you...',
    answers: [
      { text: 'Confront it head-on', scores: { aries: 3, leo: 2, scorpio: 2 } },
      { text: 'Seek compromise and balance', scores: { libra: 3, gemini: 2, aquarius: 2 } },
      { text: 'Observe and analyze first', scores: { virgo: 3, capricorn: 2, scorpio: 2 } },
      { text: 'Feel it deeply and retreat', scores: { cancer: 3, pisces: 2, taurus: 2 } },
    ],
  },
  {
    id: 10,
    question: 'Your spiritual connection is through...',
    answers: [
      { text: 'Action and will', scores: { aries: 3, leo: 2, sagittarius: 2 } },
      { text: 'Nature and the physical world', scores: { taurus: 3, virgo: 2, capricorn: 2 } },
      { text: 'Ideas and cosmic consciousness', scores: { aquarius: 3, gemini: 2, libra: 2 } },
      { text: 'Emotion and intuition', scores: { cancer: 3, scorpio: 2, pisces: 3 } },
    ],
  },
];

export function calculateQuizResult(answers: number[]): string {
  const scores: Record<string, number> = {
    aries: 0, taurus: 0, gemini: 0, cancer: 0,
    leo: 0, virgo: 0, libra: 0, scorpio: 0,
    sagittarius: 0, capricorn: 0, aquarius: 0, pisces: 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const question = quizQuestions[questionIndex];
    const answer = question.answers[answerIndex];
    Object.entries(answer.scores).forEach(([sign, score]) => {
      scores[sign] += score;
    });
  });

  let maxScore = 0;
  let resultSign = 'aries';
  Object.entries(scores).forEach(([sign, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultSign = sign;
    }
  });

  return resultSign;
}

