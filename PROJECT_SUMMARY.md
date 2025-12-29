# The Zodiac Mirror — Complete Project Summary

## Overview

**The Zodiac Mirror** is a calm, mobile-first web application that guides users through a reflective experience to discover their zodiac goddess archetype. Built with Next.js 14, TypeScript, and Tailwind CSS, the app emphasizes presence over prediction, recognition over transformation, and stillness over stimulation.

**Core Philosophy:** The app is a reflective surface designed to show users something they already carry, not tell them what will happen. It intentionally avoids gamification, urgency, and addictive patterns.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Image Processing:** html2canvas (for wallpaper export)
- **Canvas API:** HTML5 Canvas (for persistent watermarking)
- **Analytics:** Vercel Analytics
- **Payment:** PayPal Hosted Buttons
- **Deployment:** Vercel (via GitHub)

---

## Core Features

### 1. Homepage (`/`)
- **Animated landing screen** with mystical aesthetic
- **Three entry paths:**
  - Explore Your Zodiac Aura (Quiz or Birth Chart)
  - Browse the Zodiac Goddess Collection
  - Commission a Personalised Portrait
- **Returning user support:** Detects saved reflections and offers to revisit
- **Optional name input** for personalization
- Animated stars, gradient backgrounds, and smooth transitions

### 2. Personality Quiz (`/` → Quiz Path)
- **10-question personality assessment**
- Multiple-choice answers with weighted scoring
- Progress bar and smooth question transitions
- Calculates zodiac goddess alignment based on responses
- **Scoring system:** Each answer contributes points to different zodiac signs; highest score determines result

### 3. Birth Chart Input (`/` → Birth Chart Path)
- **Date-based zodiac calculation**
- Optional birth time and location fields
- Direct mapping to zodiac sign goddess
- Clean, form-based interface

### 4. Result Screen (`/` → Result)
The core experience where users receive their reflection:

#### **Result Display:**
- **Goddess image** (randomly selected from available images per sign)
- **Animated zodiac symbol** with glowing effects
- **Personalized title** (e.g., "Sarah, you are aligned with The Flameborn Goddess")
- **Aura gradient description** and element
- **Power phrase** (quotable, copyable)
- **Traits** displayed as badges
- **Full description** of the archetype
- **Note for quiz results:** Clarifies this may not match their zodiac sign but reflects soul resonance

#### **Actions Available:**
- **Download Wallpaper:** Generates a 1080x1920px (2x scale = 2160x3840px) wallpaper using `html2canvas`
- **Copy Reflection:** Copies the power phrase to clipboard
- **Share:** Opens share sheet with download, caption copy, and link copy options
- **View Prints & Posters:** Links to poster collection page
- **Create My Portrait:** Scrolls to portrait commission section
- **Sit With This Reflection:** Scrolls back to result card
- **Compare with Birth Sign:** If quiz result differs from birth sign, offers to view birth sign goddess

#### **Portrait Commission Section:**
- **Product:** Personalised Portrait — Zodiac Mirror (£35.00 GBP)
- **Includes:**
  - Personalised portrait image
  - Short living portrait (5–7s looping MP4 with subtle aura motion)
  - Curated soundtrack of 10 tracks
- **PayPal integration** for payment
- **Email-based workflow:** Users send photo to `zodiacaura@mail.com` with attunement questions
- **Terms link** to portrait terms page

#### **Feedback Section (Quiz Only):**
- Asks if result matched their sign
- Options: "Yes, it matched", "No, but it feels right", "Not sure — I want to explore more"

#### **Reflection Persistence:**
- Automatically saves reflection to `localStorage` when result is shown
- Includes goddess data, userName, resultSource, birthSign, and timestamp
- Allows users to revisit their reflection on return visits

### 5. Posters Page (`/posters`)
- **12-sign Zodiac Goddess poster collection**
- **2-column grid** displaying all 12 signs
- **Watermarked thumbnails:** Canvas-based watermarking ensures "ZODIAC MIRROR" text is baked into image pixels
- **Purchase CTA:** Links to Payhip for digital download collection
- **High-resolution digital downloads** (print-ready quality)
- Special handling for Sagittarius (uses `SagittariusBest.png`)

### 6. Portrait Page (`/portrait`)
- **Standalone portrait commission page**
- PayPal payment integration
- **Product details:** What's included, how it works, what happens next
- **Email workflow explanation**
- Links to portrait terms

### 7. Cards Page (`/cards`)
- **Zodiac Mirror Cards** introduction
- **2-column grid** of goddess card images
- **Mirror Cards section:** Explains reflective edition concept (in preparation)
- Framed as "quiet artifacts" and "objects you return to, not content you consume"
- Digital and physical editions in preparation

### 8. Legal & Info Pages
- **About (`/about`):** Explains the app's philosophy and purpose
- **FAQ (`/faq`):** Frequently asked questions
- **Privacy (`/privacy`):** Privacy policy
- **Terms (`/terms`):** Terms of service
- **Portrait Terms (`/portrait-terms`):** Specific terms for portrait commissions

---

## Key Components

### Core Screen Components
1. **`HomePage.tsx`** — Landing screen with entry paths
2. **`QuizScreen.tsx`** — 10-question personality quiz
3. **`BirthChartScreen.tsx`** — Birth date/time/location input
4. **`ResultScreen.tsx`** — Main result display with all actions

### Supporting Components
5. **`WatermarkedImage.tsx`** — Canvas-based image component with persistent watermark
   - Uses HTML5 Canvas to draw image + watermark as single pixel layer
   - Watermark: "ZODIAC MIRROR" centered, 20-25% of image width, 11% opacity
   - Ensures watermark persists when images are saved/exported
6. **`WallpaperCanvas.tsx`** — Dedicated 9:16 wallpaper layout for export
   - Renders at 1080x1920px (CSS)
   - Element-based tinting (fire, earth, air, water)
   - Includes portrait image, title, and power phrase
7. **`ShareSheet.tsx`** — Bottom sheet modal for sharing options
8. **`UnlockModal.tsx`** — Email/referral unlock modal (for future features)
9. **`ShareButtons.tsx`** — Social sharing buttons (TikTok, Instagram, etc.)
10. **`Watermark.tsx`** — CSS overlay watermark (deprecated in favor of canvas)

---

## Data Structure

### Zodiac Goddesses (`data/zodiacGoddesses.ts`)
- **12 goddess archetypes** with:
  - Sign, name, symbol, aura color, element
  - Traits array, power phrase, description
  - Gradient class for styling
- **`getZodiacFromDate()`** function for date-based calculation

### Goddess Profiles (`data/goddessProfiles.ts`)
- **Extended profiles** with:
  - Title, aura gradient description
  - Element, traits, power phrase, description
  - Images array (multiple images per sign)
- Used in ResultScreen for richer display

### Quiz Questions (`data/quizQuestions.ts`)
- **10 questions** with 4 answer options each
- **Weighted scoring system:** Each answer contributes points to different signs
- **`calculateQuizResult()`** function determines highest-scoring sign

### Reflection Storage (`lib/reflectionStorage.ts`)
- **localStorage-based persistence**
- Saves: goddess, userName, resultSource, birthSign, timestamp
- Functions: `saveReflection()`, `getSavedReflection()`, `clearReflection()`

---

## Technical Implementation Details

### Watermarking System
- **Problem Solved:** Watermarks must persist when images are saved/exported
- **Solution:** Canvas-based rendering in `WatermarkedImage.tsx`
- **Process:**
  1. Load image with `crossOrigin="anonymous"` for CORS
  2. Draw image onto canvas at container size
  3. Draw watermark text directly onto canvas pixels
  4. Canvas becomes the image source (watermark is baked in)
- **Watermark Spec:**
  - Text: "ZODIAC MIRROR"
  - Size: 20-25% of image width
  - Opacity: 11%
  - Color: White (rgba(255, 255, 255, 0.11))
  - Placement: Centered horizontally and vertically
  - Font: System sans-serif stack

### Wallpaper Export
- **Technology:** `html2canvas` library
- **Resolution:** 1080x1920px (CSS) exported at 2x scale = 2160x3840px
- **Process:**
  1. Hidden off-screen `WallpaperCanvas` component
  2. Waits for fonts and image loading
  3. Captures canvas as PNG
  4. Triggers download with descriptive filename
- **Layout:** Dedicated 9:16 portrait layout with element-based tinting

### State Management
- **Main app state** in `app/page.tsx`:
  - `currentScreen`: 'home' | 'quiz' | 'birthchart' | 'result'
  - `selectedGoddess`: Current goddess result
  - `birthSign`: User's birth sign (if different from result)
  - `userName`: Optional user name
  - `resultSource`: 'quiz' | 'birthchart'
  - `savedReflection`: Loaded from localStorage
- **Screen transitions** handled via callbacks
- **Reflection persistence** on result screen mount

### Responsive Design
- **Mobile-first:** Max width 450px container
- **9:16 aspect ratio** optimized for mobile portrait
- **Touch-friendly** button sizes and interactions
- **Smooth animations** with Framer Motion
- **High-DPI support** via `devicePixelRatio` in canvas

### Styling System
- **Tailwind CSS** with custom color palette
- **Mystic dark theme:** `#0a0a12` background
- **Purple/pink/blue gradients** throughout
- **Glassmorphism effects:** Backdrop blur, translucent borders
- **Glowing effects:** Drop shadows, gradient text
- **Custom CSS classes:** `.gradient-text`, `.glow-effect`, `.watermark-text`

---

## Monetization

### Primary Product: Personalised Portrait
- **Price:** £35.00 GBP
- **Payment:** PayPal Hosted Buttons
- **Includes:** Portrait image, living portrait (MP4), curated soundtrack
- **Workflow:** Email-based (users send photo + attunement questions)
- **Delivery:** Private email delivery

### Secondary Product: Poster Collection
- **Platform:** Payhip
- **Product:** Complete 12-sign digital poster collection
- **Watermarked previews** in gallery
- **High-resolution downloads** after purchase

### Future Monetization (Planned)
- **Mirror Credits** (soft currency)
- **Aura variations** (cosmetics)
- **Private collections**
- **Micro deepening** features

---

## User Experience Philosophy

### Design Principles
1. **Calm over urgency** — No timers, streaks, or FOMO
2. **Presence over prediction** — Reflects what is, not what will be
3. **Recognition over transformation** — Shows existing qualities
4. **Stillness over stimulation** — Quiet, intentional experience
5. **Depth over novelty** — Memorable, not addictive

### User Flow
1. **Landing** → Choose entry path (Quiz, Birth Chart, Browse, Commission)
2. **Discovery** → Complete quiz or enter birth details
3. **Reflection** → Receive goddess result with full details
4. **Engagement** → Download wallpaper, share, commission portrait, or revisit
5. **Return** → Saved reflection allows easy return

### Accessibility
- **Semantic HTML** and ARIA labels
- **Keyboard navigation** support
- **Focus states** on interactive elements
- **Alt text** for images
- **Screen reader** friendly structure

---

## File Structure

```
├── app/
│   ├── layout.tsx              # Root layout with footer, PayPal script
│   ├── page.tsx                # Main app router (screen state management)
│   ├── globals.css             # Global styles, custom classes
│   ├── about/page.tsx          # About page
│   ├── cards/page.tsx          # Zodiac Mirror Cards page
│   ├── faq/page.tsx           # FAQ page
│   ├── portrait/page.tsx       # Portrait commission page
│   ├── portrait-terms/page.tsx # Portrait terms
│   ├── posters/page.tsx        # Poster collection gallery
│   ├── privacy/page.tsx        # Privacy policy
│   └── terms/page.tsx          # Terms of service
├── components/
│   ├── BirthChartScreen.tsx    # Birth chart input form
│   ├── HomePage.tsx            # Landing screen
│   ├── QuizScreen.tsx          # Personality quiz
│   ├── ResultScreen.tsx        # Result display with actions
│   ├── ShareButtons.tsx        # Social sharing buttons
│   ├── ShareSheet.tsx          # Share modal
│   ├── UnlockModal.tsx         # Email unlock modal
│   ├── WallpaperCanvas.tsx     # Wallpaper export layout
│   ├── Watermark.tsx           # CSS overlay (deprecated)
│   └── WatermarkedImage.tsx    # Canvas-based watermarked image
├── data/
│   ├── goddessProfiles.ts     # Extended goddess profiles
│   ├── mirrorCardsPrompt.ts    # Mirror cards data
│   ├── quizQuestions.ts        # Quiz questions and scoring
│   └── zodiacGoddesses.ts     # Core goddess data
├── lib/
│   └── reflectionStorage.ts    # localStorage persistence
├── types/
│   └── index.ts               # TypeScript type definitions
└── public/
    └── Signs/                  # Goddess images and posters
```

---

## Recent Updates & Improvements

### Canvas-Based Watermarking (Latest)
- **Replaced CSS overlay** with canvas-based watermarking
- **Ensures persistence** when images are saved/exported
- **Applied to poster thumbnails** in gallery grid
- **Watermark spec:** Centered, 20-25% width, 11% opacity, white

### Reflection Persistence
- **localStorage integration** for saving/loading reflections
- **Returning user experience** with "Revisit My Reflection" option
- **"Forget my reflection"** option to clear saved data

### Homepage Redesign
- **Three clear entry paths** instead of single CTA
- **Returning user panel** when reflection is saved
- **Optional name input** for personalization
- **"Explore Another Goddess"** option for returning users

### Result Screen Enhancements
- **"Create My Portrait"** and **"Sit With This Reflection"** CTAs
- **Portrait commission section** integrated into result flow
- **Wallpaper export** with dedicated canvas layout
- **Share sheet** for easy sharing options
- **Birth sign comparison** option when quiz result differs

---

## Deployment & Infrastructure

- **Hosting:** Vercel
- **Version Control:** GitHub
- **Analytics:** Vercel Analytics
- **Payment Processing:** PayPal Hosted Buttons
- **Digital Products:** Payhip
- **Development:** Local with `npm run dev` or `vercel dev`

---

## Future Roadmap (From PRODUCT_VISION.md)

### Phase 1 (Current)
- ✅ Traffic generation
- ✅ Content → Mirror experience
- ✅ Personalised Portraits
- ✅ Cards foundation

### Phase 2 (Retention)
- Weekly Mirror (text-first)
- Optional visuals
- No monetization pressure

### Phase 3 (Light Monetization)
- Mirror Credits
- One cosmetic unlock
- One micro purchase

### Phase 4 (Ecosystem)
- Mirror Cards (physical)
- Book
- Extended sound editions

---

## Key Metrics & Goals

**Success Criteria:**
- Users remember their reflection
- No pressure felt
- Users return by choice
- Trust in the tone maintained

**Anti-Goals:**
- No streaks, timers, or FOMO
- No gamification
- No addictive patterns
- No urgency

---

## Summary

The Zodiac Mirror is a fully functional, production-ready web application that delivers a calm, reflective experience for discovering zodiac goddess archetypes. It features:

- **Two discovery paths** (Quiz and Birth Chart)
- **12 unique goddess archetypes** with rich descriptions
- **Persistent watermarked images** for poster gallery
- **Wallpaper export** functionality
- **Portrait commission** workflow with PayPal integration
- **Reflection persistence** for returning users
- **Mobile-first design** with smooth animations
- **Complete legal pages** (Privacy, Terms, FAQ, About)
- **Monetization** via portraits and poster collection

The app is live, deployed, and ready for users to explore their archetypal resonance through a quiet, intentional experience.

