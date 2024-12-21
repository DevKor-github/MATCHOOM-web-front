import { useState, useRef, useEffect } from 'react';
import PlusButtonIcon from 'assets/icons/plus-button.png';
import AddClassButton from './AddClassButton';
import ManageButton from './ManageButton';

const buttonStyle = {
  isOpen:
    'font-bold flex h-60 w-60 items-center justify-center rounded-full bg-white text-20 transition-transform rotate-45',
  isClose:
    'font-bold flex h-60 w-60 items-center justify-center rounded-full bg-white text-20 transition-transform',
};

const MainButtonField = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className='z-40 fixed inset-0 bg-black/60'
          onClick={() => setIsOpen(false)}
        />
      )}
      <div ref={buttonRef} className='z-50 absolute bottom-48 right-24'>
        {isOpen && (
          <div className='mb-12 flex flex-col gap-16'>
            <AddClassButton />
            <ManageButton />
          </div>
        )}
        <button
          className={isOpen ? buttonStyle.isOpen : buttonStyle.isClose}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={PlusButtonIcon}
            alt='manage'
            className='h-full w-full rounded-full object-cover'
          />
        </button>
      </div>
    </>
  );
};

export default MainButtonField;
