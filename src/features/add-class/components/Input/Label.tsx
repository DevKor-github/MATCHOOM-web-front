import { FieldError } from 'react-hook-form';

const Label = ({ label, error }: { label: string; error?: FieldError }) => (
  <div className='flex flex-row'>
    <div className='flex flex-row'>
      <span className='text-14 text-white'>{label}</span>
    </div>
    {error && (
      <span className='text-sm absolute right-12 text-red-warning'>
        * {error.message}
      </span>
    )}
  </div>
);

export default Label;
