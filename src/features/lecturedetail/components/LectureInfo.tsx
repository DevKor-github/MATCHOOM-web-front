import DateIcon from '../../../assets/icons/dateicon.svg';
import LocationIcon from '../../../assets/icons/locationicon.svg';
import LogoIcon from '../../../assets/icons/logoicon.svg';
import TimeIcon from '../../../assets/icons/timeicon.svg';

const ClassInfo = ({
  date,
  time,
  location,
  level,
  price,
}: {
  date: string;
  time: string;
  location: string;
  level: string;
  price: number;
}) => {
  return (
    <div className='mx-20 flex flex-col gap-4 text-white'>
      <div className='flex flex-row gap-8'>
        <DateIcon />
        <span className='text-12 font-500'>{date}</span>
      </div>
      <div className='flex flex-row gap-8'>
        <TimeIcon />
        <span className='text-12 font-500'>{time}</span>
      </div>
      <div className='flex flex-row gap-8'>
        <LocationIcon />
        <span className='text-12 font-500'>{location}</span>
      </div>
      <div className='flex flex-row gap-8'>
        <LogoIcon />
        <span className='text-12 font-500'>{level}</span>
      </div>
      <div className='text-20 font-600'>{price} P</div>
    </div>
  );
};

export default ClassInfo;
