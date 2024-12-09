const ClassDetailInfo = ({
  videoSrc,
  detail,
}: {
  videoSrc: string;
  detail: string;
}) => {
  return (
    <div className='gpa-12 mx-20 flex flex-col text-white'>
      <div className='mb-12 ml-4 text-16 font-700'>강의 소개</div>
      <video className='h-200 w-352 rounded-12' controls>
        <source src={videoSrc} type='video/mp4' />
      </video>
      <p className='max-w-352 break-words text-12 font-500'>{detail}</p>
    </div>
  );
};

export default ClassDetailInfo;
