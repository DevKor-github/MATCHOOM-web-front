import { CardType } from '.';

const PrimaryCard = ({ title, description, guide, imageSrc }: CardType) => {
  return (
    <button className='flex h-84 w-full shrink-0 gap-12'>
      <div className='h-84 w-84 shrink-0'>
        <img
          src={imageSrc}
          alt='클래스 대표 사진'
          className='h-full w-full rounded-10 object-cover'
        />
      </div>
      <div className='flex h-full w-full flex-col justify-between gap-4 text-left'>
        <span className='h-[1.4rem] text-12 font-600 text-green'>{guide}</span>
        <span className='h-[2.2rem] text-16 font-500 leading-[2.2rem] text-white'>
          {title}
        </span>
        <span className='work line-clamp-2 h-40 text-14 font-400 leading-[2rem] text-grey-4'>
          {description}
        </span>
      </div>
    </button>
  );
};

export default PrimaryCard;
