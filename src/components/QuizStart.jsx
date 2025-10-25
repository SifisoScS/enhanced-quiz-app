import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Play, Trophy, Clock, HelpCircle, GraduationCap, Globe2, Gamepad2 } from 'lucide-react';

const QuizStart = ({ onStartQuiz, totalQuestions, category }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const getCategoryInfo = () => {
    switch (category) {
      case 'academic':
        return {
          icon: GraduationCap,
          title: t('categories.academic'),
          description: t('categories.academicDesc'),
          color: 'from-blue-500 to-blue-600'
        };
      case 'general':
        return {
          icon: Globe2,
          title: t('categories.general'),
          description: t('categories.generalDesc'),
          color: 'from-green-500 to-green-600'
        };
      case 'competitive':
        return {
          icon: Gamepad2,
          title: t('categories.competitive'),
          description: t('categories.competitiveDesc'),
          color: 'from-yellow-500 to-yellow-600'
        };
      default:
        return {
          icon: Trophy,
          title: 'Quiz Challenge',
          description: t('description'),
          color: 'from-blue-500 to-indigo-600'
        };
    }
  };

  const categoryInfo = getCategoryInfo();
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <Card className={`w-full max-w-md shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="text-center space-y-4">
          <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${categoryInfo.color} rounded-full flex items-center justify-center`}>
            <CategoryIcon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {categoryInfo.title}
          </CardTitle>
          <CardDescription className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {categoryInfo.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <HelpCircle className="w-6 h-6 text-blue-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('quiz.question')}s
              </span>
              <span className="font-bold text-lg">{totalQuestions}</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Clock className="w-6 h-6 text-green-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('quiz.timeLeft')}
              </span>
              <span className="font-bold text-lg">30s each</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {t('rules.title')}:
            </h3>
            <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• {t('rules.timeLimit')}</li>
              <li>• {t('rules.multipleChoice')}</li>
              <li>• {t('rules.scoring')}</li>
              <li>• {t('rules.noGoingBack')}</li>
            </ul>
          </div>
          
          <Button 
            onClick={onStartQuiz}
            className={`w-full bg-gradient-to-r ${categoryInfo.color} hover:opacity-90 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105`}
          >
            <Play className="w-5 h-5 mr-2" />
            {t('quiz.startQuiz')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizStart;

