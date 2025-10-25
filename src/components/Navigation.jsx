import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { languageOptions } from '../i18n/config';
import { Button } from './ui/button';
import { 
  Sparkles, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Languages,
  Home,
  Grid3X3,
  Info
} from 'lucide-react';

const Navigation = ({ onNavigate, currentView }) => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const navigationItems = [
    { key: 'home', label: t('navigation.home'), icon: Home },
    { key: 'categories', label: t('navigation.categories'), icon: Grid3X3 },
    { key: 'about', label: t('navigation.about'), icon: Info }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-b shadow-sm`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <Sparkles className="h-8 w-8 text-blue-600" />
          <span>{t('appTitle')}</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex items-center gap-2 transition-colors font-medium ${
                  currentView === item.key
                    ? 'text-blue-600'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-blue-400' 
                      : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors appearance-none pr-8 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {Object.entries(languageOptions).map(([code, { name, flag }]) => (
                <option key={code} value={code}>
                  {flag} {name}
                </option>
              ))}
            </select>
            <Languages className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
          </div>

          {/* Dark Mode Toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t transition-colors ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full text-left py-2 transition-colors font-medium ${
                    currentView === item.key
                      ? 'text-blue-600'
                      : isDarkMode 
                        ? 'text-gray-300 hover:text-blue-400' 
                        : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

