import { MatchPrediction, Prediction } from '../types';
import { getRandomTeams, getTeamById } from './teams';
import { addDays, format } from 'date-fns';
import { generateMatchId } from '../utils';

const predictionTemplates: { [key: string]: Prediction } = {
  target_over_0_5: {
    description: "Больше 0.5 голов в матче",
    prediction: 1,
    prediction_label: "Да",
    probabilities: { "Нет": 0.036, "Да": 0.964 }
  },
  target_over_1_5: {
    description: "Больше 1.5 голов в матче",
    prediction: 1,
    prediction_label: "Да",
    probabilities: { "Нет": 0.141, "Да": 0.859 }
  },
  target_over_2_5: {
    description: "Больше 2.5 голов в матче",
    prediction: 1,
    prediction_label: "Да",
    probabilities: { "Нет": 0.468, "Да": 0.532 }
  },
  target_over_3_5: {
    description: "Больше 3.5 голов в матче",
    prediction: 0,
    prediction_label: "Нет",
    probabilities: { "Нет": 0.659, "Да": 0.341 }
  },
  target_both_teams_scored: {
    description: "Обе команды забьют",
    prediction: 1,
    prediction_label: "Да",
    probabilities: { "Нет": 0.377, "Да": 0.623 }
  },
  target_wdl_home: {
    description: "Результат для домашней команды",
    prediction: 2,
    prediction_label: "Победа дома",
    probabilities: { "Поражение дома": 0.385, "Ничья": 0.264, "Победа дома": 0.351 }
  },
  target_home_over_1_5: {
    description: "Домашняя команда забьет больше 1.5 голов",
    prediction: 0,
    prediction_label: "Нет",
    probabilities: { "Нет": 0.870, "Да": 0.130 }
  },
  target_away_over_1_5: {
    description: "Гостевая команда забьет больше 1.5 голов",
    prediction: 0,
    prediction_label: "Нет",
    probabilities: { "Нет": 0.612, "Да": 0.388 }
  },
  target_corners_over_8_5: {
    description: "Больше 8.5 угловых в матче",
    prediction: 1,
    prediction_label: "Да",
    probabilities: { "Нет": 0.317, "Да": 0.683 }
  },
  target_corners_over_9_5: {
    description: "Больше 9.5 угловых в матче",
    prediction: 1,
    prediction_label: "Да",
    probabilities: { "Нет": 0.446, "Да": 0.554 }
  }
};

const leagues = [
  'Премьер-лига', 'Ла Лига', 'Бундеслига', 'Серия А', 'Лига 1', 'РПЛ', 
  'Лига Чемпионов', 'Лига Европы'
];

const venues = [
  'Олд Траффорд', 'Стэмфорд Бридж', 'Эмирейтс', 'Энфилд', 'Этихад',
  'Камп Ноу', 'Сантьяго Бернабеу', 'Альянц Арена', 'Сан-Сиро'
];

function randomizePrediction(template: Prediction): Prediction {
  const variation = 0.1; // 10% вариация
  const newProbabilities: { [key: string]: number } = {};
  
  Object.entries(template.probabilities).forEach(([key, value]) => {
    const randomFactor = 1 + (Math.random() - 0.5) * variation;
    newProbabilities[key] = Math.max(0.01, Math.min(0.99, value * randomFactor));
  });
  
  // Нормализация вероятностей
  const total = Object.values(newProbabilities).reduce((sum, val) => sum + val, 0);
  Object.keys(newProbabilities).forEach(key => {
    newProbabilities[key] = newProbabilities[key] / total;
  });
  
  // Определение нового прогноза
  const maxProb = Math.max(...Object.values(newProbabilities));
  const predictionKey = Object.keys(newProbabilities).find(key => 
    newProbabilities[key] === maxProb
  );
  
  return {
    ...template,
    probabilities: newProbabilities,
    prediction: predictionKey === template.prediction_label ? template.prediction : 
                (template.prediction === 1 ? 0 : 1),
    prediction_label: predictionKey || template.prediction_label
  };
}

export function generateMatch(date: Date): MatchPrediction {
  const [homeTeam, awayTeam] = getRandomTeams(2);
  const matchId = generateMatchId();
  
  // Генерируем случайное время матча
  const matchHour = Math.floor(Math.random() * 12) + 10; // 10:00 - 21:00
  const matchMinute = Math.random() < 0.5 ? 0 : 30;
  const matchDateTime = new Date(date);
  matchDateTime.setHours(matchHour, matchMinute, 0, 0);
  
  const predictions: { [key: string]: Prediction } = {};
  
  // Генерируем прогнозы на основе шаблонов
  Object.entries(predictionTemplates).forEach(([key, template]) => {
    predictions[key] = randomizePrediction(template);
  });
  
  return {
    match_info: {
      home_team_id: homeTeam.id,
      away_team_id: awayTeam.id,
      match_date: matchDateTime.toISOString(),
      league: leagues[Math.floor(Math.random() * leagues.length)],
      venue: venues[Math.floor(Math.random() * venues.length)]
    },
    predictions,
    stats_dates: {
      home_team_last_match: format(addDays(matchDateTime, -Math.floor(Math.random() * 7) - 1), 'yyyy-MM-dd'),
      away_team_last_match: format(addDays(matchDateTime, -Math.floor(Math.random() * 7) - 1), 'yyyy-MM-dd')
    },
    teams: {
      home: homeTeam,
      away: awayTeam
    }
  };
}

export function generateMatchesForDate(date: Date, count: number = 5): MatchPrediction[] {
  const matches: MatchPrediction[] = [];
  
  for (let i = 0; i < count; i++) {
    matches.push(generateMatch(date));
  }
  
  // Сортируем матчи по времени
  return matches.sort((a, b) => 
    new Date(a.match_info.match_date).getTime() - new Date(b.match_info.match_date).getTime()
  );
}

export function generateMatchesForWeek(): { [date: string]: MatchPrediction[] } {
  const matches: { [date: string]: MatchPrediction[] } = {};
  
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    const dateKey = format(date, 'yyyy-MM-dd');
    const matchCount = Math.floor(Math.random() * 8) + 3; // 3-10 матчей в день
    matches[dateKey] = generateMatchesForDate(date, matchCount);
  }
  
  return matches;
} 