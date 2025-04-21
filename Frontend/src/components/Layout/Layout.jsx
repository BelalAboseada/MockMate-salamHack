import { useLocation } from "react-router-dom";
import AppRoutes from "../../Routes/AppRoutes";
import { Header } from "../common/header/Header.jsx";
import { ToastContainer, Bounce } from "react-toastify";

const Layout = () => {
  const location = useLocation();

  const options = {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  return (
    <div className="flex flex-col h-screen">
      <Header className="w-full" />
      <div className="flex flex-1">
        <main
          className={`flex-auto ${
            location.pathname === "/signUp" || location.pathname === "/signIn"
              ? "p-0"
              : "p-2 md:p-4"
          }`}
        >
          <AppRoutes />
        </main>
      </div>
      <ToastContainer {...options} stacked />
    </div>
  );
};

export default Layout;
