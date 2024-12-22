import { ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
  required?: boolean;
}

const TextInput = <T extends FieldValues>({
  children,
  placeholder,
  required,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  return (
    <div className='relative flex w-full flex-col gap-8'>
      <label htmlFor={field.name} className='block h-[20px]'>
        {children}
        {required && <span className='text-[#FF5470]'> *</span>}
      </label>
      <input
        id={field.name}
        placeholder={placeholder}
        {...field}
        className={`h-[50px] rounded-10 bg-grey-7 px-16 text-16 font-500 outline-none ${fieldState?.error ? 'border-[#FF5470]' : ''}`}
      />
      {/* <p className='text-red-500 h-12 text-12 font-400'>
        {fieldState?.error?.message}
      </p> */}
    </div>
  );
};

export default TextInput;
