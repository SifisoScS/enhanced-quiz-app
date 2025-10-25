import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  GraduationCap,
  Globe2,
  Trophy,
  Atom,
  Clock,
  Gamepad2,
  ArrowRight,
  BookOpen,
  Target,
  Users
} from 'lucide-react';

const CategorySelection = ({ onCategorySelect }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const categories = [
    {
      id: 'academic',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      titleKey: 'categories.academic',
      descKey: 'categories.academicDesc',
      stats: { questions: 3, difficulty: 'Medium' }
    },
    {
      id: 'general',
      icon: Globe2,
      color: 'from-green-500 to-green-600',
      titleKey: 'categories.general',
      descKey: 'categories.generalDesc',
      stats: { questions: 3, difficulty: 'Easy' }
    },
    {
      id: 'competitive',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-600',
      titleKey: 'categories.competitive',
      descKey: 'categories.competitiveDesc',
      stats: { questions: 3, difficulty: 'Hard' }
    }
  ];

  const stats = [
    { 
      icon: BookOpen, 
      label: 'Total Questions', 
      value: '9+',
      color: 'text-blue-500'
    },
    { 
      icon: Target, 
      label: 'Categories', 
      value: '3',
      color: 'text-green-500'
    },
    { 
      icon: Users, 
      label: 'Languages', 
      value: '4',
      color: 'text-purple-500'
    },
    { 
      icon: Clock, 
      label: 'Time per Question', 
      value: '30s',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('categories.title')}
          </h1>
          
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('description')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } border shadow-sm hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4 text-center">
                  <div className={`flex justify-center mb-2 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                    : 'bg-white border-gray-200 hover:border-blue-500'
                } border-2 transition-all hover:shadow-xl cursor-pointer group transform hover:scale-105`}
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`bg-gradient-to-br ${category.color} p-4 rounded-lg mb-6 w-fit group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3">
                    {t(category.titleKey)}
                  </h3>
                  
                  {/* Description */}
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}>
                    {t(category.descKey)}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {category.stats.questions} Questions
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.stats.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-800' 
                          : category.stats.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.stats.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <Button
                    className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white font-semibold py-3 transition-all group-hover:gap-3 gap-2`}
                  >
                    {t('quiz.startQuiz')}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose a category above to start your quiz journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;

