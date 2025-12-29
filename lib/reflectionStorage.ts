import { ZodiacGoddess } from '@/types';

export type ResultSource = 'quiz' | 'birthchart';

export interface SavedReflection {
  goddess: ZodiacGoddess;
  userName?: string;
  resultSource?: ResultSource;
  birthSign?: string;
  timestamp: number;
}

const STORAGE_KEY = 'zodiac-mirror-reflection';

/**
 * Save the user's reflection result to localStorage
 */
export function saveReflection(reflection: Omit<SavedReflection, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  
  const savedReflection: SavedReflection = {
    ...reflection,
    timestamp: Date.now(),
  };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReflection));
  } catch (error) {
    console.error('Failed to save reflection to localStorage:', error);
  }
}

/**
 * Get the saved reflection from localStorage, if it exists
 */
export function getSavedReflection(): SavedReflection | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const reflection = JSON.parse(stored) as SavedReflection;
    
    // Validate the structure has required fields
    if (!reflection.goddess || !reflection.timestamp) {
      return null;
    }
    
    return reflection;
  } catch (error) {
    console.error('Failed to load reflection from localStorage:', error);
    return null;
  }
}

/**
 * Clear the saved reflection from localStorage
 */
export function clearReflection(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear reflection from localStorage:', error);
  }
}

