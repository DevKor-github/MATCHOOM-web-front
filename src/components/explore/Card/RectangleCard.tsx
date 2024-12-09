import { CardType } from '.';

type Props = Omit<CardType, 'guide'>;

const RectangleCard = ({ title, description, imageSrc }: Props) => {
  return (
    <button className='relative h-140 w-[28.2rem] shrink-0 overflow-hidden rounded-10'>
      <img
        src={imageSrc}
        alt='클래스 대표 사진'
        className='h-full w-full object-cover'
      />
      <div className='absolute bottom-12 right-12 flex w-[25.8rem] flex-col gap-4 text-right'>
        <span className='text-16 font-500 leading-[2.2rem]'>{title}</span>
        <span className='line-clamp-2 text-14 font-500 leading-[2rem] text-grey-4'>
          {description}
        </span>
      </div>
    </button>
  );
};

export default RectangleCard;
