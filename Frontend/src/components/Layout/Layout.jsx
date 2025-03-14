// import { useLocation } from "react-router-dom";
import AppRoutes from "../../Routes/AppRoutes";
import { Header } from "../common/header/Header.jsx";

const Layout = () => {
  // const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      <Header className="w-full" />
      <div className="flex flex-1">
        <main className={`flex-1  p-2 md:p-4  `}>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default Layout;
