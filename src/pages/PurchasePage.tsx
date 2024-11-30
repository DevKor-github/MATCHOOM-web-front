import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useBottomSheet from 'hooks/useBottomSheet';
import PointCard from 'components/common/PointCard';
import BottomSheet from 'components/common/bottom-sheet/BottomSheet';

const PurchasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <>
      {!isCompleted ? (
        <div>
          <header>결제하기</header>
          <main className='flex flex-col gap-20 p-20'>
            <section>
              <h3>결제 상품</h3>
              <PointCard point={30000} title='10회권' price={30000} />
            </section>
            <section>
              <h3>결제자 정보</h3>
              <p>이재용(010-8479-0507)</p>
            </section>
            <section>
              <h3>입금 계좌</h3>
              <p>(우리) 310-02203xx (김땡땡)</p>
            </section>
            <label>
              <input type='checkbox' />
              <span>계좌 이체를 완료했어요.</span>
            </label>
            <button onClick={openBottomSheet}>다음</button>
          </main>
        </div>
      ) : (
        <main>
          <PointCard point={30000} title='10회권' price={30000} />
          <p>구매 확정! 감사합니다.</p>

          <button onClick={() => navigate(`/${id}/point`)}>내 지갑으로</button>
          <button onClick={() => navigate(`/${id}`)}>메인 화면으로</button>
        </main>
      )}
      <BottomSheet ref={bottomSheetRef}>
        <div ref={contentRef} className='flex flex-col gap-12'>
          규정 미준수로 인한 불이익이 발생할 수 있음을 확인했습니다.
          <button
            onClick={() => {
              setIsCompleted(true);
              closeBottomSheet();
            }}
          >
            완료
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

export default PurchasePage;
