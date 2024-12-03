import axios, { AxiosError } from 'axios';
import { postRefreshToken } from './auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 20000,
});

export const authInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 20000,
});

authInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const { config } = error;

    if (error.status === 401 && config) {
      try {
        const accessToken = await postRefreshToken();
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return instance(config);
      } catch (e) {
        const error = e as AxiosError;
        if (error.status === 401) {
          // handleLogout();
          window.location.href = '/login';
        }
        console.error(error);
      }
    }

    return Promise.reject(error);
  },
);

export const setAuthHeader = (token: string) => {
  authInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
