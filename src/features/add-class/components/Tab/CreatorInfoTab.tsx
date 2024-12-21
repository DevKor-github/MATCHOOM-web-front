import { Control, Controller, FieldErrors } from 'react-hook-form';
import { AddClassFormType } from 'features/add-class/types/add-class';
import AddThumbnailButton from '../Button/AddThumbnailButton';
import Label from '../Input/Label';
import TextInput from '../Input/TextInput';

const TEXT = {
  header: '강사 정보를 알려주세요',
  label: {
    name: '강사명',
    thumbnail: '썸네일',
  },
  placeholder: {
    name: '강사명',
  },
};

const THUMBNAIL_STYLE = {
  isSelected:
    'aspect-square w-full overflow-hidden rounded-12 outline outline-2 outline-green',
  isNotSelected: 'aspect-square w-full overflow-hidden rounded-12',
};

const THUMBNAIL_OPTIONS = [
  { id: 1, src: 'https://picsum.photos/300/300' },
  { id: 2, src: 'https://picsum.photos/300/300' },
  { id: 3, src: 'https://picsum.photos/300/300' },
];

const CreatorInfoTab = ({
  control,
  errors,
}: {
  control: Control<AddClassFormType>;
  errors: FieldErrors<AddClassFormType>;
}) => {
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='mb-12 h-44 text-24 font-700 text-white'>
        {TEXT.header}
      </div>
      <div className='flex h-full w-full flex-col gap-8'>
        <div className='flex h-100 w-full flex-col gap-8'>
          <Label label={TEXT.label.name} error={errors.name} />
          <TextInput
            name='name'
            placeholder={TEXT.placeholder.name}
            control={control}
          />
        </div>
        <Label label={TEXT.label.thumbnail} error={errors.fileId} />
        <Controller
          name='fileId'
          control={control}
          render={({ field }) => (
            <div className='grid grid-cols-3 gap-8'>
              <AddThumbnailButton />
              {THUMBNAIL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type='button'
                  onClick={() => field.onChange(option.id)}
                  className={
                    field.value === option.id
                      ? THUMBNAIL_STYLE.isSelected
                      : THUMBNAIL_STYLE.isNotSelected
                  }
                >
                  <img
                    src={option.src}
                    alt={`thumbnail-${option.id}`}
                    className='h-full w-full object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CreatorInfoTab;
