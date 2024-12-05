import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authInstance } from 'services/config';

type postThumbnailRequest = {
  studioId: number;
  file: File;
};

type postThumbnailResponse = {
  thumbnailId: number;
};

const postThumbnail = async (
  data: postThumbnailRequest,
): Promise<postThumbnailResponse> => {
  const formData = new FormData();
  formData.append('studioId', String(data.studioId));
  formData.append('file', data.file);

  const response = await authInstance.post('/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const usePostThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postThumbnail,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['thumbnailList', variables.studioId],
      });
    },
  });
};
