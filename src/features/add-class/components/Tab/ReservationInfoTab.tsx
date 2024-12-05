import { useRef, useEffect } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { formatReservationTime } from 'utils/date';
import { AddClassFormType } from 'features/add-class/types/add-class';
import BoxButton from '../Button/BoxButton';
import ReservationTimePicker from '../Button/ReservationTimePicker';
import Label from '../Input/Label';
import NumberInput from '../Input/NumberInput';

const TEXT = {
  header: '예약 정보를 설정해 주세요',
  label: {
    capacity: '정원',
    startTime: '예약 오픈 시간',
    endTime: '예약 마감 시간',
  },
  subLabel: {
    min: '최소',
    max: '최대',
    class: '클래스',
    open: '오픈',
    close: '마감',
  },
  placeholder: {
    min: '최소 수강 인원',
    max: '최대 수강 인원',
  },
};

interface ReservationInfoTabProps {
  control: Control<AddClassFormType>;
  errors: FieldErrors<AddClassFormType>;
}

const ReservationInfoTab = ({ control, errors }: ReservationInfoTabProps) => {
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startDateRef.current &&
        !startDateRef.current.contains(event.target as Node)
      ) {
        startDateRef.current.style.display = 'none';
      }
      if (
        endDateRef.current &&
        !endDateRef.current.contains(event.target as Node)
      ) {
        endDateRef.current.style.display = 'none';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStartDateClick = () => {
    if (startDateRef.current) {
      startDateRef.current.style.display = 'block';
    }
  };

  const handleEndDateClick = () => {
    if (endDateRef.current) {
      endDateRef.current.style.display = 'block';
    }
  };

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='mb-12 h-44 text-24 font-700 text-white'>
        {TEXT.header}
      </div>
      <div className='flex h-full w-full flex-col gap-8'>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.capacity} error={errors.minCapacity} />
          <div className='flex flex-row items-center gap-8'>
            <div className='whitespace-nowrap text-16 font-500 text-white'>
              {TEXT.subLabel.min}
            </div>
            <NumberInput
              name='minCapacity'
              placeholder={TEXT.placeholder.min}
              control={control}
            />
            <div className='w-24 whitespace-nowrap text-16 font-500 text-white'>
              {TEXT.subLabel.max}
            </div>
            <NumberInput
              name='maxCapacity'
              placeholder={TEXT.placeholder.max}
              control={control}
            />
          </div>

          <div className='flex h-fit w-full flex-col gap-8'>
            <Label label={TEXT.label.startTime} />
            <div className='flex flex-row gap-8'>
              <Controller
                name='applyTime.start'
                control={control}
                render={({ field: { value } }) => (
                  <BoxButton
                    text={formatReservationTime(
                      value?.diff || 0,
                      value?.time || '00:00',
                    )}
                    onClick={() => handleStartDateClick()}
                    textStyle='text-16 text-white'
                  />
                )}
              />
              <div className='flex flex-row items-center gap-8'></div>
            </div>

            <div className='flex h-fit w-full flex-col gap-8'>
              <Label label={TEXT.label.endTime} />
              <Controller
                name='applyTime.end'
                control={control}
                render={({ field: { value } }) => (
                  <BoxButton
                    text={formatReservationTime(
                      value?.diff || 0,
                      value?.time || '00:00',
                    )}
                    onClick={() => handleEndDateClick()}
                    textStyle='text-16 text-white'
                  />
                )}
              />
            </div>
          </div>
        </div>
        <Controller
          name='applyTime.start'
          control={control}
          render={({ field: { onChange, value } }) => (
            <div
              className='w-full'
              ref={startDateRef}
              style={{ display: 'none' }}
            >
              <div className='flex w-full flex-col items-end justify-end bg-black'>
                <ReservationTimePicker
                  value={{
                    diff: value?.diff || 0,
                    time: value?.time || '00:00',
                  }}
                  onChange={onChange}
                />
              </div>
            </div>
          )}
        />
        <Controller
          name='applyTime.end'
          control={control}
          render={({ field: { onChange, value } }) => (
            <div
              className='w-full'
              ref={endDateRef}
              style={{ display: 'none' }}
            >
              <div className='flex w-full flex-col items-end justify-end bg-black'>
                <ReservationTimePicker
                  value={{
                    diff: value?.diff || 0,
                    time: value?.time || '00:00',
                  }}
                  onChange={onChange}
                />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ReservationInfoTab;
