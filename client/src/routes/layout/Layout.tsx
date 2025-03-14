import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer, Navbar } from "../../components";

const Layout = () => {
  const location = useLocation();
  const { user } = useSelector((state: any) => state.user);

  return (
    <main className="bg-[#f7fdfd]">
      <Navbar />
      {user?.token ? <Outlet /> : <Navigate to="/user-auth" state={{ from: location }} replace />}
      <Footer />
    </main>
  );
};

export default Layout;
