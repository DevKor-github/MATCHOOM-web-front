import { useEffect, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface SelectDropdownProps {
  control: Control<any>;
  list: string[];
  name: string;
  defaultValue?: string;
}

const SelectDropdown = ({
  control,
  list,
  name,
  defaultValue,
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className='relative w-full' ref={dropdownRef}>
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className='rounded-xl mb-4 flex h-52 w-full items-center justify-center rounded-12 bg-grey-7 p-16 text-center'
          >
            {value !== -1 ? list[value] : defaultValue}
          </button>

          {isOpen && (
            <div className='z-10 mt-1 rounded-lg absolute max-h-160 w-full overflow-y-auto bg-grey-6'>
              {list.map((label, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => {
                    onChange(index);
                    setIsOpen(false);
                  }}
                  className={twMerge(
                    'rounded-xl mb-4 h-52 w-full rounded-12 bg-grey-7 p-16 text-white',
                    value === index ? 'border-2 border-green' : '',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default SelectDropdown;
