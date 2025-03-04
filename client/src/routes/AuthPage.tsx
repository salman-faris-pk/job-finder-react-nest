import SignUp from "../components/SignUp";
import Office from "../assets/office.jpg"



const AuthPage = () => {
  return (
    <div className="w-full h-screen relative bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${Office})`, opacity: 0.8 }}>
      <SignUp />
    </div>
  );
};

export default AuthPage;

