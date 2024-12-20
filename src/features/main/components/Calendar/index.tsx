import { DAYS_OF_WEEK, MONTH_NAMES } from 'constants/date';
import { useState, useRef } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from 'features/main/utils/date';
import DayBox from './DayBox';

const TEXT = {
  MONTH_VIEW: '월별보기',
  WEEK_VIEW: '주별보기',
};

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
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODE.WEEK);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  const dragThreshold = 50;

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

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const currentX =
      'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;

    const diff = currentX - dragStartX.current;

    if (Math.abs(diff) >= dragThreshold) {
      handleNavigate(diff > 0 ? 'prev' : 'next');
    }

    setIsDragging(false);
  };

  return (
    <div className='w-full bg-background'>
      <div className='mb-4 flex items-center justify-between px-8'>
        <div className='text-center text-16 font-700'>
          {MONTH_NAMES[selectedDate.getMonth()]}
        </div>
        <button
          className='px-2 py-1 rounded bg-blue-500 text-white'
          onClick={() =>
            setViewMode(
              viewMode === VIEW_MODE.MONTH ? VIEW_MODE.WEEK : VIEW_MODE.MONTH,
            )
          }
        >
          {viewMode === VIEW_MODE.MONTH ? TEXT.WEEK_VIEW : TEXT.MONTH_VIEW}
        </button>
      </div>

      <div
        className='grid w-full select-none grid-cols-7 bg-background'
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={(e) => isDragging && handleDragEnd(e)}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
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
              <div
                key={index + 1}
                className='flex flex-1 items-center justify-center'
              >
                <DayBox
                  date={index + 1}
                  isSelected={index + 1 === selectedDate.getDate()}
                  onSelect={handleSelectDate}
                  hasClass={true}
                />
              </div>
            ))}
          </>
        ) : (
          getWeekDates().map((date) =>
            date.getMonth() === selectedDate.getMonth() ? (
              <div
                key={date.getTime()}
                className='flex flex-1 items-center justify-center'
              >
                <DayBox
                  date={date.getDate()}
                  isSelected={
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth()
                  }
                  onSelect={handleSelectDate}
                  hasClass={true}
                />
              </div>
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
