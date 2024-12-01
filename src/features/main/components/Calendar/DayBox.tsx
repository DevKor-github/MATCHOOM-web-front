interface DayBoxProps {
  date: number;
  isSelected: boolean;
  onSelect: (date: number) => void;
}

const DAY_STYLE = {
  SELECTED: 'flex-1 text-center bg-grey-4 text-black',
  UNSELECTED: 'flex-1 text-center bg-grey-4 text-grey-6',
};

const DayBox = ({ date, isSelected, onSelect }: DayBoxProps) => {
  return (
    <button
      onClick={() => onSelect(date)}
      className={`${isSelected ? DAY_STYLE.SELECTED : DAY_STYLE.UNSELECTED}`}
    >
      {date}
    </button>
  );
};

export default DayBox;
