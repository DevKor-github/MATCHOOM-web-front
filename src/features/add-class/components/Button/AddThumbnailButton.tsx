import { useParams } from 'react-router-dom';
import { usePostThumbnail } from 'features/add-class/api/postThumbnail';

const AddThumbnailButton = () => {
  const { id } = useParams();
  const { mutate: postThumbnail } = usePostThumbnail();

  return (
    <label className='flex aspect-square w-full cursor-pointer items-center justify-center rounded-12 bg-grey-7'>
      <span className='text-32 text-white'>+</span>
      <input
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            postThumbnail({ studioId: Number(id), file });
          }
        }}
      />
    </label>
  );
};

export default AddThumbnailButton;
