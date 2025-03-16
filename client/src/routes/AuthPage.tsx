import SignUp from "../components/SignUp";
import Office from "../assets/office.jpg"
import { Navigate, useLocation } from "react-router-dom";



const AuthPage = () => {

  const user = {
    token: false, 
  };
  const location = useLocation();

  let from = location?.state?.from?.pathname || "/";

  if (user.token) {
    return <Navigate to={from} replace />;
  };

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

