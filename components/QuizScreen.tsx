'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { quizQuestions, calculateQuizResult } from '@/data/quizQuestions';
import { zodiacGoddesses } from '@/data/zodiacGoddesses';
import { ZodiacGoddess } from '@/types';

interface QuizScreenProps {
  onComplete: (goddess: ZodiacGoddess) => void;
  onBack: () => void;
}

export default function QuizScreen({ onComplete, onBack }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Quiz complete
      const resultSign = calculateQuizResult(newAnswers);
      const goddess = zodiacGoddesses[resultSign];
      if (goddess) {
        setTimeout(() => {
          onComplete(goddess);
        }, 500);
      } else {
        console.error('Invalid quiz result sign:', resultSign);
        // Fallback to aries if result is invalid
        const fallbackGoddess = zodiacGoddesses['aries'];
        if (fallbackGoddess) {
          setTimeout(() => {
            onComplete(fallbackGoddess);
          }, 500);
        }
      }
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden px-6 py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30" />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <button
          onClick={onBack}
          className="text-purple-300 mb-4 text-sm flex items-center gap-2"
        >
          ← Back
        </button>
        <div className="w-full bg-purple-900/30 rounded-full h-2 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-center text-purple-300 text-sm">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex-1 flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-white">
            {quizQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {quizQuestions[currentQuestion].answers.map((answer, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                className="w-full py-4 px-6 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-left text-white hover:bg-purple-800/50 transition-all hover:border-pink-500/50"
              >
                {answer.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

