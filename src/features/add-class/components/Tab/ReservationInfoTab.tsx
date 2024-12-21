import { RESERVATION_DATE_DIFF_LIST } from 'constants/class';
import { useRef, useEffect, useState } from 'react';
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form';
import useBottomSheet from 'hooks/useBottomSheet';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';
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
    startDiff: '오픈 날짜',
    endDiff: '마감 날짜',
  },
};

const ButtonStyle = {
  isSelected: 'w-full bg-green text-black text-16 font-600 h-52 rounded-12',
  isNotSelected: 'w-full bg-grey-7 text-white text-16 font-600 h-52 rounded-12',
};

interface ReservationInfoTabProps {
  control: Control<AddClassFormType>;
  errors: FieldErrors<AddClassFormType>;
}

const ReservationInfoTab = ({ control, errors }: ReservationInfoTabProps) => {
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();
  const [controlName, setControlName] = useState('start');
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

  const startTime = useWatch({
    control,
    name: 'applyTime.start.time',
  });

  const endTime = useWatch({
    control,
    name: 'applyTime.end.time',
  });

  const startDiff = useWatch({
    control,
    name: 'applyTime.start.diff',
  });

  const endDiff = useWatch({
    control,
    name: 'applyTime.end.diff',
  });

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
              <BoxButton
                text={
                  RESERVATION_DATE_DIFF_LIST[startDiff] ||
                  TEXT.placeholder.startDiff
                }
                onClick={() => {
                  setControlName('start');
                  openBottomSheet();
                }}
                textStyle='text-16 text-white'
              />
              <BoxButton
                text={startTime || '00:00'}
                onClick={() => handleStartDateClick()}
                textStyle='text-16 text-white'
              />
            </div>

            <div className='flex h-fit w-full flex-col gap-8'>
              <Label label={TEXT.label.endTime} />
              <div className='flex flex-row gap-8'>
                <BoxButton
                  text={
                    RESERVATION_DATE_DIFF_LIST[endDiff] ||
                    TEXT.placeholder.endDiff
                  }
                  onClick={() => {
                    setControlName('end');
                    openBottomSheet();
                  }}
                  textStyle='text-16 text-white'
                />
                <BoxButton
                  text={endTime || '00:00'}
                  onClick={() => handleEndDateClick()}
                  textStyle='text-16 text-white'
                />
              </div>
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
                    time: value?.time || '00:00',
                  }}
                  onChange={onChange}
                />
              </div>
            </div>
          )}
        />
      </div>
      <BottomSheet ref={bottomSheetRef} title={'클래스 장르'}>
        <div className='h-full min-h-500 w-full rounded-24 px-12 '>
          <Controller
            name={
              controlName === 'start'
                ? 'applyTime.start.diff'
                : 'applyTime.end.diff'
            }
            control={control}
            render={({ field }) => (
              <div className='flex flex-col gap-4'>
                {RESERVATION_DATE_DIFF_LIST.map((name) => (
                  <button
                    key={`genre-${name}`}
                    type='button'
                    onClick={() => {
                      field.onChange(RESERVATION_DATE_DIFF_LIST.indexOf(name));
                      closeBottomSheet();
                    }}
                    className={
                      (controlName === 'start' ? startDiff : endDiff) ===
                      RESERVATION_DATE_DIFF_LIST.indexOf(name)
                        ? ButtonStyle.isSelected
                        : ButtonStyle.isNotSelected
                    }
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default ReservationInfoTab;
