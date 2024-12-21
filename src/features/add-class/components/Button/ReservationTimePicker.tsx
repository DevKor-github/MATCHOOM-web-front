import { RESERVATION_TIME_LIST } from 'constants/class';
import Picker from 'react-mobile-picker';
import { twMerge } from 'tailwind-merge';

const PickerStyle = {
  selected: 'bg-grey-7 text-white',
  unselected: 'text-grey-7',
};

interface TimePickerValue {
  [key: string]: number | string;
  time: string;
}

const selections = {
  time: RESERVATION_TIME_LIST,
};

const ReservationTimePicker = ({
  value = { time: '00:00' },
  onChange,
}: {
  value?: { time: string };
  onChange: (value: { time: string }) => void;
}) => {
  const pickerValue: TimePickerValue = {
    time: value.time,
  };

  const handleChange = (newValue: TimePickerValue) => {
    onChange({
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
                    {option}
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
