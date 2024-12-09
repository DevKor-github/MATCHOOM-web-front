import Picker from 'react-mobile-picker';
import { twMerge } from 'tailwind-merge';

const PickerStyle = {
  selected: 'bg-grey-7 text-white',
  unselected: 'text-grey-7',
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const selections = {
  month: MONTHS,
  day: Array.from({ length: 31 }, (_v, i) => i + 1),
  year: Array.from(
    { length: 24 },
    (_v, i) => i + Number(new Date().getFullYear()) - 12,
  ),
  hour: Array.from({ length: 24 }, (_v, i) => i),
  minute: Array.from({ length: 12 }, (_v, i) => i * 5),
};

const fetchDate = ({ date }: { date: Date }) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  const year = dateObj.getFullYear();
  const month = MONTHS[dateObj.getMonth()];
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = Math.floor(dateObj.getMinutes() / 5) * 5;
  return { year, month, day, hour, minute };
};

const DateTimePicker = ({
  value = new Date(),
  onChange,
}: {
  value?: Date;
  onChange: (value: Date) => void;
}) => {
  const handleChange = (value: {
    year: number;
    month: string;
    day: number;
    hour: number;
    minute: number;
  }) => {
    onChange(
      new Date(
        value.year,
        MONTHS.indexOf(value.month),
        value.day,
        value.hour,
        value.minute,
      ),
    );
  };

  return (
    <div className='rounded-lg w-full bg-background p-4'>
      <Picker
        value={fetchDate({ date: value })}
        onChange={handleChange}
        wheelMode='natural'
      >
        {Object.keys(selections).map((date) => (
          <Picker.Column key={date} name={date}>
            {selections[date as keyof typeof selections].map((option) => (
              <Picker.Item key={option} value={option}>
                {({ selected }) => (
                  <div
                    className={twMerge(
                      'rounded flex h-full w-full items-center justify-center',
                      selected ? PickerStyle.selected : PickerStyle.unselected,
                    )}
                  >
                    {date === 'hour'
                      ? `${String(option).padStart(2, '0')}시`
                      : date === 'minute'
                        ? `${String(option).padStart(2, '0')}분`
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

export default DateTimePicker;
