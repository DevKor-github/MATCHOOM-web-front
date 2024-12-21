import { useQuery } from '@tanstack/react-query';
import { UserType } from 'types/common';
import { authInstance } from './config';

export const getUser = async () => {
  const res = await authInstance.get('/user');
  const data = res.data as UserType;
  return data;
};

const getUserPoint = async (id: number) => {
  const res = await authInstance.get(`/${id}/point`);
  const data = res.data as {
    point: number;
    expiration: string;
  }[];
  return data;
};

export const useGetUserPoint = (id: number) =>
  useQuery({
    queryKey: ['user', id, 'point'],
    queryFn: () => getUserPoint(id),
  });
