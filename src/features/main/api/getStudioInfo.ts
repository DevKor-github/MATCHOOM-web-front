import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { authInstance } from 'services/config';

type StudioInfoRequest = {
  studioId: number;
};

type StudioInfoResponse = {
  name: string;
  description: string;
  policy: string;
  thumbnail: string;
  lectures: {
    lectureId: number;
    thumbnail: string;
    studioName: string;
    instructor: string;
    description: string;
  }[];
};

const getStudioInfo = async (studioId: number): Promise<StudioInfoResponse> => {
  const response = await authInstance.get(`studio/${studioId}/info`);
  return response.data;
};

export const useGetStudioInfo = ({
  studioId,
}: StudioInfoRequest): UseQueryResult<StudioInfoResponse> => {
  return useQuery({
    queryKey: ['studioInfo', studioId],
    queryFn: () => getStudioInfo(studioId),
  });
};
