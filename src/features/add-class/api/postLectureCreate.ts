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
    instructor: data.name,
    difficulty: data.difficulty !== -1 ? data.difficulty : null,
    genre: data.genre !== -1 ? data.genre : null,
    description: data.description || null,
    musicLink: data.musicLink || null,
    applyTime: {
      startDiff: data.applyTime.start.diff,
      startTime: data.applyTime.start.time,
      endDiff: data.applyTime.end.diff,
      endTime: data.applyTime.end.time,
    },
    lectureTime: data.lectureTime.map((time) => ({
      start: time.start.toISOString(),
      end: time.end.toISOString(),
    })),
  };
  console.log('request', request);
  const response = await authInstance.post('/lecture', request);
  return response.data;
};

export const usePostLectureCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLectureCreate,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lecture'] });
      navigate('result', {
        state: variables,
      });
    },
  });
};
