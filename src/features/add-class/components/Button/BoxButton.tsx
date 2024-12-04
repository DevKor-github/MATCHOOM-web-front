import { twMerge } from 'tailwind-merge';

const ButtonStyle = {
  selected: 'bg-green',
  unselected: 'bg-grey-7',
  selectedText: 'text-black',
  unselectedText: 'text-white',
};

const BoxButton = ({
  onClick,
  text,
  textStyle,
  isSelected = false,
}: {
  onClick: () => void;
  text: string;
  textStyle?: string;
  isSelected?: boolean;
}) => {
  return (
    <button
      className={twMerge(
        'rounded-xl h-56 w-full items-center justify-center rounded-12 bg-green',
        isSelected ? ButtonStyle.selected : ButtonStyle.unselected,
      )}
      onClick={onClick}
    >
      <span
        className={twMerge(
          'text-base font-semibold',
          isSelected ? ButtonStyle.selectedText : ButtonStyle.unselectedText,
          textStyle,
        )}
      >
        {text}
      </span>
    </button>
  );
};

export default BoxButton;
