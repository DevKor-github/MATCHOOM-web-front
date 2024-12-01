import { DAYS_OF_WEEK } from 'constants/date';
import { useState } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from 'features/main/utils/date';
import DayBox from './DayBox';

const VIEW_MODE = {
  MONTH: 'month',
  WEEK: 'week',
} as const;

type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODE.MONTH);

  const handleSelectDate = (date: number) => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
    );
  };

  const getWeekDates = () => {
    const currentDate = selectedDate.getDate();
    const firstDayOfWeek = currentDate - selectedDate.getDay();
    return [...Array(7)].map((_, index) => {
      const date = new Date(selectedDate);
      date.setDate(firstDayOfWeek + index);
      return date;
    });
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (viewMode === VIEW_MODE.MONTH) {
      setSelectedDate(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + (direction === 'next' ? 1 : -1),
          selectedDate.getDate(),
        ),
      );
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
      setSelectedDate(newDate);
    }
  };

  return (
    <div className='w-full bg-white'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='gap-2 flex'>
          <button
            className={`px-2 py-1 rounded ${
              viewMode === VIEW_MODE.MONTH
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setViewMode(VIEW_MODE.MONTH)}
          >
            월간
          </button>
          <button
            className={`px-2 py-1 rounded ${
              viewMode === VIEW_MODE.WEEK
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setViewMode(VIEW_MODE.WEEK)}
          >
            주간
          </button>
        </div>
        <div className='flex justify-between'>
          <button onClick={() => handleNavigate('prev')}>
            {viewMode === VIEW_MODE.MONTH ? '이전달' : '이전주'}
          </button>
          <div>
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
          </div>
          <button onClick={() => handleNavigate('next')}>
            {viewMode === VIEW_MODE.MONTH ? '다음달' : '다음주'}
          </button>
        </div>
      </div>

      <div className='gap-1 grid grid-cols-7'>
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className='font-bold text-center'>
            {day}
          </div>
        ))}

        {viewMode === VIEW_MODE.MONTH ? (
          <>
            {[...Array(getFirstDayOfMonth(selectedDate))].map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {[...Array(getDaysInMonth(selectedDate))].map((_, index) => (
              <DayBox
                key={index + 1}
                date={index + 1}
                isSelected={index + 1 === selectedDate.getDate()}
                onSelect={handleSelectDate}
              />
            ))}
          </>
        ) : (
          getWeekDates().map((date) =>
            date.getMonth() === selectedDate.getMonth() ? (
              <DayBox
                key={date.getTime()}
                date={date.getDate()}
                isSelected={
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth()
                }
                onSelect={handleSelectDate}
              />
            ) : (
              <div key={`not-current-month-${date.getDate()}`} />
            ),
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
