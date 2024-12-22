import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RegisterButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const goToMainPage = () => {
    navigate(`/${id}`);
  };

  return (
    <div>
      <button
        className='h-56 w-full rounded-full bg-gradient-to-r from-blue to-green px-8 py-8 text-20 font-700 text-black'
        onClick={openPopup}
      >
        다음
      </button>

      {isPopupOpen && (
        <div className='fixed top-240 flex h-400 w-392 items-center justify-center bg-background'>
          <div className='flex flex-col text-center text-20 font-700'>
            <p> 등록 성공! </p>
            <p> 정상적으로 접수되었어요 </p>
            <button
              onClick={goToMainPage}
              className='fixed bottom-20 left-40 mx-20 h-56 w-352 rounded-full bg-gradient-to-r from-blue to-green px-8 py-8 text-20 font-700 text-black'
            >
              메인화면으로
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterButton;
