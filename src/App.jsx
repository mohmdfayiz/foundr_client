import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Articles } from "./Pages/Articles";
import Article from "./components/Articles/Article";
import Messages from "./components/Messages/Messages";
import Events from "./Pages/Events";
import { Account } from "./Pages/Account";
import { ErrorPage } from "./Pages/ErrorPage";
import { Otp } from "./Pages/Otp";
import { ForgotPassword } from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { authenticate, unAuthenticate } from "./app/slices/authSlice";
import { setUser } from "./app/slices/loggedUserSlice";
import { toast } from "react-hot-toast";
import UnAuthenticatedOnlyRoutes from "./Routes/UnAuthenticatedOnlyRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";

function App() {

  const dispatch = useDispatch();
  const authStateListener = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        let decoded = await jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(authenticate());
          dispatch(setUser(decoded.userId));
        } else {
          toast.error("Session expired!, Please Signin.");
          localStorage.removeItem("token");
          dispatch(unAuthenticate());
        }
      } catch (error) {
        dispatch(unAuthenticate());
      }
    }
  };

  useEffect(() => {
    authStateListener();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/events" element={<Events />} />

        <Route element={<UnAuthenticatedOnlyRoutes />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/emailVarification" element={<Otp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/messages" element={<Messages />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
