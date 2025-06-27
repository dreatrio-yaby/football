import { format, addDays, isToday, isTomorrow, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return 'Сегодня';
  }
  
  if (isTomorrow(dateObj)) {
    return 'Завтра';
  }
  
  return format(dateObj, 'dd MMMM', { locale: ru });
};

export const formatDateTime = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMMM, HH:mm', { locale: ru });
};

export const probabilityToOdds = (probability: number): number => {
  if (probability <= 0 || probability >= 1) return 1;
  return Number((1 / probability).toFixed(2));
};

export const oddsToImpliedProbability = (odds: number): number => {
  return Number((1 / odds).toFixed(4));
};

export const formatProbability = (probability: number): string => {
  return `${(probability * 100).toFixed(1)}%`;
};

export const getProbabilityClass = (probability: number): string => {
  if (probability >= 0.7) return 'probability-high';
  if (probability >= 0.4) return 'probability-medium';
  return 'probability-low';
};

export const getConfidenceLevel = (probability: number): string => {
  if (probability >= 0.8) return 'Очень высокая';
  if (probability >= 0.65) return 'Высокая';
  if (probability >= 0.5) return 'Средняя';
  if (probability >= 0.35) return 'Низкая';
  return 'Очень низкая';
};

export const calculateValue = (odds: number, impliedProbability: number): number => {
  const bookmakerProbability = 1 / odds;
  return (impliedProbability - bookmakerProbability) / bookmakerProbability;
};

export const getValueClass = (value: number): string => {
  if (value >= 0.1) return 'text-green-600 font-semibold';
  if (value >= 0.05) return 'text-green-500';
  if (value >= 0) return 'text-gray-600';
  if (value >= -0.05) return 'text-orange-500';
  return 'text-red-500';
};

export const generateMatchId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const getNextWeekDates = (): Date[] => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(new Date(), i));
  }
  return dates;
}; 