import { instance } from './config';

export const postLogin = async (code: string) => {
  const res = await instance.post('/auth/social-login', {
    code,
    provider: 'kakao',
  });
  const data = res.data as { isOnboarding: boolean };
  return data.isOnboarding;
};
