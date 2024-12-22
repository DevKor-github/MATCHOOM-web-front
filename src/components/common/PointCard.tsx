interface Props {
  studioName: string;
  point: number;
  price: number;
}

const PointCard = ({ studioName, point, price }: Props) => {
  return (
    <li className='flex gap-[30px]'>
      <div className='flex h-[50px] w-100 items-center justify-center rounded-[5px] bg-gradient-to-t from-[#74EFC2] to-[#4174F7] text-14 font-600 text-black'>
        {point.toLocaleString()} p
      </div>
      <div className='flex flex-col justify-between py-4'>
        <div className='text-12 font-500 text-green'>{studioName}</div>
        <div className='text-16 font-700'>{price.toLocaleString()}원</div>
      </div>
    </li>
  );
};

export default PointCard;
