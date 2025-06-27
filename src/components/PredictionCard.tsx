import React from 'react';
import { TrendingUp, TrendingDown, Target, Trophy, Activity } from 'lucide-react';
import { Prediction } from '../types';
import { formatProbability, getProbabilityClass, probabilityToOdds, getConfidenceLevel } from '../utils';

interface PredictionCardProps {
  prediction: Prediction;
  title: string;
  category?: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ 
  prediction, 
  title, 
  category = 'general' 
}) => {
  const maxProb = Math.max(...Object.values(prediction.probabilities));
  const bestOption = Object.entries(prediction.probabilities)
    .find(([, prob]) => prob === maxProb)?.[0];

  const getIcon = () => {
    if (category === 'result') return Trophy;
    if (category === 'goals') return Target;
    if (category === 'corners') return Activity;
    return TrendingUp;
  };

  const Icon = getIcon();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {prediction.description}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getProbabilityClass(maxProb)}`}>
            {formatProbability(maxProb)}
          </div>
        </div>
      </div>

      {/* Прогноз AI */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Прогноз AI:
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {prediction.prediction_label}
          </span>
        </div>
      </div>

      {/* Все варианты */}
      <div className="space-y-2">
        {Object.entries(prediction.probabilities)
          .sort(([, a], [, b]) => b - a)
          .map(([option, probability]) => (
            <div key={option} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {probability === maxProb ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
                    {option}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProbabilityClass(probability)}`}
                    style={{ width: `${probability * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right">
                  {formatProbability(probability)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 w-12 text-right">
                  {probabilityToOdds(probability).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Уровень уверенности */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Уверенность:
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {getConfidenceLevel(maxProb)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard; 