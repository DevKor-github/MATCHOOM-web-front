import useBottomSheet from 'hooks/useBottomSheet';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';

const PointPage = () => {
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();

  return (
    <>
      <div>
        <header>지갑</header>
        <main className='flex flex-col gap-20 p-20'>
          <div>
            <span>JUST JERK ACADEMY</span>
            <button onClick={() => openBottomSheet()}>결제규정</button>
            <button>결제내역</button>
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
            <PointItem point={10000} price={10000} />
            <PointItem point={20000} price={20000} />
            <PointItem point={30000} price={30000} />
          </ul>
          <button>결제하기</button>
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

interface PointItemProps {
  point: number;
  price: number;
}

const PointItem = ({ point, price }: PointItemProps) => {
  return (
    <li className='flex justify-between gap-12'>
      <div className='h-40 w-80 bg-grey-4'>{point}p</div>
      <div>{price}원</div>
    </li>
  );
};
