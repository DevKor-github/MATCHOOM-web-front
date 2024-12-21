const mapGenreToText = (genre: number | undefined): string => {
  const genres = [
    '코레오그래피',
    '케이팝',
    '힙합',
    '걸스힙합',
    '걸리쉬',
    '왁킹',
    '락킹',
    '힐코레오',
    '비보이',
    '크럼프',
    '팝핑',
    '하우스',
    '스트릿',
    '재즈',
    '한국무용',
    '현대무용',
    '발레',
    '브레이킹',
    '라틴',
    '대형군무',
    '프리스타일',
  ];
  return genre !== undefined && genre >= 0 && genre < genres.length
    ? genres[genre]
    : '';
};

const ClassHeader = ({
  imageSrc,
  studioName,
  teacherName,
  type,
  genre,
}: {
  imageSrc: string | undefined;
  studioName: string | undefined;
  teacherName: string | undefined;
  type: string | undefined;
  genre: number | undefined;
}) => {
  const genreText = mapGenreToText(genre);
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
            <p className='px-12 py-4 text-12 font-600 text-green'>
              {genreText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;
