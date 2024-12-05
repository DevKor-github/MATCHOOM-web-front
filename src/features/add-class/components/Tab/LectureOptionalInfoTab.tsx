import { DIFFICULTY_LIST, LABEL_LIST } from 'constants/class';
import { Control, FieldErrors } from 'react-hook-form';
import { AddClassFormType } from 'features/add-class/types/add-class';
import SelectDropdown from '../Dropdown/SelectDropdown';
import Label from '../Input/Label';
import LongTextInput from '../Input/LongTextInput';
import TextInput from '../Input/TextInput';

const TEXT = {
  header: '클래스 정보를 알려주세요',
  label: {
    difficulty: '난이도',
    type: '유형',
    genre: '장르',
    description: '강의소개',
  },
  placeholder: {
    difficulty: '난이도',
    type: '유형',
    genre: '장르',
    description: '강의소개 텍스트 (500자 미만)',
    musicLink: '수업 진행 곡의 유튜브 링크를 추가해 주세요',
  },
};

const LectureOptionalInfoTab = ({
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
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.difficulty} error={errors.difficulty} />
          <SelectDropdown
            defaultValue={TEXT.placeholder.difficulty}
            name='difficulty'
            control={control}
            list={Object.values(DIFFICULTY_LIST)}
          />
        </div>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.type} error={errors.type} />
          <TextInput
            name='type'
            placeholder={TEXT.placeholder.type}
            control={control}
          />
        </div>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.genre} error={errors.genre} />
          <SelectDropdown
            name='genre'
            control={control}
            list={LABEL_LIST}
            defaultValue={TEXT.placeholder.genre}
          />
        </div>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.description} error={errors.description} />
          <LongTextInput
            name='description'
            placeholder={TEXT.placeholder.description}
            control={control}
          />
        </div>
        <div className='flex h-fit w-full flex-col gap-8'>
          <TextInput
            name='musicLink'
            placeholder={TEXT.placeholder.musicLink}
            control={control}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureOptionalInfoTab;
