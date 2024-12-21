const StudioHeader = ({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc: string;
}) => {
  return (
    <div className='flex w-full flex-row items-center gap-12'>
      <img
        className='h-84 w-84 rounded-12'
        src={imageSrc || 'https://via.placeholder.com/150'}
        alt='logo'
      />
      <div className='flex h-full w-full items-center'>
        <div className='font-bold text-20 font-700 text-white'>{name}</div>
      </div>
    </div>
  );
};

export default StudioHeader;
