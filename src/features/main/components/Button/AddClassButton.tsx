import { useNavigate, useParams } from 'react-router-dom';

const TEXT = {
  ADD_CLASS: '클래스 추가',
};

const AddClassButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${id}/add-class`);
  };

  return (
    <button
      className='h-40 w-full rounded-10 bg-grey-4 text-16 font-500 text-white'
      onClick={handleClick}
    >
      {TEXT.ADD_CLASS}
    </button>
  );
};

export default AddClassButton;
