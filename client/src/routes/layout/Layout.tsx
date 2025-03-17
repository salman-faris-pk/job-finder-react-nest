import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Bgloader, Footer, Navbar } from "../../components";
import { useSelector } from "../../redux/store";

const Layout = () => {
  const location = useLocation();
  const { user,loading} = useSelector((state) => state.user);
  

  if(loading){
    return <Bgloader/>
  };
    
  return (
    <main className="bg-[#f7fdfd]">

      <Navbar />
      {user ? <Outlet /> : <Navigate to="/user-auth" state={{ from: location }} replace />}
      {user&&<Footer />}
      
    </main>
  );
};

export default Layout;
