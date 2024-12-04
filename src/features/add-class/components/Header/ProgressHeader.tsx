interface ProgressHeaderProps {
  step: number;
  totalSteps: number;
}

const ProgressHeader = ({ step, totalSteps }: ProgressHeaderProps) => {
  return (
    <div className='flex h-16 w-full items-center rounded-full'>
      <div
        className='h-8 w-full rounded-full bg-green transition-all duration-300'
        style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
      />
    </div>
  );
};

export default ProgressHeader;
