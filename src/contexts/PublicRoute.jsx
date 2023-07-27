import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PublicRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  return !user && !isLoading ? children : <Navigate to="/" />;
};

export default PublicRoute;
