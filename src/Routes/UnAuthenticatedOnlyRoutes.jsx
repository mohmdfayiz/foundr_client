import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const UnAuthenticatedOnlyRoutes = () => {
  const location = useLocation();
  const { authenticated } = useSelector((state) => state.auth);
  return !authenticated ? <Outlet /> : <Navigate to={'/'} />;
};

export default UnAuthenticatedOnlyRoutes;
