import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBottomSheet from 'hooks/useBottomSheet';
import Header from 'components/common/Header';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';
import { Card } from 'components/explore/Card';
import { useGetStudioInfo } from 'features/main/api/getStudioInfo';
import AddClassButton from 'features/main/components/Button/AddClassButton';
import ManageButton from 'features/main/components/Button/ManageButton';
import SearchBarButton from 'features/main/components/Button/SearchBarButton';
import Calendar from 'features/main/components/Calendar';
import StudioHeader from 'features/main/components/Header/StudioHeader';

const MOCK_CARD_LIST = [
  {
    title: 'title',
    description: 'description',
    guide: 'guide',
    imageSrc: 'https://via.placeholder.com/150',
  },
  {
    title: 'title',
    description: 'description',
    guide: 'guide',
    imageSrc: 'https://via.placeholder.com/150',
  },
];

const MOCK_TEXT = {
  studioName: 'JUST JERK DANCE ACADEMY',
  imageSrc: 'https://via.placeholder.com/150',
};

const TEXT = {
  button: {
    complete: '완료',
  },
};

const MainPage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const { data: studioInfo } = useGetStudioInfo({ studioId: Number(id) });

  return (
    <>
      <Header />
      <div className='flex flex-1 flex-col bg-background'>
        <div className='px-24'>
          <StudioHeader
            name={MOCK_TEXT.studioName}
            imageSrc={MOCK_TEXT.imageSrc}
            noticeOpen={openBottomSheet}
          />
          <div className='my-12 w-full'>
            <SearchBarButton studioId={id || ''} />
          </div>
          <div className='my-24'>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className='flex flex-col gap-12'>
            {studioInfo?.lectures.map((lecture, index) => (
              <Card
                key={`${lecture.instructor + index}`}
                guide={lecture.studioName}
                imageSrc={lecture.thumbnail}
                title={lecture.instructor}
                {...lecture}
              />
            ))}
            <AddClassButton />
          </div>
          <ManageButton />
        </div>
        <BottomSheet ref={bottomSheetRef} title={MOCK_TEXT.studioName}>
          <div className='h-full min-h-500 w-full rounded-24 bg-grey-4'></div>
          <button
            className='font-bold my-12 h-80 w-full rounded-full bg-green text-20'
            onClick={closeBottomSheet}
          >
            {TEXT.button.complete}
          </button>
        </BottomSheet>
      </div>
    </>
  );
};

export default MainPage;
