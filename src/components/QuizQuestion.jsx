import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const QuizQuestion = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onAnswerSubmit, 
  timeLimit = 30 
}) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setTimeLeft(timeLimit);
    setIsAnswered(false);
    setShowFeedback(false);
  }, [question, timeLimit]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleSubmit();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerSelect = (answerIndex) => {
    if (!isAnswered) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    setIsAnswered(true);
    setShowFeedback(true);
    onAnswerSubmit(selectedAnswer);
  };

  const progressPercentage = ((timeLimit - timeLeft) / timeLimit) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const getOptionStyle = (index) => {
    if (!showFeedback) {
      return selectedAnswer === index 
        ? 'bg-blue-500 text-white border-blue-500 transform scale-105' 
        : isDarkMode
          ? 'hover:bg-gray-700 hover:border-gray-600'
          : 'hover:bg-blue-50 hover:border-blue-300';
    }
    
    // Show feedback colors
    if (index === question.correctAnswer) {
      return 'bg-green-500 text-white border-green-500';
    } else if (selectedAnswer === index && selectedAnswer !== question.correctAnswer) {
      return 'bg-red-500 text-white border-red-500';
    } else {
      return isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <Card className={`w-full max-w-2xl shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('quiz.question')} {currentQuestion} {t('quiz.of')} {totalQuestions}
            </span>
            <div className="flex items-center space-x-2">
              <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="w-full" />
          
          <CardTitle className={`text-xl font-bold leading-relaxed ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {question.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full text-left justify-start p-4 h-auto transition-all duration-200 ${
                  getOptionStyle(index)
                } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
              >
                <span className="mr-3 font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="flex-1">{option}</span>
                {showFeedback && index === question.correctAnswer && (
                  <CheckCircle className="w-5 h-5 ml-2" />
                )}
                {showFeedback && selectedAnswer === index && selectedAnswer !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 ml-2" />
                )}
              </Button>
            ))}
          </div>
          
          {showFeedback && question.explanation && (
            <div className={`mt-6 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
            } border`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Explanation:
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {question.explanation}
              </p>
            </div>
          )}
          
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isAnswered}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAnswered ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('quiz.submitAnswer')}d
                </>
              ) : (
                t('quiz.submitAnswer')
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizQuestion;

