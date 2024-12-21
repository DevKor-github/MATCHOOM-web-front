import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useBottomSheet from 'hooks/useBottomSheet';
import Header from 'components/common/Header';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';
import { Card } from 'components/explore/Card';
import { useGetStudioInfo } from 'features/main/api/getStudioInfo';
import MainButtonField from 'features/main/components/Button/MainButtonField';
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
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const { data: studioInfo } = useGetStudioInfo({ studioId: Number(id) });

  console.log(studioInfo);

  const filteredLectures = studioInfo?.lectures.filter((lecture) => {
    return lecture.lectureTime.some((time) => {
      const timeStart = new Date(time.start);
      return (
        timeStart.getFullYear() === selectedDate.getFullYear() &&
        timeStart.getMonth() === selectedDate.getMonth() &&
        timeStart.getDate() === selectedDate.getDate()
      );
    });
  });

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
            {filteredLectures?.map((lecture, index) => (
              <button
                key={`${lecture.instructor + index}`}
                onClick={() => navigate(`class/${lecture.lectureId}`)}
              >
                <Card
                  guide={lecture.studioName}
                  imageSrc={lecture.thumbnail}
                  title={lecture.instructor}
                  {...lecture}
                />
              </button>
            ))}
          </div>
          <MainButtonField />
        </div>
        <BottomSheet ref={bottomSheetRef} title={studioInfo?.name || ''}>
          <div className='h-full min-h-500 w-full rounded-24 bg-grey-4 px-12 py-24 text-16 font-600'>
            {studioInfo?.description}
          </div>
          <button
            className='font-bold my-12 h-60 w-full rounded-full bg-green text-20'
            onClick={closeBottomSheet}
          >
            {TEXT.button.complete}
          </button>
        </BottomSheet>
      </div>
    </div>
  );
};

export default MainPage;
