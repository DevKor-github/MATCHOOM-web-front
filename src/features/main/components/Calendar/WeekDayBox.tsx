import { DAYS_OF_WEEK } from 'constants/date';

interface WeekDayBoxProps {
  date: number;
  isSelected: boolean;
  onSelect: (date: number) => void;
  hasClass: boolean;
  index: number;
}

const DAY_STYLE = {
  SELECTED:
    'relative w-44 text-center bg-green text-black h-60 rounded-12 font-600 flex flex-col items-center justify-center',
  UNSELECTED:
    'relative w-44 text-center bg-background text-white h-60 rounded-12 font-600 flex flex-col items-center justify-center',
};

const CIRCLE_STYLE = {
  SELECTED: 'w-4 h-4 rounded-full bg-black my-4',
  UNSELECTED: 'w-4 h-4 rounded-full bg-white my-4',
};

const WeekDayBox = ({
  date,
  isSelected,
  onSelect,
  hasClass,
  index,
}: WeekDayBoxProps) => {
  return (
    <button
      onClick={() => onSelect(date)}
      className={`${isSelected ? DAY_STYLE.SELECTED : DAY_STYLE.UNSELECTED}`}
    >
      <div className='text-12 font-400'>{DAYS_OF_WEEK[index]}</div>
      {date}
      {hasClass && (
        <div
          className={
            isSelected ? CIRCLE_STYLE.SELECTED : CIRCLE_STYLE.UNSELECTED
          }
        />
      )}
    </button>
  );
};

export default WeekDayBox;
