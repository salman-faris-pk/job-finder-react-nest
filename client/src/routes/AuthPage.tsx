import SignUp from "../components/SignUp";
import Office from "../assets/office.jpg"


const AuthPage = () => {
  return (
    <div className='w-full'>
      <img src={Office} alt='Office' className='object-contain hidden md:block opacity-70' loading="eager"/>
      <SignUp />
    </div>
  );
};

export default AuthPage;
