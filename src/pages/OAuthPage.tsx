import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { postLogin } from 'services/auth';

const OAuthPage = () => {
  const isInitiated = useRef(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOAuth = async () => {
    const code = searchParams.get('code');
    if (!code) {
      navigate('/login');
      return;
    }

    try {
      const isOnboarding = await postLogin(code);
      if (isOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    } catch (e) {
      console.error('로그인 실패: ', e);
      navigate('/login');
    }
  };

  useEffect(() => {
    if (isInitiated.current) {
      return;
    }
    isInitiated.current = true;
    handleOAuth();
  }, []);
  return <div />;
};

export default OAuthPage;
