import { useNavigate, useParams } from 'react-router-dom';

const TEXT = {
  notice: '공지 / 규정',
  wallet: '지갑',
};

const StudioHeader = ({
  name,
  imageSrc,
  noticeOpen,
}: {
  name: string;
  imageSrc: string;
  noticeOpen: () => void;
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleWalletClick = () => {
    navigate(`/${id}/wallet`);
  };

  return (
    <div className='flex w-full flex-row items-center justify-between gap-12'>
      <img className='h-120 w-120 rounded-24' src={imageSrc} alt='logo' />
      <div className='flex flex-col gap-12'>
        <div className='font-bold text-20 text-white'>{name}</div>
        <div className='flex flex-row gap-8'>
          <button
            className='flex-1 rounded-12 bg-grey-4 py-8 text-center text-16'
            onClick={noticeOpen}
          >
            {TEXT.notice}
          </button>
          <button
            className='flex-1 rounded-12 bg-grey-4 py-8 text-center text-16'
            onClick={handleWalletClick}
          >
            {TEXT.wallet}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioHeader;
