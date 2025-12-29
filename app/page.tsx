'use client';

import { useState, useEffect } from 'react';
import HomePage from '@/components/HomePage';
import QuizScreen from '@/components/QuizScreen';
import BirthChartScreen from '@/components/BirthChartScreen';
import ResultScreen from '@/components/ResultScreen';
import { ZodiacGoddess } from '@/types';
import { zodiacGoddesses } from '@/data/zodiacGoddesses';
import { getSavedReflection, clearReflection, SavedReflection } from '@/lib/reflectionStorage';

type Screen = 'home' | 'quiz' | 'birthchart' | 'result';
type ResultSource = 'quiz' | 'birthchart';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedGoddess, setSelectedGoddess] = useState<ZodiacGoddess | null>(null);
  const [birthSign, setBirthSign] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [resultSource, setResultSource] = useState<ResultSource | undefined>(undefined);
  const [resetKey, setResetKey] = useState(0);
  const [savedReflection, setSavedReflection] = useState<SavedReflection | null>(null);

  // Check for saved reflection on mount
  useEffect(() => {
    const saved = getSavedReflection();
    if (saved) {
      setSavedReflection(saved);
      // Optionally auto-load the saved reflection
      // For now, we'll show it on the homepage
    }
  }, []);

  const handleStartQuiz = (name?: string) => {
    // Clear saved reflection when starting fresh
    clearReflection();
    setSavedReflection(null);
    setUserName(name);
    setCurrentScreen('quiz');
  };

  const handleStartBirthChart = (name?: string) => {
    // Clear saved reflection when starting fresh
    clearReflection();
    setSavedReflection(null);
    setUserName(name);
    setCurrentScreen('birthchart');
  };

  const handleQuizComplete = (goddess: ZodiacGoddess) => {
    setSelectedGoddess(goddess);
    setResultSource('quiz');
    setCurrentScreen('result');
  };

  const handleBirthChartComplete = (goddess: ZodiacGoddess) => {
    setSelectedGoddess(goddess);
    setBirthSign(goddess.sign);
    setResultSource('birthchart');
    setCurrentScreen('result');
  };

  const handleViewBirthSign = (sign: string) => {
    if (sign && zodiacGoddesses[sign]) {
      const birthSignGoddess = zodiacGoddesses[sign];
      setSelectedGoddess(birthSignGoddess);
    }
  };

  const handleRevisitReflection = () => {
    if (savedReflection) {
      setSelectedGoddess(savedReflection.goddess);
      setUserName(savedReflection.userName);
      setResultSource(savedReflection.resultSource);
      setBirthSign(savedReflection.birthSign);
      setCurrentScreen('result');
    }
  };

  const handleExploreAnother = () => {
    clearReflection();
    setSavedReflection(null);
    setCurrentScreen('home');
  };

  const handleReset = () => {
    setSelectedGoddess(null);
    setBirthSign(undefined);
    setUserName(undefined);
    setResultSource(undefined);
    setCurrentScreen('home');
    setResetKey(prev => prev + 1);
    // Don't clear saved reflection on reset - let them revisit
  };

  // Render screen based on current state
  const renderScreen = () => {
    if (currentScreen === 'home') {
      return (
        <HomePage
          key={resetKey}
          onStartQuiz={handleStartQuiz}
          onStartBirthChart={handleStartBirthChart}
          onRevisitReflection={savedReflection ? handleRevisitReflection : undefined}
          onExploreAnother={savedReflection ? handleExploreAnother : undefined}
          savedGoddessName={savedReflection?.userName}
        />
      );
    }
    
    if (currentScreen === 'quiz') {
      return <QuizScreen onComplete={handleQuizComplete} onBack={() => setCurrentScreen('home')} />;
    }
    
    if (currentScreen === 'birthchart') {
      return (
        <BirthChartScreen
          onComplete={handleBirthChartComplete}
          onBack={() => setCurrentScreen('home')}
        />
      );
    }
    
    if (currentScreen === 'result') {
      if (selectedGoddess) {
        return (
          <ResultScreen
            goddess={selectedGoddess}
            birthSign={birthSign}
            userName={userName}
            resultSource={resultSource}
            onReset={handleReset}
            onViewBirthSign={handleViewBirthSign}
          />
        );
      }
      // Fallback if selectedGoddess is null
      return (
        <HomePage
          key={resetKey}
          onStartQuiz={handleStartQuiz}
          onStartBirthChart={handleStartBirthChart}
          onRevisitReflection={savedReflection ? handleRevisitReflection : undefined}
          onExploreAnother={savedReflection ? handleExploreAnother : undefined}
          savedGoddessName={savedReflection?.userName}
        />
      );
    }
    
    // Final fallback
    return (
      <HomePage
        key={resetKey}
        onStartQuiz={handleStartQuiz}
        onStartBirthChart={handleStartBirthChart}
        onRevisitReflection={savedReflection ? handleRevisitReflection : undefined}
        onExploreAnother={savedReflection ? handleExploreAnother : undefined}
        savedGoddessName={savedReflection?.userName}
      />
    );
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      {renderScreen()}
    </main>
  );
}
