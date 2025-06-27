import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Trophy, TrendingUp } from 'lucide-react';
import { MatchPrediction } from '../types';
import { formatDateTime, formatProbability, getProbabilityClass, probabilityToOdds } from '../utils';

interface MatchCardProps {
  match: MatchPrediction;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { match_info, predictions, teams } = match;
  
  const matchId = `${teams?.home.id}-${teams?.away.id}-${match_info.match_date}`;
  
  // Основные прогнозы для отображения на карточке
  const mainPredictions = [
    predictions.target_wdl_home,
    predictions.target_over_2_5,
    predictions.target_both_teams_scored
  ].filter(Boolean);

  return (
    <Link to={`/match/${matchId}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-200 dark:border-gray-700">
        {/* Заголовок матча */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {match_info.league}
            </span>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {formatDateTime(match_info.match_date)}
            </div>
          </div>
          
          {/* Команды */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {teams?.home.name.charAt(0)}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate max-w-[60px]">
                  {teams?.home.name}
                </p>
              </div>
              
              <div className="text-center">
                <span className="text-lg font-bold text-gray-400 dark:text-gray-500">
                  vs
                </span>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {teams?.away.name.charAt(0)}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate max-w-[60px]">
                  {teams?.away.name}
                </p>
              </div>
            </div>
            
            {match_info.venue && (
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate max-w-[100px]">{match_info.venue}</span>
              </div>
            )}
          </div>
        </div>

        {/* Прогнозы */}
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Основные прогнозы AI
          </h4>
          
          <div className="space-y-2">
            {mainPredictions.slice(0, 3).map((prediction, index) => {
              const maxProb = Math.max(...Object.values(prediction.probabilities));
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-600 dark:text-gray-400">
                      <span className="text-xs">{prediction.description}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProbabilityClass(maxProb)}`}>
                      {formatProbability(maxProb)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {probabilityToOdds(maxProb).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Индикатор уверенности AI */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Уверенность AI
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                    style={{ 
                      width: `${Math.max(...mainPredictions.map(p => 
                        Math.max(...Object.values(p.probabilities))
                      )) * 100}%` 
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(Math.max(...mainPredictions.map(p => 
                    Math.max(...Object.values(p.probabilities))
                  )) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard; 