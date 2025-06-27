export interface Team {
  id: string;
  name: string;
  logo?: string;
  country?: string;
}

export interface MatchInfo {
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  league?: string;
  round?: string;
  venue?: string;
}

export interface PredictionProbabilities {
  [key: string]: number;
}

export interface Prediction {
  description: string;
  prediction: number;
  prediction_label: string;
  probabilities: PredictionProbabilities;
  confidence?: number;
  odds?: {
    back?: number;
    lay?: number;
  };
}

export interface MatchPrediction {
  match_info: MatchInfo;
  predictions: {
    [key: string]: Prediction;
  };
  stats_dates: {
    home_team_last_match: string;
    away_team_last_match: string;
  };
  teams?: {
    home: Team;
    away: Team;
  };
}

export interface PredictionCategory {
  id: string;
  name: string;
  icon: string;
  predictions: string[];
}

export interface PredictionFilter {
  category?: string;
  minProbability?: number;
  onlyPositive?: boolean;
} 