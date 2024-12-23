import { useNavigate, useParams } from 'react-router-dom';

const GoToMainButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClick = () => {
    navigate(`/${id}`);
  };
  return (
    <button
      className='fixed bottom-20 mx-20 h-64 w-460 rounded-full bg-gradient-to-r from-blue to-green py-8 text-20 font-700 text-black'
      onClick={handleClick}
    >
      메인 화면으로
    </button>
  );
};

export default GoToMainButton;
