import { twMerge } from 'tailwind-merge';

const ButtonStyle = {
  selected: 'bg-background border-green border-2',
  unselected: 'bg-inputGray border-inputGray border-2',
  selectedText: 'text-green',
  unselectedText: 'text-white',
};

const LabelButton = ({
  onPress,
  text,
  textStyle,
  isSelected,
}: {
  onPress: () => void;
  text: string;
  textStyle?: string;
  isSelected: boolean;
}) => {
  return (
    <button
      className={twMerge(
        'h-full items-center justify-center rounded-full px-4',
        isSelected ? ButtonStyle.selected : ButtonStyle.unselected,
      )}
      onClick={onPress}
    >
      <span
        className={twMerge(
          'text-base font-normal',
          isSelected ? ButtonStyle.selectedText : ButtonStyle.unselectedText,
          textStyle,
        )}
      >
        {text}
      </span>
    </button>
  );
};

export default LabelButton;
