import { UserType } from 'types/common';
import { instance } from './config';

export const postLogin = async (code: string) => {
  const res = await instance.post('/auth/social-login', {
    code,
    provider: 'kakao',
  });
  const data = res.data as { isOnboarding: boolean };
  return data.isOnboarding;
};

export const postOnboarding = async (body: UserType) => {
  const res = await instance.post('/auth/register', body);
  const data = res.data as { accessToken: string };
  return data.accessToken;
};

export const postRefreshToken = async () => {
  const res = await instance.post('/auth/refresh');
  const data = res.data as { accessToken: string };
  return data.accessToken;
};
