import { ReactNode, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useBottomSheet from 'hooks/useBottomSheet';
import { getSession } from 'utils/handleSession';
import { SessionType } from 'utils/handleSession';
import { useGetStudioTicket } from 'services/studio';
import { useGetStudio } from 'services/studio';
import { usePostPurchasePoint } from 'services/user';
import Header from 'components/common/Header';
import PointCard from 'components/common/PointCard';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';
import LeftArrowIcon from 'assets/icons/arrow-left.svg';
import CheckIcon from 'assets/icons/check.svg';
import CheckedCheckboxIcon from 'assets/icons/checkbox-checked.svg';
import UncheckedCheckboxIcon from 'assets/icons/checkbox-unchecked.svg';

const PurchasePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const { data: studioTicket } = useGetStudioTicket(Number(id));
  const ticket = studioTicket?.find((ticket) => ticket.id === Number(ticketId));

  const { data: studio } = useGetStudio(Number(id));

  const [isCompleted, setIsCompleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const [session, setSession] = useState<SessionType | undefined>(undefined);
  useEffect(() => {
    const session = getSession();
    if (session) {
      setSession(session);
    }
  }, []);

  const { mutate: postPurchasePoint } = usePostPurchasePoint(
    Number(id),
    Number(ticketId),
  );

  const handlePostPurchasePoint = () => {
    postPurchasePoint();
    setIsCompleted(true);
    closeBottomSheet();
  };

  return (
    <>
      {!isCompleted ? (
        <>
          <header className='relative flex h-60 items-center px-20'>
            <LeftArrowIcon />
            <h1 className='absolute left-1/2 -translate-x-1/2 text-20 font-700'>
              결제하기
            </h1>
          </header>
          <main className='relative flex grow flex-col gap-20 p-20'>
            <section className='pt-20'>
              <h3 className='pb-32 text-16 font-700'>결제 상품</h3>
              <PointCard
                point={ticket?.point ?? 0}
                studioName={studio?.name ?? ''}
                price={ticket?.price ?? 0}
              />
            </section>
            <section className='pt-56'>
              <h3 className='pb-[6px] text-16 font-700'>결제자 정보</h3>
              <Text>
                {session?.name} ({session?.phone})
              </Text>
              <Text>계좌주명: {session?.accountHolder}</Text>
            </section>
            <section className='pt-40'>
              <h3 className='pb-[6px] text-16 font-700'>입금 계좌</h3>
              <Text>(우리) 310-02203xx (김땡땡)</Text>
            </section>
            <section className='absolute bottom-20 left-20 right-20'>
              <label className='mb-12 flex cursor-pointer items-center gap-8'>
                <input
                  type='checkbox'
                  className='hidden'
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                {isChecked ? (
                  <CheckedCheckboxIcon />
                ) : (
                  <UncheckedCheckboxIcon />
                )}
                <span>계좌 이체를 완료했어요.</span>
              </label>
              <button
                onClick={openBottomSheet}
                disabled={!isChecked}
                className='h-56 w-full rounded-full bg-green text-16 font-700 text-black disabled:opacity-50'
              >
                다음
              </button>
            </section>
          </main>
        </>
      ) : (
        <>
          <Header />
          <main className='mx-20 mt-20 flex grow flex-col'>
            <section>
              <h1 className='text-16 font-700'>결제 상품</h1>
              <div className='my-16 h-[1px] w-full bg-grey-7' />
              <PointCard
                point={ticket?.point ?? 0}
                studioName={studio?.name ?? ''}
                price={ticket?.price ?? 0}
              />
              <div className='my-16 h-[1px] w-full bg-grey-7' />
            </section>
            <div className='flex grow flex-col items-center justify-center gap-20 text-center text-20 font-700'>
              <CheckIcon />
              결제가 완료되었어요!
              <br />
              감사합니다.
            </div>
            <div className='flex flex-col gap-[10px] pb-20'>
              <button
                onClick={() => navigate(`/${id}/wallet`)}
                className='h-56 w-full rounded-full bg-[#D4D8E0] text-16 font-700 text-black'
              >
                내 지갑으로
              </button>
              <button
                onClick={() => navigate(`/${id}`)}
                className='h-56 w-full rounded-full bg-green text-16 font-700 text-black'
              >
                메인 화면으로
              </button>
            </div>
          </main>
        </>
      )}
      <BottomSheet ref={bottomSheetRef}>
        <div ref={contentRef} className='flex flex-col gap-12 pb-20'>
          규정 미준수로 인한 불이익이 발생할 수 있음을 확인했습니다.
          <button
            onClick={handlePostPurchasePoint}
            className='h-56 w-full rounded-full bg-green text-16 font-700 text-black disabled:opacity-50'
          >
            완료
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

export default PurchasePage;

interface TextProps {
  children: ReactNode;
}

const Text = ({ children }: TextProps) => {
  return (
    <p className='mb-[10px] rounded-10 bg-grey-7 p-12 text-16 font-600'>
      {children}
    </p>
  );
};
