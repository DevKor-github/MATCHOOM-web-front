import { format } from 'date-fns';
import CountIcon from '../../../assets/icons/counticon.svg';
import DateIcon from '../../../assets/icons/dateicon.svg';
import LocationIcon from '../../../assets/icons/locationicon.svg';
import LogoIcon from '../../../assets/icons/logoicon.svg';
import TimeIcon from '../../../assets/icons/timeicon.svg';

const formatLectureTime = (lectureTime: { start: string; end: string }[]) => {
  if (lectureTime.length === 0) return { date: '', time: '' };

  const firstLecture = lectureTime[0];
  const formattedDate = format(new Date(firstLecture.start), 'yyyy-MM-dd');
  const formattedStartTime = format(new Date(firstLecture.start), 'HH:mm');
  const formattedEndTime = format(new Date(firstLecture.end), 'HH:mm');
  return {
    date: formattedDate,
    time: `${formattedStartTime} - ${formattedEndTime}`,
  };
};

const mapLevelToText = (level: number | undefined) => {
  switch (level) {
    case 0:
      return 'Free';
    case 1:
      return 'Basic';
    case 2:
      return 'Middle';
    case 3:
      return 'Professional';
    default:
      return 'Unknown';
  }
};

const ClassInfo = ({
  lectureTime = [],
  location,
  level,
  price,
  minCapacity,
  maxCapacity,
}: {
  lectureTime: { start: string; end: string }[];
  location: string | undefined;
  level: number | undefined;
  price: number | undefined;
  minCapacity: number | undefined;
  maxCapacity: number | undefined;
}) => {
  const { date, time } = formatLectureTime(lectureTime);
  const levelText = mapLevelToText(level);

  return (
    <div className='mx-20 mb-32 flex flex-col gap-4 text-white '>
      <div className='mb-28 flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-8'>
          <LogoIcon />
          <span className='text-16 font-500'>{levelText}</span>
        </div>
        <div className='text-20 font-600'>₩ {price}</div>
      </div>
      <div className='flex flex-row items-center gap-8'>
        <DateIcon />
        <span className='text-16 font-500'>{date}</span>
      </div>
      <div className='flex flex-row items-center gap-8'>
        <TimeIcon />
        <span className='text-16 font-500'>{time}</span>
      </div>
      <div className='flex flex-row items-center gap-8'>
        <LocationIcon />
        <span className='text-16 font-500'>{location}</span>
      </div>
      <div className='flex flex-row items-center gap-8'>
        <CountIcon />
        <span className='text-16 font-500'>
          신청 인원:
          <span className='ml-4 text-green'>
            {String(minCapacity).padStart(2, '0')}명
          </span>
          /{maxCapacity}명
        </span>
      </div>
    </div>
  );
};

export default ClassInfo;
