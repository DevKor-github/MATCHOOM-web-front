import {
  RESERVATION_DATE_DIFF_LIST,
  RESERVATION_TIME_LIST,
} from 'constants/class';
import Picker from 'react-mobile-picker';
import { twMerge } from 'tailwind-merge';

const PickerStyle = {
  selected: 'bg-grey-7 text-white',
  unselected: 'text-grey-7',
};

interface TimePickerValue {
  [key: string]: number | string;
  diff: number;
  time: string;
}

const selections = {
  diff: RESERVATION_DATE_DIFF_LIST.map((_, index) => index),
  time: RESERVATION_TIME_LIST,
};

const ReservationTimePicker = ({
  value = { diff: 0, time: '00:00' },
  onChange,
}: {
  value?: { diff: number; time: string };
  onChange: (value: { diff: number; time: string }) => void;
}) => {
  const pickerValue: TimePickerValue = {
    diff: value.diff,
    time: value.time,
  };

  const handleChange = (newValue: TimePickerValue) => {
    onChange({
      diff: Number(newValue.diff),
      time: newValue.time,
    });
  };

  return (
    <div className='rounded-lg w-full bg-background p-4'>
      <Picker value={pickerValue} onChange={handleChange} wheelMode='natural'>
        {Object.keys(selections).map((key) => (
          <Picker.Column key={key} name={key}>
            {selections[key as keyof typeof selections].map((option) => (
              <Picker.Item key={option} value={option}>
                {({ selected }) => (
                  <div
                    className={twMerge(
                      'rounded flex h-full w-full items-center justify-center',
                      selected ? PickerStyle.selected : PickerStyle.unselected,
                    )}
                  >
                    {key === 'diff'
                      ? RESERVATION_DATE_DIFF_LIST[option as number]
                      : option}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
    </div>
  );
};

export default ReservationTimePicker;
