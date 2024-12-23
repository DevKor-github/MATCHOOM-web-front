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
        studioName={lectureDetail?.studioName}
        teacherName={lectureDetail?.instructor}
        type={lectureDetail?.type || '원데이'}
        genre={lectureDetail?.genre}
      />
      <div className='mx-20 my-32 border border-[#3C4048] ' />
      <ClassInfo
        lectureTime={lectureDetail?.lectureTime || []}
        location={lectureDetail?.room}
        level={lectureDetail?.difficulty}
        price={lectureDetail?.price}
        minCapacity={lectureDetail?.minCapacity}
        maxCapacity={lectureDetail?.maxCapacity}
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
