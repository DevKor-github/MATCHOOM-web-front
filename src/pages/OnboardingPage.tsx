import { useForm } from 'react-hook-form';
import TextInput from 'components/common/TextInput';
import TextLogo from 'assets/icons/logo-text.svg';

interface OnboardingFormValue {
  name: string;
  phone: string;
  bank: string;
  account: string;
}

const OnboardingPage = () => {
  const { control, handleSubmit } = useForm<OnboardingFormValue>();

  return (
    <main className='flex grow flex-col items-center px-20'>
      <div className='pb-52 pt-24'>
        <TextLogo />
      </div>
      <h2 className='w-full pb-36 text-24 font-700'>
        가입에 꼭 필요한 정보만
        <br />
        받을게요
      </h2>
      <form className='flex w-full flex-col gap-16'>
        <TextInput
          name='name'
          placeholder='이름을 입력해주세요.'
          required
          control={control}
        >
          이름
        </TextInput>
        <TextInput
          name='phone'
          placeholder='전화번호를 입력해주세요.'
          required
          control={control}
        >
          전화번호
        </TextInput>
        <TextInput
          name='bank'
          placeholder='은행을 선택해주세요.'
          required
          control={control}
        >
          은행
        </TextInput>
        <TextInput
          name='account'
          placeholder='계좌번호를 입력해주세요.'
          required
          control={control}
        >
          계좌번호
        </TextInput>
        <button className='absolute bottom-36 h-56 w-[calc(100%-40px)] rounded-full bg-gradient-to-r from-[#74EFC2] to-[#4174F7] text-18 font-700 text-black'>
          회원가입 하기
        </button>
      </form>
    </main>
  );
};

export default OnboardingPage;