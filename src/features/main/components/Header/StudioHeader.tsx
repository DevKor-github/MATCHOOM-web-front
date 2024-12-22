import { useNavigate, useParams } from 'react-router-dom';

const TEXT = {
  notice: '공지/규정 확인하기  >',
  wallet: '지갑  >',
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
    <div className='flex w-full flex-row items-center gap-12'>
      <img
        className='h-84 w-84 rounded-12'
        src={imageSrc || 'https://via.placeholder.com/150'}
        alt='logo'
      />
      <div className='flex w-full flex-col gap-12'>
        <div className='font-bold text-20 font-700 text-white'>{name}</div>
        <div className='flex flex-row'>
          <button
            className='flex-1 rounded-12 bg-background py-8 text-center text-16 text-grey-4'
            onClick={noticeOpen}
          >
            {TEXT.notice}
          </button>
          <button
            className='flex-1 rounded-12 bg-background py-8 text-center text-16 text-green'
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
