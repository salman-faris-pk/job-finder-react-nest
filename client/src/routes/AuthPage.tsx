import SignUp from "../components/SignUp";
import Office from "../assets/office.jpg"
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../redux/store";
import { Bgloader } from "../components";



const AuthPage = () => {

  const {user,loading}=useSelector((state)=> state.user)
  const location = useLocation();

  let from = location?.state?.from?.pathname || "/";
  
  if(loading){
    return <Bgloader/>
  }

  if (user) {
    return <Navigate to={from} replace />;
  };


  return (
    <div className="w-full h-screen grid md:grid-cols-2">
      <div className="h-full">
      <img src={Office} alt="Office" loading="eager" className="w-full h-full object-cover" />
    </div>

      <SignUp />
  </div>
  );
};

export default AuthPage;

