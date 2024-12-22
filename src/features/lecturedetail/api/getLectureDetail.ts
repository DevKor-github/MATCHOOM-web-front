import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { authInstance } from 'services/config';

type LectureDetailRequest = {
  lectureId: number;
};

type LectureDetailResponse = {
  thumbnail: string;
  lectureTime: {
    start: string;
    end: string;
  }[];
  studioName: string;
  instructor: string;
  description: string;
  name: string;
  maxCapacity: number;
  minCapacity: number;
  room: string;
  applyTime: {
    starDiff: number;
    endDiff: number;
    startTime: string;
    endTime: string;
  }[];
  difficulty: number;
  genre: number;
  type: string;
  price: number;
  musicLink: string;
};

const GetLectureDetail = async (
  lectureId: number,
): Promise<LectureDetailResponse> => {
  const response = await authInstance.get(`/lecture/${lectureId}/info`);
  return response.data;
};

export const useGetLectureDetail = ({
  lectureId,
}: LectureDetailRequest): UseQueryResult<LectureDetailResponse> => {
  return useQuery({
    queryKey: ['lectureDetail', lectureId],
    queryFn: () => GetLectureDetail(lectureId),
  });
};
