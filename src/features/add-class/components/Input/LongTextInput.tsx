import { Control, Controller } from 'react-hook-form';

const LongTextInput = ({
  name,
  placeholder,
  control,
  keyboardType = 'default',
}: {
  name: string;
  placeholder: string;
  control: Control<any>;
  keyboardType?: 'default' | 'numeric';
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <textarea
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={keyboardType === 'numeric' ? 'numeric' : 'text'}
        className='rounded-xl mb-4 h-120 w-full rounded-12 bg-grey-7 p-16'
      />
    )}
  />
);

export default LongTextInput;
