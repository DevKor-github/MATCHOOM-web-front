interface Props {
  point: number;
  title: string;
  price: number;
}

const PointCard = ({ point, title, price }: Props) => {
  return (
    <li className='flex justify-between gap-12'>
      <div className='h-40 w-80 bg-grey-4'>{point}p</div>
      <div className='h-40 w-80 bg-grey-4'>{title}</div>
      <div>{price}원</div>
    </li>
  );
};

export default PointCard;
