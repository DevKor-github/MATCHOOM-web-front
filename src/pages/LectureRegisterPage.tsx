import { format } from 'date-fns';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUser, useGetUserPoint } from 'services/user';
import Header from 'components/common/Header';
import PrimaryCard from 'components/explore/Card/PrimaryCard';
import { useGetLectureDetail } from 'features/lecturedetail/api/getLectureDetail';
import GoToMainButton from 'features/lectureregister/buttons/GoToMainButton';
import RegisterButton from 'features/lectureregister/buttons/RegisterButton';
import CheckIcon from '../assets/icons/checkIcon.svg';

const LectureStartTime = (lectureTime: { start: string; end: string }[]) => {
  if (lectureTime.length === 0) return { date: '', time: '' };

  const firstLecture = lectureTime[0];
  const formattedStartTime = format(
    new Date(firstLecture.start),
    'yyyy.MM.dd HH:mm',
  );
  return {
    time: formattedStartTime,
  };
};

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
  const [isSucceed, setIsSucceed] = useState(false);

  const handleRegisterSuccess = () => {
    setIsSucceed(true);
  };

  const { time } = LectureStartTime(lectureDetail?.lectureTime || []);
  const currentTime = format(new Date(), 'yyyy.MM.dd HH:mm:ss');

  return (
    <>
      {!isSucceed ? (
        <>
          <div className='flex w-full flex-col overflow-y-scroll'>
            <Header />
            <header className='text-center text-20 font-700'>신청하기</header>
            <main className='mx-20 flex flex-col'>
              <section>
                <p className='mb-20 mt-16 text-16 font-700'>결제상품</p>
                <div className='border border-[#3C4048] ' />
                <PrimaryCard
                  title={lectureDetail?.name || ''}
                  description={lectureDetail?.description || ''}
                  guide={lectureDetail?.studioName || ''}
                  imageSrc={lectureDetail?.thumbnail || ''}
                />
                <div className='mb-40 mt-20 border border-[#3C4048] ' />
              </section>
              <section className='text-16'>
                <p className=' font-700'>신청자 정보</p>
                <p className=' mt-12 flex h-56 w-full items-center justify-center rounded-8 bg-[#3C4048] font-600'>
                  {user?.name} ({user?.phone})
                </p>
              </section>
              <section className='mt-40 w-full text-16 '>
                <p className='mb-12 font-700'>결제</p>
                <div className=' flex h-192 flex-col rounded-8 bg-[#3C4048]'>
                  <button className='mx-20 mt-16 h-28 w-72 rounded-full bg-green font-700 text-black'>
                    지갑
                  </button>
                  <div className='mx-20 mt-24 flex flex-row justify-between font-500'>
                    <p>보유 포인트</p>
                    <p>{totalPoint} p</p>
                  </div>
                  <div className='mx-20 mt-8 flex flex-row justify-between font-500 text-green'>
                    <p>사용 포인트</p>
                    <p>{lectureDetail?.price} p</p>
                  </div>
                  <div className='mx-20 my-12 border border-[#959BA7] ' />
                  <div className='mx-20 flex flex-row justify-between font-500'>
                    <p>잔여 포인트</p>
                    <p>{remainingPoint} p</p>
                  </div>
                </div>
              </section>
            </main>
            <div className='mb-100'></div>
            <RegisterButton onRegister={handleRegisterSuccess} />
          </div>
        </>
      ) : (
        <>
          <div className='flex w-full flex-col overflow-y-scroll'>
            <Header />
            <section className='mx-20 '>
              <p className='mb-20 mt-16 text-16 font-700'>결제상품</p>
              <div className='border border-[#3C4048] ' />
              <PrimaryCard
                title={lectureDetail?.name || ''}
                description={lectureDetail?.description || ''}
                guide={lectureDetail?.studioName || ''}
                imageSrc={lectureDetail?.thumbnail || ''}
              />
              <div className='mb-32 mt-20 border border-[#3C4048] ' />
            </section>
            <section className='flex flex-col items-center '>
              <div className='mb-20 flex h-52 w-52 items-center justify-center rounded-full bg-green'>
                <CheckIcon />
              </div>
              <p className='text-20 font-700'>등록을 성공했어요!</p>
              <p className='text-20 font-700'>정상적으로 접수되었어요.</p>
            </section>
            <div className='mx-20 mb-20 mt-36 border border-[#3C4048] ' />
            <section className='mx-32 flex flex-col gap-12 text-16 '>
              <div className='flex flex-row justify-between'>
                <p className='font-500'>신청자 정보</p>
                <p className='font-700 '>
                  {user?.name}({user?.phone})
                </p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='font-500'>신청 일시</p>
                <p className='font-700 '>{currentTime}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='font-500'>클래스 상세정보</p>
                <p className='font-700 '>{lectureDetail?.instructor}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='font-500'>클래스 일시</p>
                <p className='font-700 '>{time}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='font-500'>상태</p>
                <p className='font-700 '>성공</p>
              </div>
            </section>
            <GoToMainButton />
          </div>
        </>
      )}
    </>
  );
};

export default ClassRegisterPage;
