import { Cookies } from 'react-cookie';
import { ONBOARDING_TOKEN, REFRESH_TOKEN } from 'utils/handleToken';
import { UserType } from 'types/common';
import { instance } from './config';

export const postLogin = async (code: string) => {
  const res = await instance.post('/auth/social-login', {
    code,
    provider: 'kakao',
  });
  const data = res.data as
    | {
        isOnboarding: true;
        refreshToken: string;
      }
    | {
        isOnboarding: false;
        accessToken: string;
        refreshToken: string;
      };
  return data;
};

export const postOnboarding = async (body: UserType) => {
  const cookieStore = new Cookies();
  const onboardingToken = cookieStore.get(ONBOARDING_TOKEN);
  const res = await instance.post('/auth/register', body, {
    headers: {
      Authorization: `Bearer ${onboardingToken}`,
    },
  });
  const data = res.data as { accessToken: string; refreshToken: string };
  return data;
};

export const postRefreshToken = async () => {
  const cookieStore = new Cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN);
  console.log('REFRESH: ', refreshToken);
  const res = await instance.post('/auth/refresh-token', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const data = res.data as { accessToken: string };
  return data.accessToken;
};
