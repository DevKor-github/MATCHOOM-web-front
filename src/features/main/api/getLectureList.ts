import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { authInstance } from 'services/config';

type LectureListRequest = {
  studioId: number;
};

type LectureListResponse = {
  lectureId: number;
  title: string;
  description: string;
};

const getLectureList = async (
  studioId: number,
): Promise<LectureListResponse> => {
  const response = await authInstance.get(`${studioId}/lectures`);
  return response.data;
};

export const useGetLectureList = ({
  studioId,
}: LectureListRequest): UseQueryResult<LectureListResponse> => {
  return useQuery({
    queryKey: ['lectureList', studioId],
    queryFn: () => getLectureList(studioId),
  });
};
