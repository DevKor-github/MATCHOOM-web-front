import { useNavigate } from 'react-router-dom';
import SearchIcon from 'assets/icons/search.svg';

const TEXT = {
  placeholder: '맞춤 클래스를 찾아보세요!',
};

const SearchBarButton = ({ studioId }: { studioId: string }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${studioId}/explore`);
  };

  return (
    <div className='relative h-44 w-full'>
      <button
        onClick={handleClick}
        className='font-medium flex h-full w-full items-center justify-start rounded-10 bg-grey-7 pl-40 text-16 text-grey-6 outline-none'
      >
        {TEXT.placeholder}
      </button>
      <div className='absolute left-12 top-1/2 -translate-y-1/2'>
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBarButton;
