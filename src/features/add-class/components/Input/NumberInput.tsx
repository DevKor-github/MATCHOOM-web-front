import { Control, Controller } from 'react-hook-form';

const NumberInput = ({
  name,
  placeholder,
  control,
}: {
  name: string;
  placeholder: string;
  control: Control<any>;
  secureTextEntry?: boolean;
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <input
        type='number'
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode='numeric'
        className='rounded-xl mb-4 h-52 w-full rounded-12 bg-grey-7 p-16'
      />
    )}
  />
);

export default NumberInput;
