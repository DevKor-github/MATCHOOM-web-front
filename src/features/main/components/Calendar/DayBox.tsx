interface DayBoxProps {
  date: number;
  isSelected: boolean;
  onSelect: (date: number) => void;
  hasClass: boolean;
}

const DAY_STYLE = {
  SELECTED:
    'relative w-44 text-center bg-green text-black h-60 rounded-12 font-600 flex flex-col items-center justify-center',
  UNSELECTED:
    'relative w-44 text-center bg-background text-white h-60 rounded-12 font-600 flex flex-col items-center justify-center',
};

const CIRCLE_STYLE = {
  SELECTED: 'w-4 h-4 rounded-full bg-black absolute bottom-8',
  UNSELECTED: 'w-4 h-4 rounded-full bg-white absolute bottom-8',
};

const DayBox = ({ date, isSelected, onSelect, hasClass }: DayBoxProps) => {
  return (
    <button
      onClick={() => onSelect(date)}
      className={`${isSelected ? DAY_STYLE.SELECTED : DAY_STYLE.UNSELECTED}`}
    >
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

export default DayBox;
