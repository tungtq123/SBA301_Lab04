import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { isLogin } = useAuth();

  return isLogin ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
