import { useParams } from 'react-router-dom';
import { useGetLectureDetail } from 'features/lecturedetail/api/getLectureDetail';
import PaymentButton from 'features/lecturedetail/buttons/PaymentButton';
import ClassDetailInfo from 'features/lecturedetail/components/LectureDetailInfo';
import ClassHeader from 'features/lecturedetail/components/LectureHeader';
import ClassInfo from 'features/lecturedetail/components/LectureInfo';

const LectureDetailPage = () => {
  const { lectureId } = useParams();
  const { data: lectureDetail } = useGetLectureDetail({
    lectureId: Number(lectureId),
  });

  return (
    <div className='flex w-full flex-col overflow-y-scroll'>
      <ClassHeader
        imageSrc={
          lectureDetail?.thumbnail || 'http://via.placeholder.com/640x480'
        }
        studioName={lectureDetail?.studioName || '뎁코스튜디오'}
        teacherName={lectureDetail?.instructor || '강사명 텍스트 입력'}
        type={lectureDetail?.type || '원데이'}
        genre={lectureDetail?.genre || 1}
      />
      <div className='mx-20 my-32 border border-[#3C4048] ' />
      <ClassInfo
        lectureTime={
          lectureDetail?.lectureTime || [
            {
              end: '2024-12-22T01:55:00.000Z',
              start: '2024-12-22T01:25:00.000Z',
            },
          ]
        }
        location={lectureDetail?.room || '위치 가이드 텍스트'}
        level={lectureDetail?.difficulty || 3}
        price={lectureDetail?.price || 30000}
        minCapacity={lectureDetail?.minCapacity || 3}
        maxCapacity={lectureDetail?.maxCapacity || 15}
      />
      <ClassDetailInfo
        videoSrc={lectureDetail?.musicLink}
        detail={lectureDetail?.description}
      />
      <div className='mb-100'></div>
      <PaymentButton />
    </div>
  );
};

export default LectureDetailPage;
