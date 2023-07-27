import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  return user && !isLoading ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
