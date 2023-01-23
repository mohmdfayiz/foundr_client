import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import { Home } from "./components/Pages/Home";
import { Signup } from "./components/Pages/Signup";
import { Signin } from "./components/Pages/Signin";
import { Footer } from "./components/Footer/Footer";
import { Articles } from "./components/Pages/Articles";
import Messages from "./components/Messages/Messages";
import Events from "./components/Pages/Events";
import { Account } from "./components/Pages/Account";
import { ErrorPage } from "./components/Pages/ErrorPage";

function App() {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
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
