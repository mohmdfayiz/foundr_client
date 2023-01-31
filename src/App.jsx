import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Footer } from "./components/Footer/Footer";
import { Articles } from "./Pages/Articles";
import Messages from "./components/Messages/Messages";
import Events from "./Pages/Events";
import { Account } from "./Pages/Account";
import { ErrorPage } from "./Pages/ErrorPage";
import {Otp} from "./Pages/Otp";
import { ForgotPassword } from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import { EmailVerification } from "./Pages/EmailVerification";

function App() {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/emailVerification" element={<Otp/>}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/verifyEmail" element={<EmailVerification/>} />
        <Route path="/changePassword" element={<ChangePassword/>} />
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;
