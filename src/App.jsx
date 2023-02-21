import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Articles } from "./Pages/Articles";
import Article from "./Pages/Article";
import Messages from "./components/Messages/Messages";
import Events from "./Pages/Events";
import { Account } from "./Pages/Account";
import { ErrorPage } from "./Pages/ErrorPage";
import { Otp } from "./Pages/Otp";
import { ForgotPassword } from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import { EmailVerification } from "./Pages/EmailVerification";
import { AuthorizeUser } from "./middlewares/auth";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {authenticate,unAuthenticate,} from "./features/authentication/authSlice";

function App() {

  const dispatch = useDispatch();
  const authStateListener = () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        let decoded = jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(authenticate());
        } else {
          dispatch(unAuthenticate());
        }
      } catch (error) {
        dispatch(unAuthenticate());
      }
    }
  };

  useEffect(() => {
    authStateListener();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/emailVarification" element={<Otp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyEmail" element={<EmailVerification />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<Article/>} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/messages"
          element={
            <AuthorizeUser>
              <Messages />
            </AuthorizeUser>
          }
        />
        <Route
          path="/account"
          element={
            <AuthorizeUser>
              <Account />
            </AuthorizeUser>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
