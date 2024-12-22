import { getRefreshToken } from 'utils/handleToken';
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

export const postOnboarding = async (body: UserType, token: string) => {
  const res = await instance.post('/auth/register', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.data as { accessToken: string; refreshToken: string };
  return data;
};

export const postRefreshToken = async () => {
  const refreshToken = getRefreshToken();
  const res = await instance.post('/auth/refresh-token', undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const data = res.data as { accessToken: string };
  return data.accessToken;
};
