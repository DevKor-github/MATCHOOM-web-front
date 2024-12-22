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
        type={lectureDetail?.type}
        genre={lectureDetail?.genre}
      />
      <div className='mb-12 mt-24 border border-[#3C4048]'></div>
      <ClassInfo
        lectureTime={lectureDetail?.lectureTime || []}
        location={lectureDetail?.room}
        level={lectureDetail?.difficulty}
        price={lectureDetail?.price}
      />
      <div className='mb-16 mt-24 border border-[#3C4048]'></div>
      <ClassDetailInfo
        videoSrc={lectureDetail?.musicLink}
        detail={lectureDetail?.description}
      />
      <div className='mb-100'></div>
      <div className='fixed bottom-20 w-full px-20'>
        <PaymentButton />
      </div>
    </div>
  );
};

export default LectureDetailPage;
