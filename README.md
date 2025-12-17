# Zodiac Aura Mirror

A mobile-optimized web app that guides users through a visual quiz or birth chart input to reveal their Zodiac Goddess identity.

## Features

- ✨ **Start Screen**: Animated logo with "Begin Aura Reveal" CTA
- 🎯 **Personality Quiz**: 10 questions with multiple choice answers
- 📅 **Birth Chart Input**: Alternative path using date/time/location
- 🔮 **12 Zodiac Goddess Archetypes**: Unique descriptions, traits, and power phrases
- 🌟 **Animated Aura Reveal**: Glowing zodiac symbols with smooth animations
- 📸 **Shareable Images**: Generate downloadable wallpapers
- 🔒 **Unlock Bonus**: Email/referral gated features
- 📱 **Social Sharing**: TikTok, Instagram Stories, Reels, Twitter, Facebook
- 💎 **Affiliate Integration**: Referral-based crystal pack unlock

## Tech Stack

- **Next.js 14** (React framework)
- **TypeScript** (type safety)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **html2canvas** (image generation)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main app router
│   └── globals.css         # Global styles
├── components/
│   ├── StartScreen.tsx     # Initial landing screen
│   ├── QuizScreen.tsx      # Personality quiz flow
│   ├── BirthChartScreen.tsx # Birth chart input
│   ├── ResultScreen.tsx    # Aura reveal and results
│   ├── ShareButtons.tsx    # Social sharing buttons
│   └── UnlockModal.tsx     # Email/referral unlock modal
├── data/
│   ├── zodiacGoddesses.ts  # 12 goddess archetypes data
│   └── quizQuestions.ts    # Quiz questions and scoring
└── types/
    └── index.ts            # TypeScript type definitions
```

## Design

The app follows a dreamy, mystic aesthetic:
- Dark background (#0a0a12)
- Glowing gradients (purple, pink, blue)
- Soft motion animations
- 9:16 mobile-first viewport
- Smooth transitions and hover effects

## Customization

### Adding AI-Generated Images

To integrate AI-generated images, modify `ResultScreen.tsx` to call your image generation API:

```typescript
const generateAIImage = async (goddess: ZodiacGoddess) => {
  const response = await fetch('/api/generate-image', {
    method: 'POST',
    body: JSON.stringify({ goddess: goddess.sign }),
  });
  return response.json();
};
```

### Affiliate Links

Update the affiliate URL in `UnlockModal.tsx`:

```typescript
const affiliateUrl = 'https://your-affiliate-link.com/crystal-pack?ref=zodiac-aura';
```

### Email Collection

The email submission currently logs to console. To save emails, integrate with your backend:

```typescript
await fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify({ email, goddess: goddess.sign }),
});
```

## Build for Production

```bash
npm run build
npm start
```

## Mobile Optimization

The app is optimized for mobile (9:16 aspect ratio) with:
- Touch-friendly button sizes
- Smooth scroll performance
- Responsive text scaling
- Optimized image generation

