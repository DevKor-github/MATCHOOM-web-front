import { useParams } from 'react-router-dom';
import { useGetLectureDetail } from 'features/lecturedetail/api/getLectureDetail';
import PaymentButton from 'features/lecturedetail/buttons/PaymentButton';
import ClassDetailInfo from 'features/lecturedetail/components/LectureDetailInfo';
import ClassHeader from 'features/lecturedetail/components/LectureHeader';
import ClassInfo from 'features/lecturedetail/components/LectureInfo';

const MOCK_CLASSINFO = {
  imageSrc: 'http://via.placeholder.com/640x480',
  studioName: '뎁코스튜디오',
  teacherName: 'NAIN',
  type: '원데이',
  genre: '힙합',
};

const MOCK_BASICINFO = {
  date: '2024-12-01',
  time: '2:00 PM - 4:00 PM',
  location: '초록연습실',
  level: 'Middle Level',
  price: 30000,
};

const MOCK_DETAILINFO = {
  videoSrc: 'https://docs.material-tailwind.com/demo.mp4',
  detail:
    '받을 때 대충 50자 정도로 받으니 이정도 공간이어도 충분하지 않을까? 50자는 너무 적어 100자는 받아야 할 거 같은데... 클래스 소개 글 클래스 소개 클래스 소개 클래스 소',
};

const LectureDetailPage = () => {
  const { lectureId } = useParams();
  const { data: lectureDetail } = useGetLectureDetail({
    lectureId: Number(lectureId),
  });

  return (
    <div>
      <ClassHeader
        imageSrc={
          lectureDetail?.thumnail || 'http://via.placeholder.com/640x480'
        }
        studioName={lectureDetail?.studioName}
        teacherName={lectureDetail?.instructor}
        type={lectureDetail?.type}
        genre={lectureDetail?.genre}
      />
      <div className='mb-12 mt-24 border border-[#3C4048]'></div>
      <ClassInfo
        lectureTime={lectureDetail?.lectureTime}
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
      <PaymentButton />
    </div>
  );
};

export default LectureDetailPage;
