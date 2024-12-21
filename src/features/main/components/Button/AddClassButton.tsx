import { useNavigate, useParams } from 'react-router-dom';
import AddClassButtonIcon from 'assets/icons/add-class-button.png';

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
    <button className='h-60 w-60 rounded-full' onClick={handleClick}>
      <img src={AddClassButtonIcon} alt='add-class' className='h-full w-full' />
    </button>
  );
};

export default AddClassButton;
