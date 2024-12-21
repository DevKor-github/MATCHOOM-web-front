interface DayBoxProps {
  date: number;
  onSelect: (date: number) => void;
  hasClass: boolean;
}

const DayBox = ({ date, onSelect, hasClass }: DayBoxProps) => {
  return (
    <button
      onClick={() => onSelect(date)}
      className='relative flex h-60 w-44 flex-col items-center justify-center rounded-12 bg-background text-center font-600 text-white'
    >
      {date}
      {hasClass && (
        <div className='absolute bottom-8 h-4 w-4 rounded-full bg-white' />
      )}
    </button>
  );
};

export default DayBox;
