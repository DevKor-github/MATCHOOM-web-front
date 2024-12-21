import { useNavigate } from 'react-router-dom';
import BackIcon from 'assets/icons/left-arrow.png';
import LogoIcon from 'assets/icons/logo-header.svg';

const StudioHeader = ({
  title,
  handleGoBack,
}: {
  title: string;
  handleGoBack?: () => void;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (handleGoBack) {
      handleGoBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className='flex h-60 w-full items-center justify-center px-20'>
      <img
        src={BackIcon}
        alt='back'
        onClick={handleClick}
        className='absolute left-20 h-28 w-28'
      />
      <span className='text-20 font-700 text-white'>{title}</span>
    </header>
  );
};

export default StudioHeader;
