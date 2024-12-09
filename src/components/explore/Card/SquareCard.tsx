import { CardType } from '.';

type Props = Omit<CardType, 'description'>;

const SquareCard = ({ title, guide, imageSrc }: Props) => {
  return (
    <button className='relative h-[17rem] w-[17rem] shrink-0 overflow-hidden rounded-10'>
      <img
        src={imageSrc}
        alt='클래스 대표 사진'
        className='h-full w-full object-cover'
      />
      <div className='absolute bottom-12 right-12 flex w-[14.6rem] flex-col gap-4 text-right'>
        <span className='text-12 font-600 text-green'>{guide}</span>
        <span className='line-clamp-2 text-16 font-500 leading-[2.2rem]'>
          {title}
        </span>
      </div>
    </button>
  );
};

export default SquareCard;
