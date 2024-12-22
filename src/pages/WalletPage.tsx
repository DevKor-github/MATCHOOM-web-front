import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useBottomSheet from 'hooks/useBottomSheet';
import { getSession } from 'utils/handleSession';
import { SessionType } from 'utils/handleSession';
import { useGetStudio } from 'services/studio';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';
import MyPoint from 'features/wallet/MyPoint';
import TicketList from 'features/wallet/TicketList';
import LeftArrowIcon from 'assets/icons/arrow-left.svg';
import RightArrowIcon from 'assets/icons/arrow-right-small.svg';

const WalletPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();

  const [session, setSession] = useState<SessionType | undefined>(undefined);
  useEffect(() => {
    const session = getSession();
    if (session) {
      setSession(session);
    }
  }, []);

  const { data: studio } = useGetStudio(Number(id));

  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  return (
    <>
      <header className='relative flex h-60 items-center justify-between px-20'>
        <LeftArrowIcon />
        <h1 className='absolute left-1/2 -translate-x-1/2 text-20 font-600'>
          지갑
        </h1>
        <button className='text-16 font-600 text-green'>{session?.name}</button>
      </header>
      <main className='flex grow flex-col gap-24 p-20'>
        <section className='flex gap-16'>
          <img
            src={studio?.thumbnail}
            alt='스튜디오 메인 사진'
            className='h-84 w-84 rounded-10'
          />
          <div className='flex flex-col justify-between'>
            <h2 className='text-20 font-700'>{studio?.name}</h2>
            <div className='flex items-center gap-24'>
              <Button onClick={() => openBottomSheet()}>결제규정</Button>
              <Button onClick={() => navigate(`/${id}/point/purchase/history`)}>
                결제내역
              </Button>
            </div>
          </div>
        </section>
        <MyPoint />
        <TicketList
          studioName={studio?.name ?? ''}
          studioId={Number(id)}
          selectedTicketId={selectedTicketId}
          setSelectedTicketId={setSelectedTicketId}
        />
        <button
          onClick={() =>
            navigate(`/${id}/point/purchase?ticketId=${selectedTicketId}`)
          }
          disabled={!selectedTicketId}
          className={`mb-20 h-56 rounded-full bg-green text-18 font-700 text-black ${
            selectedTicketId ? 'opacity-100' : 'opacity-50'
          }`}
        >
          결제하기
        </button>
      </main>
      <BottomSheet ref={bottomSheetRef} title={'결제규정'}>
        <div ref={contentRef} className='flex flex-col gap-12'>
          결제 규정입니다
        </div>
      </BottomSheet>
    </>
  );
};

export default WalletPage;

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='flex items-center gap-8 text-14 font-500 text-grey-4'
    >
      {children}
      <RightArrowIcon />
    </button>
  );
};
