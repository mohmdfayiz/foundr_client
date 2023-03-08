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
import { AuthorizeUser, RedirectUser } from "./middlewares/auth";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { authenticate, unAuthenticate } from "./app/slices/authSlice";
import { setUser } from "./app/slices/loggedUserSlice";
import { toast } from "react-hot-toast";
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
        <Route path="/signup" element={<RedirectUser><Signup /></RedirectUser>}/>
        <Route path="/emailVarification" element={<RedirectUser><Otp/></RedirectUser>}/>
        <Route path="/signin" element={<RedirectUser><Signin /></RedirectUser>}/>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/events" element={<Events />} />
        <Route path="/messages"element={<AuthorizeUser><Messages /></AuthorizeUser>}/>
        <Route path="/account"element={<AuthorizeUser><Account /></AuthorizeUser>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
