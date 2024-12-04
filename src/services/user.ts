import { UserType } from 'types/common';
import { authInstance } from './config';

export const getUser = async () => {
  const res = await authInstance.get('/user');
  const data = res.data as UserType;
  return data;
};
