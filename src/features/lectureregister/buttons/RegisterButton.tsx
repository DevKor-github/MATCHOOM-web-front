const RegisterButton = ({ onRegister }: { onRegister: () => void }) => {
  const handleClick = () => {
    onRegister();
  };

  return (
    <button
      className='fixed bottom-20 mx-20 h-64 w-460 rounded-full bg-gradient-to-r from-blue to-green py-8 text-20 font-700 text-black'
      onClick={handleClick}
    >
      다음
    </button>
  );
};

export default RegisterButton;
