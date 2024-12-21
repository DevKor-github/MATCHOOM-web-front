import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from 'components/common/Header';
import { Card } from 'components/explore/Card';
import RoundButton from 'features/add-class/components/Button/RoundButton';
import { useGetStudioInfo } from 'features/main/api/getStudioInfo';
import SimpleStudioHeader from 'features/main/components/Header/SimpleStudioHeader';

const TEXT = {
  button: {
    home: '홈으로',
  },
  subheader: ['클래스 등록이 완료되었어요!'],
  header: '생성된 강의 카드를\n확인해 보세요!',
  matchoom: '맞춤',
};

const AddResultPage = () => {
  const { state: lectureInfo } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const onPress = () => {
    navigate(`/${id}`);
  };

  const { data: studioInfo } = useGetStudioInfo({ studioId: Number(id) });
  return (
    <div className='flex flex-1 flex-col bg-background'>
      <Header />
      <div className='my-12 w-full px-16'>
        <div className='flex flex-row'>
          <span className='text-base font-normal bg-gradient-to-r from-green to-blue bg-clip-text leading-8 text-transparent'>
            {TEXT.matchoom}&nbsp;
          </span>
          <p className='text-base font-normal leading-8 text-white'>
            {TEXT.subheader[0]}
          </p>
        </div>
        <div className='my-12 h-44 whitespace-pre-line text-24 font-700 text-white'>
          {TEXT.header}
        </div>
      </div>
      <div className='mt-60 w-full px-16'>
        <SimpleStudioHeader
          name={studioInfo?.name || ''}
          imageSrc={studioInfo?.thumbnail || ''}
        />
        <div className='my-24 h-[1px] w-full bg-grey-7' />
        <div className='flex flex-col gap-12 overflow-y-scroll'>
          {lectureInfo.lectureTime.map((index: number) => (
            <Card
              key={`${lectureInfo.name}-${index}`}
              imageSrc={studioInfo?.thumbnail || ''}
              title={lectureInfo.name}
              description={lectureInfo.description || ''}
              guide={studioInfo?.name || ''}
            />
          ))}
        </div>
      </div>
      <div className='absolute bottom-44 left-0 flex h-fit w-full justify-center px-16'>
        <RoundButton text={TEXT.button.home} onPress={onPress} />
      </div>
    </div>
  );
};

export default AddResultPage;
