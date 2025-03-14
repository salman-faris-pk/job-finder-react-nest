import SignUp from "../components/SignUp";
import Office from "../assets/office.jpg"



const AuthPage = () => {
  return (
    <div className="w-full h-screen grid md:grid-cols-2">
      <div className="h-full">
      <img src={Office} alt="Office" className="w-full h-full object-cover" />
    </div>

      <SignUp />
  </div>
  );
};

export default AuthPage;

