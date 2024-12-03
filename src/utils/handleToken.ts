import { authInstance } from 'services/config';
import { removeSession } from './handleSession';

export const REFRESH_TOKEN = 'refresh-token';
export const ONBOARDING_TOKEN = 'onboarding-token';

export const getRefreshToken = () => {
  const value = localStorage.getItem(REFRESH_TOKEN);
  return value;
};

export const setRefreshToken = (value: string) => {
  console.log('SET');
  localStorage.setItem(REFRESH_TOKEN, value);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

export const setAccessToken = (token: string) => {
  authInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const handleLogout = () => {
  removeSession();
  removeRefreshToken();
};
