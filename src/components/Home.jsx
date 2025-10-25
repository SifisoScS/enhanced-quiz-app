import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  GraduationCap,
  Globe2,
  Trophy,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  Languages,
  Clock,
  Star,
  Zap,
  Award
} from 'lucide-react';

const Home = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: Languages,
      titleKey: 'Multi-Language Support',
      descKey: 'Quiz available in English, Spanish, French, and German',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Trophy,
      titleKey: 'Multiple Categories',
      descKey: 'Academic, General Knowledge, and Competitive quizzes',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      titleKey: 'Interactive Experience',
      descKey: 'Real-time scoring with detailed explanations',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Award,
      titleKey: 'Dark Mode Support',
      descKey: 'Comfortable viewing in any lighting condition',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { 
      icon: BookOpen, 
      label: 'Questions', 
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
      icon: Languages, 
      label: 'Languages', 
      value: '4',
      color: 'text-purple-500'
    },
    { 
      icon: Clock, 
      label: 'Avg. Time', 
      value: '5min',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="h-20 w-20 text-yellow-400 animate-pulse" />
                <GraduationCap className="h-16 w-16 text-blue-600 absolute top-2 left-2" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('tagline')}
            </h1>

            {/* Subheading */}
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={() => onNavigate('categories')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Trophy className="h-6 w-6" />
                Start Quiz
                <ArrowRight className="h-6 w-6" />
              </Button>

              <Button
                onClick={() => onNavigate('about')}
                variant="outline"
                className={`px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 w-full sm:w-auto justify-center ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="h-6 w-6" />
                Learn More
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 md:py-20 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Why Choose Our Quiz App?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } border transition-all hover:shadow-lg group`}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg mb-4 w-fit mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.titleKey}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.descKey}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of learners improving their knowledge with our interactive quizzes
          </p>
          <Button
            onClick={() => onNavigate('categories')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Star className="h-6 w-6 mr-2" />
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

