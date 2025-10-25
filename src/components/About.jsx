import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent } from './ui/card';
import {
  Sparkles,
  Globe2,
  Users,
  Target,
  Heart,
  Code,
  Lightbulb,
  Rocket
} from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const teamValues = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make learning accessible, engaging, and fun for everyone around the world.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe2,
      title: 'Global Reach',
      description: 'Supporting multiple languages to break down barriers and connect learners worldwide.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology and user feedback.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a supportive community where learners can grow and succeed together.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const features = [
    {
      icon: Code,
      title: 'Modern Technology',
      description: 'Built with React, featuring responsive design and smooth animations for the best user experience.'
    },
    {
      icon: Users,
      title: 'User-Centered Design',
      description: 'Every feature is designed with user needs in mind, ensuring accessibility and ease of use.'
    },
    {
      icon: Rocket,
      title: 'Continuous Improvement',
      description: 'Regular updates and new features based on user feedback and educational best practices.'
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
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Enhanced Quiz App
          </h1>
          
          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            We're passionate about making learning accessible, engaging, and enjoyable for everyone. 
            Our quiz platform combines modern technology with educational excellence to create 
            an unparalleled learning experience.
          </p>
        </div>

        {/* Mission & Values */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className={`${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } border transition-all hover:shadow-lg`}
                >
                  <CardContent className="p-8">
                    <div className={`bg-gradient-to-br ${value.color} p-3 rounded-lg mb-4 w-fit`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Makes Us Different
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } border transition-all hover:shadow-lg text-center`}
                >
                  <CardContent className="p-8">
                    <div className={`flex justify-center mb-4 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Stats */}
        <section className={`py-16 rounded-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600'
        }`}>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Thousands of learners are already improving their knowledge with us
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">9+</div>
                <div className="text-white/80">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">3</div>
                <div className="text-white/80">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4</div>
                <div className="text-white/80">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">∞</div>
                <div className="text-white/80">Possibilities</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Have Questions or Feedback?
          </h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We'd love to hear from you! Your feedback helps us improve and create better learning experiences.
          </p>
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-gray-100 border border-gray-300'
          }`}>
            <Heart className="h-5 w-5 text-red-500" />
            <span>Made with love for learners worldwide</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

