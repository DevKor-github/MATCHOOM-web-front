import { useNavigate, useParams } from 'react-router-dom';

const TEXT = {
  MANAGE: '관리',
};

const ManageButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${id}/manage`);
  };
  return (
    <button
      className='font-bold absolute bottom-24 right-24 h-88 w-88 rounded-full bg-grey-4 text-20'
      onClick={handleClick}
    >
      {TEXT.MANAGE}
    </button>
  );
};

export default ManageButton;
