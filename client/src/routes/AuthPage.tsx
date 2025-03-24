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
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="h-64 md:h-screen md:w-1/2">
        <img 
          src={Office} 
          alt="Office" 
          loading="eager" 
          className="w-full h-full object-cover object-center" 
        />
      </div>


    <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 mt-3 sm:mt-0">
      <SignUp />
    </div>
  </div>
  );
};

export default AuthPage;

