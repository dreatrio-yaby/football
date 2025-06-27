import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Activity, Info, Home, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useMatches } from '../contexts/MatchesContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { refreshMatches, loading } = useMatches();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/about', icon: Info, label: 'О сервисе' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Football AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Прогнозы с ИИ
              </p>
            </div>
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Кнопки управления */}
          <div className="flex items-center space-x-2">
            {/* Обновить данные */}
            <button
              onClick={refreshMatches}
              disabled={loading}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
              title="Обновить данные"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Переключатель темы */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title={isDark ? 'Светлая тема' : 'Темная тема'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Мобильная навигация */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <nav className="flex items-center justify-around py-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 