import React from 'react';
import { Brain, Target, TrendingUp, Shield, Zap, Users, Github, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Искусственный интеллект',
      description: 'Современные алгоритмы машинного обучения анализируют тысячи факторов для создания точных прогнозов',
      color: 'blue'
    },
    {
      icon: Target,
      title: 'Высокая точность',
      description: 'Наши модели постоянно обучаются на новых данных, повышая точность предсказаний',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Анализ статистики',
      description: 'Глубокий анализ исторических данных, формы команд и множества других параметров',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Надежность',
      description: 'Прозрачная система оценки уверенности в каждом прогнозе',
      color: 'orange'
    },
    {
      icon: Zap,
      title: 'Быстрое обновление',
      description: 'Данные обновляются в режиме реального времени для максимальной актуальности',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Удобный интерфейс',
      description: 'Интуитивно понятный дизайн, адаптированный для всех устройств',
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
      pink: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
          <Brain className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          О Football AI Predictions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Революционная платформа для футбольных прогнозов, использующая передовые технологии 
          искусственного интеллекта для анализа и предсказания результатов матчей
        </p>
      </div>

      {/* Основные возможности */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Основные возможности
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-lg ${getColorClasses(feature.color)} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Как это работает */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Как это работает
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Сбор данных
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Анализируем статистику команд, игроков, результаты последних матчей и множество других факторов
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Обработка AI
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Машинное обучение обрабатывает данные и выявляет скрытые закономерности
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Прогноз
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Получаем точные вероятности различных исходов с указанием уровня уверенности
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Технологии */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Технологии
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Машинное обучение
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Нейронные сети для анализа паттернов</li>
                <li>• Ансамблевые методы для повышения точности</li>
                <li>• Обучение с подкреплением для адаптации</li>
                <li>• Обработка естественного языка для анализа новостей</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Веб-технологии
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• React + TypeScript для интерфейса</li>
                <li>• Tailwind CSS для современного дизайна</li>
                <li>• Vite для быстрой разработки</li>
                <li>• Адаптивный дизайн для всех устройств</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Важная информация */}
      <div className="mb-16">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mb-4">
            ⚠️ Важная информация
          </h2>
          <div className="text-yellow-800 dark:text-yellow-200 space-y-3">
            <p>
              <strong>Disclaimer:</strong> Данный сервис предоставляет прогнозы исключительно в информационных целях. 
              Прогнозы основаны на статистическом анализе и не гарантируют результат.
            </p>
            <p>
              <strong>Ответственная игра:</strong> Помните о рисках, связанных со ставками. 
              Никогда не ставьте больше, чем можете позволить себе проиграть.
            </p>
            <p>
              <strong>Возрастные ограничения:</strong> Сервис предназначен для лиц старше 18 лет.
            </p>
          </div>
        </div>
      </div>

      {/* Контакты */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Свяжитесь с нами
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
          <a
            href="mailto:contact@footballai.com"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-6">
          Мы всегда рады обратной связи и предложениям по улучшению сервиса!
        </p>
      </div>
    </div>
  );
};

export default AboutPage; 