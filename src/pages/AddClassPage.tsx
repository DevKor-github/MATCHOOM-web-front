import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import StudioHeader from 'components/common/StudioHeader';
import { usePostLectureCreate } from 'features/add-class/api/postLectureCreate';
import RoundButton from 'features/add-class/components/Button/RoundButton';
import ProgressHeader from 'features/add-class/components/Header/ProgressHeader';
import Subheader from 'features/add-class/components/Header/SubHeader';
import CreatorInfoTab from 'features/add-class/components/Tab/CreatorInfoTab';
import LectureEssentialInfoTab from 'features/add-class/components/Tab/LectureEssentialInfoTab';
import LectureOptionalInfoTab from 'features/add-class/components/Tab/LectureOptionalInfoTab';
import ReservationInfoTab from 'features/add-class/components/Tab/ReservationInfoTab';
import {
  AddClassFormType,
  TabType,
  TabTypeValues,
  addClassSchema,
  creatorInfoSchema,
  lectureEssentialInfoSchema,
  lectureOptionalInfoSchema,
  reservationSchema,
} from 'features/add-class/types/add-class';
import { useGetStudioInfo } from 'features/main/api/getStudioInfo';

const TEXT = {
  button: {
    next: '다음 단계로',
    submit: '강의 등록하기',
  },
};

const ADD_CLASS_DEFAULT_DATA: AddClassFormType = {
  name: '',
  fileId: -1,
  type: '',
  lectureTime: [{ start: new Date(), end: new Date() }],
  room: '',
  price: 0,
  difficulty: -1,
  genre: -1,
  description: '',
  musicLink: '',
};

const TABS: Record<TabTypeValues, (props: any) => React.ReactNode> = {
  creatorInfo: (props) => <CreatorInfoTab {...props} />,
  lectureEssentialInfo: (props) => <LectureEssentialInfoTab {...props} />,
  lectureOptionalInfo: (props) => <LectureOptionalInfoTab {...props} />,
  reservation: (props) => <ReservationInfoTab {...props} />,
};

const tabSchemas = {
  [TabType[0]]: creatorInfoSchema,
  [TabType[1]]: lectureEssentialInfoSchema,
  [TabType[2]]: lectureOptionalInfoSchema,
  [TabType[3]]: reservationSchema,
};

const AddClassPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: postLectureCreate } = usePostLectureCreate({
    id: Number(id),
  });
  const { data: studioInfo } = useGetStudioInfo({ studioId: Number(id) });
  const [tabErrors, setTabErrors] = useState<Record<number, any>>({});
  const [tab, setTab] = useState(0);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddClassFormType>({
    mode: 'onBlur',
    defaultValues: ADD_CLASS_DEFAULT_DATA,
  });

  const onSubmit = async (data: AddClassFormType) => {
    const currentTabSchema = tabSchemas[TabType[tab]];
    console.log(data);
    try {
      await currentTabSchema.parseAsync(data);
      setTabErrors((prev) => ({ ...prev, [tab]: null }));

      if (tab === Object.keys(TabType).length - 1) {
        const parsedData = await addClassSchema.parseAsync(data);
        postLectureCreate(parsedData);
      } else {
        setTab(tab + 1);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error);
        const formErrors: Record<string, { type: string; message: string }> =
          {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          formErrors[field] = {
            type: 'validation',
            message: err.message,
          };
        });
        setTabErrors((prev) => ({ ...prev, [tab]: formErrors }));
      }
    }
  };

  const onPress = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className='flex h-full flex-col items-center justify-center px-16'>
      <StudioHeader
        title={studioInfo?.name || ''}
        handleGoBack={() => {
          if (tab === 0) {
            navigate(-1);
          } else {
            setTab(tab - 1);
          }
        }}
      />
      <div className='flex h-48 w-full items-center justify-center'>
        <ProgressHeader step={tab} totalSteps={Object.keys(TabType).length} />
      </div>
      <div className='flex h-48 w-full items-center justify-center'>
        <Subheader name={studioInfo?.name || ''} />
      </div>
      <div className='w-full flex-1'>
        {TABS[TabType[tab]]({ control, errors: tabErrors[tab] || errors })}
      </div>
      <div className='absolute bottom-44 left-0 flex h-fit w-full justify-center px-16'>
        <RoundButton
          text={
            TEXT.button[
              tab === Object.keys(TabType).length - 1 ? 'submit' : 'next'
            ]
          }
          onPress={onPress}
        />
      </div>
    </div>
  );
};

export default AddClassPage;
