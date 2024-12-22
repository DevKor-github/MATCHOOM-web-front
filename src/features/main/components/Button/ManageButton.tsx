import { useNavigate, useParams } from 'react-router-dom';
import ManageButtonIcon from 'assets/icons/manage-button.png';

const ManageButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${id}/manage`);
  };
  return (
    <button className='h-60 w-60' onClick={handleClick}>
      <img
        src={ManageButtonIcon}
        alt='manage'
        className='h-full w-full rounded-full'
      />
    </button>
  );
};

export default ManageButton;
