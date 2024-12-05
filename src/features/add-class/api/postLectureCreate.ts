import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { authInstance } from 'services/config';
import { addClassSchema } from '../types/add-class';

type PostLectureCreateResponse = {
  lectureId: number;
};

type PostLectureCreateRequest = z.infer<typeof addClassSchema>;

const postLectureCreate = async (
  data: PostLectureCreateRequest,
): Promise<PostLectureCreateResponse> => {
  const request = {
    ...data,
    applyTime: {
      startDiff: data.applyTime.start.diff,
      startTime: data.applyTime.start.time,
      endDiff: data.applyTime.end.diff,
      endTime: data.applyTime.end.time,
    },
  };
  console.log('request', request);
  const response = await authInstance.post('/lecture', request);
  return response.data;
};

export const usePostLectureCreate = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLectureCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecture', id] });
      navigate(`/${id}/add-class/result`);
    },
  });
};
