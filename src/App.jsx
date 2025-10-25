import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import CategorySelection from './components/CategorySelection';
import QuizGame from './components/QuizGame';
import Home from './components/Home';
import About from './components/About';
import './App.css';

function App() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [gameState, setGameState] = useState('categories'); // 'categories', 'playing', 'results'

  const handleNavigation = (view) => {
    setCurrentView(view);
    if (view === 'categories') {
      setGameState('categories');
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setGameState('playing');
    setCurrentView('quiz');
  };

  const handleQuizComplete = () => {
    setGameState('results');
  };

  const handleRestartQuiz = () => {
    setGameState('categories');
    setCurrentView('categories');
    setSelectedCategory(null);
  };

  const handleBackToCategories = () => {
    setGameState('categories');
    setCurrentView('categories');
    setSelectedCategory(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={handleNavigation} />;
      case 'categories':
        return <CategorySelection onCategorySelect={handleCategorySelect} />;
      case 'quiz':
        return (
          <QuizGame
            category={selectedCategory}
            gameState={gameState}
            onQuizComplete={handleQuizComplete}
            onRestartQuiz={handleRestartQuiz}
            onBackToCategories={handleBackToCategories}
          />
        );
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Navigation 
        onNavigate={handleNavigation} 
        currentView={currentView}
      />
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

