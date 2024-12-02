import KakaoIcon from 'assets/icons/kakao.svg';

const LoginPage = () => {
  return (
    <main className='flex grow flex-col items-center'>
      <section className='pt-80 text-24 font-700'>
        반가워요! <br />춤 클래스를 쉽고 간편하게,{' '}
        <span className='bg-gradient-to-r from-[#74EFC2] to-[#4174F7] bg-clip-text text-transparent'>
          맞춤
        </span>
      </section>
      <section className='pt-40 text-14'>
        클래스 둘러보기, 결제, 오픈 알림까지
        <br />
        맞춤에서 한번에 끝낼 수 있어요!
      </section>
      <img
        src={'/src/assets/images/login-main.png'}
        alt='맞춤 서비스 예시 이미지'
        className='w-[314px] object-cover pt-16'
      />
      <div className='absolute bottom-36 flex w-full flex-col items-center gap-8 px-20'>
        <span className='text-12 text-grey-4'>
          서비스 시작은 <button className='underline'>이용약관</button> /{' '}
          <button className='underline'>개인정보 처리방침</button> 동의를
          의미합니다
        </span>
        <button className='flex h-52 w-full items-center justify-between rounded-[8px] bg-[#fee501] px-16 py-16 text-16 font-500 text-black'>
          <KakaoIcon />
          카카오 로그인
          <div className='w-24' />
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
