import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/signUp" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
