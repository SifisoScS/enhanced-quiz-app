import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { getQuestionsByCategory } from '../data/questions';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

const QuizGame = ({ 
  category, 
  gameState, 
  onQuizComplete, 
  onRestartQuiz, 
  onBackToCategories 
}) => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Load questions when category changes
  useEffect(() => {
    if (category) {
      const categoryQuestions = getQuestionsByCategory(category);
      setQuestions(categoryQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswers([]);
      setQuizStarted(false);
      setShowResults(false);
    }
  }, [category]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSubmit = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Update score if correct
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Store the answer
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    // Move to next question or show results
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
        onQuizComplete();
      }
    }, 1500); // Show feedback for 1.5 seconds
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setQuizStarted(false);
    setShowResults(false);
    onRestartQuiz();
  };

  const handleBackToCategories = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setQuizStarted(false);
    setShowResults(false);
    onBackToCategories();
  };

  // Get current question with translation
  const getCurrentQuestion = () => {
    if (!questions[currentQuestionIndex]) return null;
    
    const question = questions[currentQuestionIndex];
    const translation = question.translations[i18n.language] || question.translations.en;
    
    return {
      ...question,
      question: translation.question,
      options: translation.options,
      explanation: translation.explanation
    };
  };

  // Get all questions with translations for results
  const getTranslatedQuestions = () => {
    return questions.map(q => {
      const translation = q.translations[i18n.language] || q.translations.en;
      return {
        ...q,
        question: translation.question,
        options: translation.options,
        explanation: translation.explanation
      };
    });
  };

  if (!category || questions.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        answers={answers}
        questions={getTranslatedQuestions()}
        onRestartQuiz={handleRestartQuiz}
        onBackToCategories={handleBackToCategories}
        category={category}
      />
    );
  }

  if (!quizStarted) {
    return (
      <QuizStart
        onStartQuiz={handleStartQuiz}
        totalQuestions={questions.length}
        category={category}
      />
    );
  }

  const currentQuestion = getCurrentQuestion();
  
  if (!currentQuestion) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <p>Question not found</p>
      </div>
    );
  }

  return (
    <QuizQuestion
      question={currentQuestion}
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      onAnswerSubmit={handleAnswerSubmit}
      timeLimit={30}
    />
  );
};

export default QuizGame;

