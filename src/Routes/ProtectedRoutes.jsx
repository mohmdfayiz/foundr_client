import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { authenticated } = useSelector((state) => state.auth);
  return authenticated ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoutes;
