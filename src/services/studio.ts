import { useQuery } from '@tanstack/react-query';
import { instance } from './config';

const getStudio = async (id: number) => {
  const res = await instance.get(`/studio/${id}/info`);
  const data = res.data as {
    name: string;
    description: string;
    policy: string;
    thumbnail: string;
    lectures: {
      lectureId: number;
      thumbnail: string;
      lectureTime: {
        end: string;
        start: string;
      }[];
      studioName: string;
      instructor: string;
      description: string | null;
    }[];
  };
  return data;
};

export const useGetStudio = (id: number) =>
  useQuery({
    queryKey: ['studio', id],
    queryFn: () => getStudio(id),
  });

const getStudioTicket = async (id: number) => {
  const res = await instance.get(`/${id}/ticket`);
  const data = res.data as {
    id: number;
    point: number;
    price: number;
  }[];
  return data;
};

export const useGetStudioTicket = (id: number) =>
  useQuery({
    queryKey: ['studio', id, 'ticket'],
    queryFn: () => getStudioTicket(id),
  });
