import React, { createContext, useContext, useState, useEffect } from 'react';
import { MatchPrediction } from '../types';
import { generateMatchesForWeek } from '../data/matchGenerator';

interface MatchesContextType {
  matches: { [date: string]: MatchPrediction[] };
  loading: boolean;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  getMatchById: (id: string) => MatchPrediction | undefined;
  refreshMatches: () => void;
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export function MatchesProvider({ children }: { children: React.ReactNode }) {
  const [matches, setMatches] = useState<{ [date: string]: MatchPrediction[] }>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const loadMatches = async () => {
    setLoading(true);
    try {
      // Симулируем загрузку данных
      await new Promise(resolve => setTimeout(resolve, 1000));
      const generatedMatches = generateMatchesForWeek();
      setMatches(generatedMatches);
    } catch (error) {
      console.error('Ошибка загрузки матчей:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMatchById = (id: string): MatchPrediction | undefined => {
    for (const dateMatches of Object.values(matches)) {
      const match = dateMatches.find(m => 
        `${m.teams?.home.id}-${m.teams?.away.id}-${m.match_info.match_date}` === id
      );
      if (match) return match;
    }
    return undefined;
  };

  const refreshMatches = () => {
    loadMatches();
  };

  useEffect(() => {
    loadMatches();
  }, []);

  return (
    <MatchesContext.Provider value={{ 
      matches, 
      loading, 
      selectedDate, 
      setSelectedDate,
      getMatchById,
      refreshMatches
    }}>
      {children}
    </MatchesContext.Provider>
  );
}

export function useMatches() {
  const context = useContext(MatchesContext);
  if (context === undefined) {
    throw new Error('useMatches must be used within a MatchesProvider');
  }
  return context;
} 