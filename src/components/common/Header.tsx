import { useNavigate } from 'react-router-dom';
import LogoIcon from 'assets/icons/logo-header.svg';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='flex h-60 w-full items-center justify-between px-20'>
      <LogoIcon />
      <button
        onClick={() => navigate('/login')}
        className='text-14 font-600 text-green'
      >
        로그인
      </button>
    </header>
  );
};

export default Header;
