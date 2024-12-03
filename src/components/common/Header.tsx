import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, SessionType } from 'utils/handleSession';
import { handleLogout } from 'utils/handleToken';
import LogoIcon from 'assets/icons/logo-header.svg';

const Header = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionType | undefined>(undefined);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setSession(session);
    }
  }, []);

  const handleClick = () => {
    if (session) {
      handleLogout();
      window.location.href = '/1';
    } else {
      navigate('/login');
    }
  };

  return (
    <header className='flex h-60 w-full items-center justify-between px-20'>
      <LogoIcon />
      <button onClick={handleClick} className='text-14 font-600 text-green'>
        {session?.name || '로그인'}
      </button>
    </header>
  );
};

export default Header;
