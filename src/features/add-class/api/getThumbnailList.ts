import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { authInstance } from 'services/config';

type getThumbnailListRequest = {
  studioId: number;
};

type getThumbnailListResponse = {
  id: number;
  path: string;
}[];

const getThumbnailList = async (
  studioId: number,
): Promise<getThumbnailListResponse> => {
  const response = await authInstance.get(`/media/${studioId}`);
  return response.data;
};

export const useGetThumbnailList = ({
  studioId,
}: getThumbnailListRequest): UseQueryResult<getThumbnailListResponse> => {
  return useQuery({
    queryKey: ['thumbnailList', studioId],
    queryFn: () => getThumbnailList(studioId),
  });
};
