import { useNavigate, useParams } from 'react-router-dom';
import useBottomSheet from 'hooks/useBottomSheet';
import PointCard from 'components/common/PointCard';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';

const PointPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();

  return (
    <>
      <div>
        <header>지갑</header>
        <main className='flex flex-col gap-20 p-20'>
          <div>
            <span>JUST JERK ACADEMY</span>
            <button onClick={() => openBottomSheet()}>결제규정</button>
            <button onClick={() => navigate(`/${id}/point/purchase/history`)}>
              결제내역
            </button>
          </div>
          <div>
            <span>권태현님</span>
            <ul>
              <MyPointItem point={30000} expiredAt='24.12.03' />
              <MyPointItem point={20000} expiredAt='24.12.03' />
              <MyPointItem point={10000} expiredAt='24.12.03' />
            </ul>
          </div>
          <ul>
            <PointCard point={10000} price={10000} title='원데이' />
            <PointCard point={20000} price={20000} title='5회권' />
            <PointCard point={30000} price={30000} title='10회권' />
          </ul>
          <button onClick={() => navigate(`/${id}/point/purchase`)}>
            결제하기
          </button>
        </main>
      </div>
      <BottomSheet ref={bottomSheetRef} title={'결제규정'}>
        <div ref={contentRef} className='flex flex-col gap-12'>
          결제 규정입니다
        </div>
      </BottomSheet>
    </>
  );
};

export default PointPage;

interface MyPointItemProps {
  point: number;
  expiredAt: string;
}

const MyPointItem = ({ point, expiredAt }: MyPointItemProps) => {
  return (
    <li className='flex items-center justify-between'>
      <span>{point}p</span>
      <span>{expiredAt}</span>
    </li>
  );
};
