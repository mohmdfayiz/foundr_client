import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./components/Pages/Home";
import { Signup } from "./components/Pages/Signup";
import { Signin } from "./components/Pages/Signin";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;
