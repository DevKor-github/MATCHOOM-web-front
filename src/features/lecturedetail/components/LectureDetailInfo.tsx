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
  const embedUrl = getYoutubeEmbedUrl(videoSrc || '');

  // 기본 대체 영상 URL
  const fallbackVideoUrl = 'https://www.youtube.com/embed/pokccDdB3RE';
  return (
    <div className='mx-20 flex flex-col gap-12 text-white'>
      <div className='mb-12 ml-4 text-20 font-700'>강의 소개</div>

      <div className='relative w-full' style={{ aspectRatio: '353 / 200' }}>
        <iframe
          className='absolute inset-0 h-full w-full rounded-12'
          src={embedUrl || fallbackVideoUrl} // embedUrl이 유효하지 않을 경우 fallback 영상 표시
          title='YouTube video player'
          loading='lazy'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          referrerPolicy='strict-origin-when-cross-origin'
          sandbox='allow-same-origin allow-scripts allow-popups allow-forms allow-presentation'
        />
      </div>
      <p className='max-w-352 break-words text-12 font-500'>{detail}</p>
    </div>
  );
};

export default ClassDetailInfo;
