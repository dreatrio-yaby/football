import React, { useMemo } from 'react';
import { Calendar, TrendingUp, Activity, AlertCircle, Sparkles } from 'lucide-react';
import { useMatches } from '../contexts/MatchesContext';
import MatchCard from '../components/MatchCard';
import DatePicker from '../components/DatePicker';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDate } from '../utils';

const HomePage: React.FC = () => {
  const { matches, loading, selectedDate, setSelectedDate } = useMatches();

  const todayMatches = useMemo(() => {
    return matches[selectedDate] || [];
  }, [matches, selectedDate]);

  const stats = useMemo(() => {
    const totalMatches = Object.values(matches).flat().length;
    const highConfidenceMatches = Object.values(matches)
      .flat()
      .filter(match => {
        const mainPredictions = [
          match.predictions.target_wdl_home,
          match.predictions.target_over_2_5,
          match.predictions.target_both_teams_scored
        ].filter(Boolean);
        
        return mainPredictions.some(pred => 
          Math.max(...Object.values(pred.probabilities)) > 0.7
        );
      }).length;

    return { totalMatches, highConfidenceMatches };
  }, [matches]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Загружаем прогнозы AI..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Football AI Predictions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Прогнозы на футбольные матчи с использованием искусственного интеллекта
        </p>
        
        {/* Статистика */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Activity className="h-5 w-5" />
            <span>Всего матчей: <strong>{stats.totalMatches}</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <TrendingUp className="h-5 w-5" />
            <span>Высокая уверенность: <strong>{stats.highConfidenceMatches}</strong></span>
          </div>
        </div>
      </div>

      {/* Выбор даты */}
      <div className="mb-8">
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>

      {/* Информационный блок */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Как пользоваться сервисом
            </h3>
            <div className="text-blue-800 dark:text-blue-200 space-y-2 text-sm">
              <p>• <strong>Прогнозы AI</strong> - вероятности событий, рассчитанные алгоритмами машинного обучения</p>
              <p>• <strong>Коэффициенты</strong> - преобразованные вероятности в букмекерский формат (1/вероятность)</p>
              <p>• <strong>Уверенность</strong> - показатель надежности прогноза (чем выше, тем лучше)</p>
              <p>• <strong>Цветовая кодировка</strong>: 🟢 Высокая вероятность (70%+) | 🟡 Средняя (40-70%) | 🔴 Низкая (до 40%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Матчи */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Calendar className="h-6 w-6 mr-2" />
            Матчи на {formatDate(new Date(selectedDate + 'T00:00:00'))}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Найдено матчей: {todayMatches.length}
          </span>
        </div>

        {todayMatches.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Нет матчей на выбранную дату
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Выберите другую дату для просмотра прогнозов
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayMatches.map((match, index) => (
              <MatchCard key={`${match.match_info.home_team_id}-${match.match_info.away_team_id}-${index}`} match={match} />
            ))}
          </div>
        )}
      </div>

      {/* Дополнительная информация */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          💡 Полезные советы
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <h4 className="font-medium mb-1">Анализ матчей</h4>
            <p>Кликните на карточку матча для детального анализа всех доступных прогнозов и статистики</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Интерпретация данных</h4>
            <p>Обращайте внимание на уровень уверенности AI - чем он выше, тем надежнее прогноз</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Обновление данных</h4>
            <p>Данные обновляются автоматически. Используйте кнопку обновления в шапке сайта</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Мобильная версия</h4>
            <p>Сайт полностью адаптирован для использования на мобильных устройствах</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 