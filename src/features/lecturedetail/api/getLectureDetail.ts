import { useQuery } from '@tanstack/react-query';
import { authInstance } from 'services/config';
import { LectureDetailResponse } from '../types/lecturedetail';

const GetLectureDetail = async (
  lectureId: number,
): Promise<LectureDetailResponse> => {
  const response = await authInstance.get(`/lecture/${lectureId}`);
  return response.data;
};

export const useGetLectureDetail = (lectureId: number) => {
  return useQuery({
    queryKey: ['lectureDetail', lectureId],
    queryFn: () => GetLectureDetail(lectureId),
  });
};
