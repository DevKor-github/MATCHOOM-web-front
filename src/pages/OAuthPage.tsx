import { useEffect } from 'react';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setSession } from 'utils/handleSession';
import {
  ONBOARDING_TOKEN,
  setAccessToken,
  setRefreshToken,
} from 'utils/handleToken';
import { postLogin } from 'services/auth';
import { getUser } from 'services/user';

const OAuthPage = () => {
  const isInitiated = useRef(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [_, setCookie] = useCookies([ONBOARDING_TOKEN]);

  const handleOAuth = async () => {
    const code = searchParams.get('code');
    if (!code) {
      navigate('/login');
      return;
    }

    try {
      const res = await postLogin(code);
      if (res.isOnboarding) {
        setCookie(ONBOARDING_TOKEN, res.refreshToken, {
          path: '/',
        });
        navigate('/onboarding');
      } else {
        setRefreshToken(res.refreshToken);
        setAccessToken(res.accessToken);
        const user = await getUser();
        setSession(user);
        navigate('/1');
      }
    } catch (e) {
      navigate('/login');
      console.error('로그인 실패: ', e);
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
