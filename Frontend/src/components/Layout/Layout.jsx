import { useLocation } from "react-router-dom";
import AppRoutes from "../../Routes/AppRoutes";
import { Header } from "../common/header/Header.jsx";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const location = useLocation();

  const options = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  
  return (
    <div className="flex flex-col h-screen">
      
      <Header className="w-full" />
      <div className="flex flex-1">
        <main
          className={`${
            location.pathname === "/signUp" || location.pathname === "/signIn" ? "p-0" : "flex-1  p-2 md:p-4"
          }`}
        >
          <AppRoutes />
        </main>
      </div>
      <ToastContainer options={options} stacked />
    </div>
  );
};

export default Layout;
