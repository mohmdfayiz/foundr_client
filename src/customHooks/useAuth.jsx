import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/loggedUserSlice";
const useAuth = () => {

  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 > Date.now()) {
      setAuthenticated(true)
      dispatch(setUser(decoded.userId));
    } else {
      setAuthenticated(false)
    }
  }, []);

  return authenticated;
};

export default useAuth;
