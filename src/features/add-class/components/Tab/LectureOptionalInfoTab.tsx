import { DIFFICULTY_LIST, LABEL_LIST } from 'constants/class';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import useBottomSheet from 'hooks/useBottomSheet';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';
import { AddClassFormType } from 'features/add-class/types/add-class';
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
    genre: '장르를 입력해주세요',
    description: '강의소개 텍스트 (500자 미만)',
    musicLink: '수업 진행 곡의 유튜브 링크를 추가해 주세요',
  },
};

const ButtonStyle = {
  isSelected: 'flex-1 bg-green text-black text-16 font-600 h-52 rounded-12',
  isNotSelected: 'flex-1 bg-grey-7 text-white text-16 font-600 h-52 rounded-12',
};

const InputStyle = {
  default: 'rounded-xl mb-4 h-52 w-full rounded-12 bg-grey-7 p-16 text-start',
  placeholder: 'text-grey-4',
  selected: 'text-white',
};

const LectureOptionalInfoTab = ({
  control,
  errors,
}: {
  control: Control<AddClassFormType>;
  errors: FieldErrors<AddClassFormType>;
}) => {
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='mb-12 h-44 text-24 font-700 text-white'>
        {TEXT.header}
      </div>
      <div className='flex h-full w-full flex-col gap-8'>
        <div className='flex h-fit w-full flex-col gap-8'>
          <Label label={TEXT.label.difficulty} error={errors.difficulty} />
          <Controller
            name='difficulty'
            control={control}
            render={({ field }) => (
              <div className='grid grid-cols-2 gap-8'>
                {Object.entries(DIFFICULTY_LIST).map(([id, name]) => (
                  <button
                    key={`difficulty-${id}`}
                    type='button'
                    onClick={() => field.onChange(Number(id))}
                    className={
                      field.value === Number(id)
                        ? ButtonStyle.isSelected
                        : ButtonStyle.isNotSelected
                    }
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
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
          <Controller
            name='genre'
            control={control}
            render={({ field }) => (
              <button
                type='button'
                onClick={openBottomSheet}
                className={`${InputStyle.default} ${
                  field.value !== -1
                    ? InputStyle.selected
                    : InputStyle.placeholder
                }`}
              >
                {field.value !== -1
                  ? LABEL_LIST[field.value || 0]
                  : TEXT.placeholder.genre}
              </button>
            )}
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
      <BottomSheet ref={bottomSheetRef} title={'클래스 장르'}>
        <div className='h-full min-h-500 w-full rounded-24 px-12 '>
          <Controller
            name='genre'
            control={control}
            render={({ field }) => (
              <div className='grid grid-cols-2 gap-8'>
                {LABEL_LIST.map((name) => (
                  <button
                    key={`genre-${name}`}
                    type='button'
                    onClick={() => {
                      field.onChange(LABEL_LIST.indexOf(name));
                      closeBottomSheet();
                    }}
                    className={
                      field.value === LABEL_LIST.indexOf(name)
                        ? ButtonStyle.isSelected
                        : ButtonStyle.isNotSelected
                    }
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default LectureOptionalInfoTab;
