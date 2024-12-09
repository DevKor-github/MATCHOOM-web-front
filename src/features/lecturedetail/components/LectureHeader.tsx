const ClassHeader = ({
  imageSrc,
  studioName,
  teacherName,
  type,
  genre,
}: {
  imageSrc: string;
  studioName: string;
  teacherName: string;
  type: string;
  genre: string;
}) => {
  return (
    <div className='text-white'>
      <img className='mb-16 h-332 w-380' src={imageSrc} alt='ClassImage' />
      <div className='mx-20 flex flex-col'>
        <p className='mb-4 text-16 font-600'>{studioName}</p>
        <p className='mb-12 text-24 font-700'>{teacherName}</p>
        <div className='flex flex-row items-center justify-start space-x-4'>
          <div className='rounded-full border border-green'>
            <p className='px-12 py-4 text-12 font-600 text-green'>{type}</p>
          </div>
          <div className='rounded-full border border-green'>
            <p className='px-12 py-4 text-12 font-600 text-green'>{genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;
