const TEXT = {
  subheader: ['님의 새로운', '클래스를 만들어 볼까요?'],
  matchoom: '맞춤',
};

const Subheader = ({ name }: { name: string }) => {
  return (
    <div className='w-full'>
      <p className='text-base font-normal leading-6 text-white'>
        {name}
        {TEXT.subheader[0]}
      </p>
      <div className='flex flex-row'>
        <span className='text-base font-normal bg-gradient-to-r from-green to-blue bg-clip-text leading-8 text-transparent'>
          {TEXT.matchoom}&nbsp;
        </span>
        <p className='text-base font-normal leading-8 text-white'>
          {TEXT.subheader[1]}
        </p>
      </div>
    </div>
  );
};

export default Subheader;
