import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (
      token &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate("/profile");
    }
  }, [token, location.pathname, navigate]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
