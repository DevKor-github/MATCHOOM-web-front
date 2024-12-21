const RoundButton = ({
  onPress,
  text,
}: {
  onPress: () => void;
  text: string;
}) => {
  return (
    <button
      className='h-56 w-full cursor-pointer border-none bg-none'
      onClick={onPress}
    >
      <div className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-blue to-green'>
        <span className='text-16 font-700 text-black'>{text}</span>
      </div>
    </button>
  );
};

export default RoundButton;
