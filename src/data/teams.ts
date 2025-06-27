import { Team } from '../types';

export const teams: Team[] = [
  // Премьер-лига
  { id: 'man-city', name: 'Манчестер Сити', country: 'Англия' },
  { id: 'arsenal', name: 'Арсенал', country: 'Англия' },
  { id: 'liverpool', name: 'Ливерпуль', country: 'Англия' },
  { id: 'chelsea', name: 'Челси', country: 'Англия' },
  { id: 'man-utd', name: 'Манчестер Юнайтед', country: 'Англия' },
  { id: 'tottenham', name: 'Тоттенхэм', country: 'Англия' },
  
  // Ла Лига
  { id: 'real-madrid', name: 'Реал Мадрид', country: 'Испания' },
  { id: 'barcelona', name: 'Барселона', country: 'Испания' },
  { id: 'atletico', name: 'Атлетико Мадрид', country: 'Испания' },
  { id: 'sevilla', name: 'Севилья', country: 'Испания' },
  { id: 'valencia', name: 'Валенсия', country: 'Испания' },
  { id: 'villarreal', name: 'Вильярреал', country: 'Испания' },
  
  // Бундеслига
  { id: 'bayern', name: 'Бавария', country: 'Германия' },
  { id: 'dortmund', name: 'Боруссия Дортмунд', country: 'Германия' },
  { id: 'leipzig', name: 'РБ Лейпциг', country: 'Германия' },
  { id: 'leverkusen', name: 'Байер Леверкузен', country: 'Германия' },
  
  // Серия А
  { id: 'juventus', name: 'Ювентус', country: 'Италия' },
  { id: 'milan', name: 'Милан', country: 'Италия' },
  { id: 'inter', name: 'Интер', country: 'Италия' },
  { id: 'napoli', name: 'Наполи', country: 'Италия' },
  { id: 'roma', name: 'Рома', country: 'Италия' },
  
  // Лига 1
  { id: 'psg', name: 'ПСЖ', country: 'Франция' },
  { id: 'marseille', name: 'Марсель', country: 'Франция' },
  { id: 'lyon', name: 'Лион', country: 'Франция' },
  { id: 'monaco', name: 'Монако', country: 'Франция' },
  
  // РПЛ
  { id: 'zenit', name: 'Зенит', country: 'Россия' },
  { id: 'cska', name: 'ЦСКА', country: 'Россия' },
  { id: 'spartak', name: 'Спартак', country: 'Россия' },
  { id: 'dynamo', name: 'Динамо', country: 'Россия' },
  { id: 'lokomotiv', name: 'Локомотив', country: 'Россия' },
  { id: 'rubin', name: 'Рубин', country: 'Россия' },
];

export const getTeamById = (id: string): Team | undefined => {
  return teams.find(team => team.id === id);
};

export const getRandomTeams = (count: number = 2): Team[] => {
  const shuffled = [...teams].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 