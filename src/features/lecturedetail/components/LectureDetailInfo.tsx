const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return '';

  let videoId = '';

  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1];
  } else if (url.includes('watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  }
  if (!videoId) return '';

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return embedUrl;
};

const ClassDetailInfo = ({
  videoSrc,
  detail,
}: {
  videoSrc: string | undefined;
  detail: string | undefined;
}) => {
  return (
    <div className='gpa-12 mx-20 flex flex-col text-white'>
      <div className='mb-12 ml-4 text-16 font-700'>강의 소개</div>
      <iframe
        className='h-200 w-full rounded-12'
        src={`${getYoutubeEmbedUrl(videoSrc || '')}?enablejsapi=1&origin=http://127.0.0.1:3000`}
        title='YouTube video player'
        loading='lazy'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        referrerPolicy='strict-origin-when-cross-origin'
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms allow-presentation'
      />
      <p className='max-w-352 break-words text-12 font-500'>{detail}</p>
    </div>
  );
};

export default ClassDetailInfo;
