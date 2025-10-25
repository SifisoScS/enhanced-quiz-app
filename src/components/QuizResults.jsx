import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trophy, RotateCcw, CheckCircle, XCircle, Star, ArrowLeft, GraduationCap, Globe2, Gamepad2 } from 'lucide-react';

const QuizResults = ({ 
  score, 
  totalQuestions, 
  answers, 
  questions, 
  onRestartQuiz,
  onBackToCategories,
  category 
}) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return { 
      message: t('results.excellent'), 
      icon: Trophy, 
      color: "text-yellow-500",
      bgColor: isDarkMode ? "from-yellow-600 to-yellow-700" : "from-yellow-500 to-yellow-600"
    };
    if (percentage >= 70) return { 
      message: t('results.great'), 
      icon: Star, 
      color: "text-blue-500",
      bgColor: isDarkMode ? "from-blue-600 to-blue-700" : "from-blue-500 to-blue-600"
    };
    if (percentage >= 50) return { 
      message: t('results.good'), 
      icon: CheckCircle, 
      color: "text-green-500",
      bgColor: isDarkMode ? "from-green-600 to-green-700" : "from-green-500 to-green-600"
    };
    return { 
      message: t('results.keepLearning'), 
      icon: RotateCcw, 
      color: "text-gray-500",
      bgColor: isDarkMode ? "from-gray-600 to-gray-700" : "from-gray-500 to-gray-600"
    };
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'academic': return GraduationCap;
      case 'general': return Globe2;
      case 'competitive': return Gamepad2;
      default: return Trophy;
    }
  };

  const { message, icon: ScoreIcon, color, bgColor } = getScoreMessage();
  const CategoryIcon = getCategoryIcon();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <Card className={`w-full max-w-4xl shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="text-center space-y-4">
          <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${bgColor} rounded-full flex items-center justify-center`}>
            <ScoreIcon className="w-10 h-10 text-white" />
          </div>
          <CardTitle className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {t('results.quizComplete')}
          </CardTitle>
          <div className="space-y-2">
            <div className="text-6xl font-bold text-blue-600">{percentage}%</div>
            <div className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {score} {t('results.outOf')} {totalQuestions} {t('results.correctAnswers')}
            </div>
            <div className={`text-lg font-semibold ${color}`}>
              {message}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-50'
            }`}>
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                {t('quiz.correct')}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-50'
            }`}>
              <div className="text-2xl font-bold text-red-600">{totalQuestions - score}</div>
              <div className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                {t('quiz.incorrect')}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50'
            }`}>
              <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
              <div className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                {t('quiz.total')}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {t('results.reviewAnswers')}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const userAnswerText = userAnswer !== null ? question.options[userAnswer] : t('results.noAnswer');
                const correctAnswerText = question.options[question.correctAnswer];
                
                return (
                  <Card 
                    key={question.id} 
                    className={`border-l-4 ${
                      isCorrect ? 'border-l-green-500' : 'border-l-red-500'
                    } ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1 space-y-2">
                          <div className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {index + 1}. {question.question}
                          </div>
                          <div className="text-sm space-y-1">
                            <div className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {t('results.yourAnswer')}: {userAnswerText}
                            </div>
                            {!isCorrect && (
                              <div className="text-green-600">
                                {t('results.correctAnswer')}: {correctAnswerText}
                              </div>
                            )}
                            {question.explanation && (
                              <div className={`italic ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {question.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={onBackToCategories}
              variant="outline"
              className={`px-8 py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('results.backToCategories')}
            </Button>
            
            <Button
              onClick={onRestartQuiz}
              className={`bg-gradient-to-r ${bgColor} hover:opacity-90 text-white font-semibold px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105`}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {t('results.takeAgain')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;

