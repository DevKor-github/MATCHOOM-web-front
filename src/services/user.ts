import { useMutation, useQuery } from '@tanstack/react-query';
import { UserType } from 'types/common';
import { authInstance } from './config';

export const getUser = async () => {
  const res = await authInstance.get(`/user`);
  const data = res.data as UserType;
  return data;
};

export const useGetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

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

const postPurchasePoint = async (studioId: number, ticketId: number) => {
  await authInstance.post(`/${studioId}/point/purchase`, {
    ticketId,
  });
};

export const usePostPurchasePoint = (studioId: number, ticketId: number) =>
  useMutation({
    mutationFn: () => postPurchasePoint(studioId, ticketId),
  });
