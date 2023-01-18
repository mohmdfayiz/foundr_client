import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./components/Pages/Home";
import { Signup } from "./components/Pages/Signup";
import { Signin } from "./components/Pages/Signin";
import { Footer } from "./components/Footer/Footer";
import { Articles } from "./components/Pages/Articles";
import Messages from "./components/Messages/Messages";

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/articles" element={<Articles/>} />
        <Route path="/messages" element={<Messages/>} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;
