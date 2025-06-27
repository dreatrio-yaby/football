# ⚽ Football AI Predictions

Современная веб-платформа для футбольных прогнозов с использованием искусственного интеллекта и машинного обучения.

![Football AI Predictions](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.5-blue) ![Vite](https://img.shields.io/badge/Vite-4.5.0-purple)

## 🌟 Особенности

- **AI/ML Прогнозы**: Использование передовых алгоритмов машинного обучения
- **Интуитивный интерфейс**: Современный дизайн с темной/светлой темой
- **Детальная аналитика**: Подробные статистики и коэффициенты для каждого матча
- **Адаптивный дизайн**: Оптимизировано для всех устройств
- **Реальное время**: Автоматическое обновление данных
- **Многоязычность**: Полная поддержка русского языка

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 16.0 или выше
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/yourusername/football-predictions.git
   cd football-predictions
   ```

2. **Установите зависимости**
   ```bash
   npm install
   # или
   yarn install
   ```

3. **Запустите приложение в режиме разработки**
   ```bash
   npm run dev
   # или
   yarn dev
   ```

4. **Откройте браузер**
   ```
   http://localhost:5173
   ```

## 📦 Сборка для продакшена

```bash
# Сборка приложения
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 🌐 Деплой на GitHub Pages

1. **Настройте GitHub Pages в настройках репозитория**

2. **Деплой**
   ```bash
   npm run deploy
   ```

3. **Ваш сайт будет доступен по адресу:**
   ```
   https://yourusername.github.io/football/
   ```

## 🏗️ Архитектура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── Header.tsx      # Шапка сайта
│   ├── Footer.tsx      # Подвал
│   ├── MatchCard.tsx   # Карточка матча
│   ├── DatePicker.tsx  # Выбор даты
│   ├── LoadingSpinner.tsx  # Индикатор загрузки
│   └── PredictionCard.tsx  # Карточка прогноза
├── contexts/           # React контексты
│   ├── ThemeContext.tsx    # Управление темой
│   └── MatchesContext.tsx  # Управление данными
├── data/              # Данные и генераторы
│   ├── teams.ts       # Данные команд
│   └── matchGenerator.ts   # Генератор матчей
├── pages/             # Страницы приложения
│   ├── HomePage.tsx   # Главная страница
│   ├── MatchDetailPage.tsx # Детали матча
│   └── AboutPage.tsx  # О сервисе
├── types/             # TypeScript типы
│   └── index.ts
├── utils/             # Утилиты
│   └── index.ts
├── App.tsx            # Главный компонент
├── main.tsx          # Точка входа
└── index.css         # Стили
```

## 🎨 Технологии

### Frontend
- **React 18** - Современная библиотека для создания UI
- **TypeScript** - Типизированный JavaScript
- **Vite** - Быстрый сборщик модулей
- **React Router** - Маршрутизация
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Headless UI** - Компоненты без стилей
- **Lucide React** - Современные SVG иконки
- **Framer Motion** - Анимации
- **date-fns** - Работа с датами

### AI/ML Simulation
- Алгоритмы генерации прогнозов на основе статистических моделей
- Система оценки уверенности
- Конвертация вероятностей в букмекерские коэффициенты

## 📊 Структура данных

### Прогноз матча
```typescript
interface MatchPrediction {
  match_info: {
    home_team_id: string;
    away_team_id: string;
    match_date: string;
    league?: string;
    venue?: string;
  };
  predictions: {
    [key: string]: {
      description: string;
      prediction: number;
      prediction_label: string;
      probabilities: {
        [option: string]: number;
      };
    };
  };
  teams?: {
    home: Team;
    away: Team;
  };
}
```

## 🔧 Конфигурация

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/football/',  // Для GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```

### Tailwind Configuration
Кастомные цвета, анимации и утилиты настроены в `tailwind.config.js`

## 🎯 Использование

### Главная страница
- Просмотр списка матчей по датам
- Фильтрация по дням недели
- Основные статистики AI прогнозов
- Цветовая кодировка уверенности

### Детальная страница матча
- Полная статистика прогнозов
- Категоризация по типам ставок
- Букмекерские коэффициенты
- Уровни уверенности AI

### Адаптивность
- Mobile-first подход
- Оптимизация для телефонов, планшетов и десктопов
- Темная/светлая тема с автоматическим определением

## ⚠️ Важные замечания

- **Демонстрационный проект**: Прогнозы генерируются алгоритмически для демонстрации
- **Не для ставок**: Не используйте для реальных ставок без дополнительного анализа
- **Образовательные цели**: Проект создан для изучения современных веб-технологий

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Контакты

- **GitHub**: [https://github.com/yourusername/football-predictions](https://github.com/yourusername/football-predictions)
- **Email**: contact@footballai.com

## 🙏 Благодарности

- Команды React за потрясающую библиотеку
- Разработчикам Tailwind CSS за удобный фреймворк
- Сообществу разработчиков за вдохновение и поддержку

---

Сделано с ❤️ для любителей футбола и современных веб-технологий 