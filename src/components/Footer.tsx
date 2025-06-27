import React from 'react';
import { Activity, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* О проекте */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Football AI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Современная платформа для футбольных прогнозов с использованием
              искусственного интеллекта и машинного обучения. Получайте точные
              прогнозы и анализируйте статистику матчей.
            </p>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Информация
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  О сервисе
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Как пользоваться
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  API документация
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Обратная связь
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Контакты
            </h3>
            <div className="space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:contact@example.com"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>contact@example.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2024 Football AI Predictions. Все права защищены.
            </p>
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm mt-2 md:mt-0">
              <span>Сделано с</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>для любителей футбола</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 