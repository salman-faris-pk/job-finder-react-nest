import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Navbar,Footer } from "../../components"



const Layout = () => {
  const location = useLocation();
  const user=true;

  return (
    <main className="bg-[#f7fdfd]">
      <Navbar />
      {/* {user ? <Outlet /> : <Navigate to="/user-auth" state={{ from: location }} replace />} */}
       <Outlet/>
      {user && <Footer />}
    </main>
  )
};


export default Layout;