import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useBottomSheet from 'hooks/useBottomSheet';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';
import { Card } from 'components/explore/Card';
<<<<<<< Updated upstream
import AddClassButton from 'features/main/components/Button/AddClassButton';
import ManageButton from 'features/main/components/Button/ManageButton';
=======
import { useGetStudioInfo } from 'features/main/api/getStudioInfo';
import MainButtonField from 'features/main/components/Button/MainButtonField';
>>>>>>> Stashed changes
import SearchBarButton from 'features/main/components/Button/SearchBarButton';
import Calendar from 'features/main/components/Calendar';
import StudioHeader from 'features/main/components/Header/StudioHeader';

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

<<<<<<< Updated upstream
  return (
    <div className='flex flex-1 flex-col bg-background'>
      <div className='mb-12 h-40 w-full bg-grey-6'>common header</div>
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
          {MOCK_CARD_LIST.map((card, index) => (
            <Card key={`${card.title + index}`} {...card} />
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
=======
  const { data: studioInfo } = useGetStudioInfo({ studioId: Number(id) });

  console.log(studioInfo);

  return (
    <div className='flex flex-1 touch-none flex-col overflow-hidden bg-background'>
      <Header />
      <div className='flex flex-1 flex-col bg-background'>
        <div className='px-24'>
          <StudioHeader
            name={studioInfo?.name || ''}
            imageSrc={studioInfo?.thumbnail || ''}
            noticeOpen={openBottomSheet}
          />
          <div className='my-24 h-[1px] w-full bg-grey-7' />
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
          </div>
          <MainButtonField />
        </div>
        <BottomSheet ref={bottomSheetRef} title={studioInfo?.name || ''}>
          <div className='h-full min-h-500 w-full rounded-24 bg-grey-4'></div>
          <button
            className='font-bold my-12 h-80 w-full rounded-full bg-green text-20'
            onClick={closeBottomSheet}
          >
            {TEXT.button.complete}
          </button>
        </BottomSheet>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default MainPage;
