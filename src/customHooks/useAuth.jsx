import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/loggedUser/loggedUserSlice";
import {
  authenticate,
  unAuthenticate,
} from "../features/authentication/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 > Date.now()) {
      dispatch(authenticate());
      dispatch(setUser(decoded.userId));
    } else {
      dispatch(unAuthenticate());
    }
  }, []);

  return authenticated;
};

export default useAuth;
