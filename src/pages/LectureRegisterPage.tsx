import { useParams } from 'react-router-dom';
import { useGetUser, useGetUserPoint } from 'services/user';
import PrimaryCard from 'components/explore/Card/PrimaryCard';
import { useGetLectureDetail } from 'features/lecturedetail/api/getLectureDetail';
import RegisterButton from 'features/lectureregister/buttons/RegisterButton';

const ClassRegisterPage = () => {
  const { id, lectureId } = useParams();
  const { data: user } = useGetUser();
  const { data: userPoint } = useGetUserPoint(Number(id));
  const totalPoint = Array.isArray(userPoint)
    ? userPoint.reduce((acc, curr) => acc + curr.point, 0)
    : 0;
  const { data: lectureDetail } = useGetLectureDetail({
    lectureId: Number(lectureId),
  });
  const remainingPoint = totalPoint - (lectureDetail?.price || 0);
  return (
    <div>
      <header className='text-center text-20 font-700'>신청하기</header>
      <main className='flex flex-col gap-20 p-20'>
        <section>
          <p className='p-20 text-20 font-700'>결제상품</p>
          <PrimaryCard
            title={lectureDetail?.name || ''}
            description={lectureDetail?.description || ''}
            guide={lectureDetail?.studioName || ''}
            imageSrc={lectureDetail?.thumnail || ''}
          />
        </section>
        <section className='p-20  text-20 font-700'>
          <p>신청자 정보</p>
          <p className='mt-44 flex h-56 w-288 items-center justify-center bg-[#d9d9d9] text-black'>
            {user?.name} ({user?.phone})
          </p>
        </section>
        <section className='p-20'>
          <div className='flex flex-row gap-152'>
            <p className='text-20 font-700'>결제</p>
            <button className='h-28 w-88 bg-[#d9d9d9] text-12 font-400 text-black'>
              지갑
            </button>
          </div>
          <div className='mt-12 text-20 font-700'>
            <p>보유 포인트 {totalPoint}</p>
            <p>- 사용 포인트 {lectureDetail?.price}</p>
            <p>남은 포인트 {remainingPoint}</p>
          </div>
        </section>
      </main>
      <RegisterButton />
    </div>
  );
};

export default ClassRegisterPage;
