import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Calendar, Users, Target, Trophy, Activity, AlertTriangle } from 'lucide-react';
import { useMatches } from '../contexts/MatchesContext';
import PredictionCard from '../components/PredictionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDateTime } from '../utils';

const MatchDetailPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { getMatchById, loading } = useMatches();

  const match = useMemo(() => {
    return matchId ? getMatchById(matchId) : undefined;
  }, [matchId, getMatchById]);

  const categorizedPredictions = useMemo(() => {
    if (!match) return {};

    const categories = {
      result: {
        name: 'Результат матча',
        icon: Trophy,
        predictions: [] as Array<{ key: string; prediction: any; title: string }>
      },
      goals: {
        name: 'Голы',
        icon: Target,
        predictions: [] as Array<{ key: string; prediction: any; title: string }>
      },
      corners: {
        name: 'Угловые',
        icon: Activity,
        predictions: [] as Array<{ key: string; prediction: any; title: string }>
      }
    };

    Object.entries(match.predictions).forEach(([key, prediction]) => {
      if (key.includes('wdl')) {
        categories.result.predictions.push({ key, prediction, title: 'Исход матча' });
      } else if (key.includes('corner')) {
        categories.corners.predictions.push({ 
          key, 
          prediction, 
          title: prediction.description.replace('Больше ', '').replace(' в матче', '')
        });
      } else {
        categories.goals.predictions.push({ 
          key, 
          prediction, 
          title: prediction.description.replace('Больше ', '').replace(' в матче', '')
        });
      }
    });

    return categories;
  }, [match]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Загружаем детали матча..." />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Матч не найден
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Запрашиваемый матч не существует или был удален
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Вернуться к списку матчей
        </Link>
      </div>
    );
  }

  const { match_info, teams } = match;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Навигация назад */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к списку матчей
        </Link>
      </div>

      {/* Заголовок матча */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {match_info.league}
            </span>
          </div>

          {/* Команды */}
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                {teams?.home.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {teams?.home.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {teams?.home.country}
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-400 dark:text-gray-500 mb-3">
                VS
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                {teams?.away.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {teams?.away.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {teams?.away.country}
              </p>
            </div>
          </div>

          {/* Информация о матче */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{formatDateTime(match_info.match_date)}</span>
            </div>
            {match_info.venue && (
              <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{match_info.venue}</span>
              </div>
            )}
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <span>AI Прогноз</span>
            </div>
          </div>
        </div>
      </div>

      {/* Прогнозы по категориям */}
      {Object.entries(categorizedPredictions).map(([categoryKey, category]) => (
        <div key={categoryKey} className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({category.predictions.length} прогнозов)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.predictions.map(({ key, prediction, title }) => (
              <PredictionCard
                key={key}
                prediction={prediction}
                title={title}
                category={categoryKey}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Дополнительная информация */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Дополнительная информация
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Последние матчи команд
            </h4>
            <div className="space-y-1 text-gray-600 dark:text-gray-400">
              <p>• {teams?.home.name}: {match.stats_dates.home_team_last_match}</p>
              <p>• {teams?.away.name}: {match.stats_dates.away_team_last_match}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Как читать прогнозы
            </h4>
            <div className="space-y-1 text-gray-600 dark:text-gray-400">
              <p>• Высокая уверенность (70%+) - надежные прогнозы</p>
              <p>• Коэффициенты рассчитаны как 1/вероятность</p>
              <p>• Учитывается статистика последних игр</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage; 