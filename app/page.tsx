'use client';

import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import QuizScreen from '@/components/QuizScreen';
import BirthChartScreen from '@/components/BirthChartScreen';
import ResultScreen from '@/components/ResultScreen';
import { ZodiacGoddess } from '@/types';
import { zodiacGoddesses } from '@/data/zodiacGoddesses';

type Screen = 'start' | 'quiz' | 'birthchart' | 'result';

type ResultSource = 'quiz' | 'birthchart';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [selectedGoddess, setSelectedGoddess] = useState<ZodiacGoddess | null>(null);
  const [birthSign, setBirthSign] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [resultSource, setResultSource] = useState<ResultSource | undefined>(undefined);
  const [resetKey, setResetKey] = useState(0); // Key to force remount of StartScreen

  const handleStartQuiz = (name?: string) => {
    setUserName(name);
    setCurrentScreen('quiz');
  };

  const handleStartBirthChart = (name?: string) => {
    setUserName(name);
    setCurrentScreen('birthchart');
  };

  const handleQuizComplete = (goddess: ZodiacGoddess) => {
    setSelectedGoddess(goddess);
    setResultSource('quiz');
    setCurrentScreen('result');
    // Birth sign remains undefined if they only took the quiz
  };

  const handleBirthChartComplete = (goddess: ZodiacGoddess) => {
    setSelectedGoddess(goddess);
    setBirthSign(goddess.sign); // Store birth sign when using birth chart
    setResultSource('birthchart');
    setCurrentScreen('result');
  };

  const handleViewBirthSign = (sign: string) => {
    // Find the birth sign goddess and display it
    if (sign && zodiacGoddesses[sign]) {
      const birthSignGoddess = zodiacGoddesses[sign];
      setSelectedGoddess(birthSignGoddess);
      // Stay on result screen, just update the goddess
    }
  };

  const handleReset = () => {
    // Reset all state first
    setSelectedGoddess(null);
    setBirthSign(undefined);
    setUserName(undefined);
    setResultSource(undefined);
    // Then change screen and force remount
    setCurrentScreen('start');
    setResetKey(prev => prev + 1); // Force remount of StartScreen
  };

  // Safety check: ensure we always have a valid screen to render
  const renderScreen = () => {
    if (currentScreen === 'start') {
      return (
        <StartScreen
          key={resetKey}
          onStartQuiz={handleStartQuiz}
          onStartBirthChart={handleStartBirthChart}
        />
      );
    }
    
    if (currentScreen === 'quiz') {
      return <QuizScreen onComplete={handleQuizComplete} onBack={() => setCurrentScreen('start')} />;
    }
    
    if (currentScreen === 'birthchart') {
      return (
        <BirthChartScreen
          onComplete={handleBirthChartComplete}
          onBack={() => setCurrentScreen('start')}
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
        <StartScreen
          key={resetKey}
          onStartQuiz={handleStartQuiz}
          onStartBirthChart={handleStartBirthChart}
        />
      );
    }
    
    // Final fallback
    return (
      <StartScreen
        key={resetKey}
        onStartQuiz={handleStartQuiz}
        onStartBirthChart={handleStartBirthChart}
      />
    );
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      {renderScreen()}
    </main>
  );
}

