import { Outlet } from "react-router-dom";
import { Bgloader, Footer, Navbar } from "../../components";
import { useSelector } from "../../redux/store";

const Layout = () => {

  const {loading} = useSelector((state) => state.user);
  
  if(loading){
    return <Bgloader/>
  };
    
  return (
    <main className="bg-[#f7fdfd]">

      <Navbar />
      <div className="min-h-screen">
      <Outlet />
      </div>
      <Footer />
      
    </main>
  );
};

export default Layout;
