import { useRef, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useWatch,
  useFieldArray,
} from 'react-hook-form';
import { formatDate } from 'utils/date';
import { AddClassFormType } from 'features/add-class/types/add-class';
import BoxButton from '../Button/BoxButton';
import DateTimePicker from '../Button/DateTimePicker';
import Label from '../Input/Label';
import NumberInput from '../Input/NumberInput';
import TextInput from '../Input/TextInput';

const TEXT = {
  header: '클래스 정보를 알려주세요',
  label: {
    type: '유형',
    date: '일정',
    room: '강의실',
    price: '가격',
  },
  button: {
    addDate: '+ 일정 추가하기',
    regular: '정기',
  },
  placeholder: {
    startDate: '시작일',
    endDate: '종료일',
    room: '건물,층,호실 정보를 입력해주세요.',
    price: '가격을 입력해 주세요',
  },
  point: 'point',
};

interface LectureEssentialInfoTabProps {
  control: Control<AddClassFormType>;
  errors: FieldErrors<AddClassFormType>;
}

const LectureEssentialInfoTab = ({
  control,
  errors,
}: LectureEssentialInfoTabProps) => {
  const [lectureTimeIndex, setLectureTimeIndex] = useState<number>(0);
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);
  const lectureTimeList = useWatch({
    control,
    name: 'lectureTime',
  });
  const { append } = useFieldArray({
    control,
    name: 'lectureTime',
  });

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

  const handleAddDateClick = () => {
    append({
      start: new Date(),
      end: new Date(),
    });
  };

  const handleStartDateClick = (index: number) => {
    setLectureTimeIndex(index);
    if (startDateRef.current) {
      startDateRef.current.style.display = 'block';
    }
  };

  const handleEndDateClick = (index: number) => {
    setLectureTimeIndex(index);
    if (endDateRef.current) {
      endDateRef.current.style.display = 'block';
    }
  };

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='mb-12 h-44 text-24 font-700 text-white'>
        {TEXT.header}
      </div>
      <div className='flex h-full w-full flex-col gap-24'>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label
            label={TEXT.label.date}
            error={
              Array.isArray(errors.lectureTime)
                ? errors.lectureTime[0]?.start
                : errors.lectureTime
            }
          />
          <div className='flex flex-col gap-8'>
            <BoxButton
              text={TEXT.button.addDate}
              onClick={handleAddDateClick}
              textStyle='text-16 text-white font-700'
            />

            <div className='flex max-h-240 flex-col gap-8 overflow-y-scroll'>
              {lectureTimeList.map(({ start, end }, index) => {
                return (
                  <div className='flex flex-row gap-8' key={`${start}-${end}`}>
                    <Controller
                      name={`lectureTime.${index}.start`}
                      control={control}
                      render={({ field: { value } }) => (
                        <BoxButton
                          text={formatDate(value)}
                          onClick={() => handleStartDateClick(index)}
                          textStyle='text-16 text-white'
                        />
                      )}
                    />
                    <Controller
                      name={`lectureTime.${index}.end`}
                      control={control}
                      render={({ field: { value } }) => (
                        <BoxButton
                          text={formatDate(value)}
                          onClick={() => handleEndDateClick(index)}
                          textStyle='text-16 text-white'
                        />
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.room} error={errors.room} />
          <div className='flex flex-row gap-8'>
            <TextInput
              name='room'
              placeholder={TEXT.placeholder.room}
              control={control}
            />
          </div>
        </div>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.price} error={errors.price} />
          <div className='flex flex-row items-center gap-8'>
            <NumberInput
              name='price'
              placeholder={TEXT.placeholder.price}
              control={control}
            />
            <div className='text-16 font-600 text-white'>{TEXT.point}</div>
          </div>
        </div>
      </div>
      <Controller
        name={`lectureTime.${lectureTimeIndex}.start`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div
            className='w-full'
            ref={startDateRef}
            style={{ display: 'none' }}
          >
            <div className='flex w-full flex-col items-end justify-end bg-black'>
              <DateTimePicker value={value} onChange={onChange} />
            </div>
          </div>
        )}
      />
      <Controller
        name={`lectureTime.${lectureTimeIndex}.end`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className='w-full' ref={endDateRef} style={{ display: 'none' }}>
            <div className='flex w-full flex-col items-end justify-end bg-black'>
              <DateTimePicker value={value} onChange={onChange} />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default LectureEssentialInfoTab;
