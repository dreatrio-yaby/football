import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, getNextWeekDates } from '../utils';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const dates = getNextWeekDates();
  const [currentWeek, setCurrentWeek] = React.useState(0);
  
  const visibleDates = dates.slice(currentWeek * 7, (currentWeek + 1) * 7);

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if ((currentWeek + 1) * 7 < dates.length) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Выберите дату
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevWeek}
            disabled={currentWeek === 0}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleNextWeek}
            disabled={(currentWeek + 1) * 7 >= dates.length}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
        {visibleDates.map((date) => {
          const dateStr = date.toISOString().split('T')[0];
          const isSelected = selectedDate === dateStr;
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={dateStr}
              onClick={() => onDateChange(dateStr)}
              className={`p-3 rounded-lg text-center transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : isToday
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-xs font-medium">
                {formatDate(date)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {date.toLocaleDateString('ru-RU', { weekday: 'short' })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker; 