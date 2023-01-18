import React from "react";
import foundrLogo from "../../assets/logo.svg";


function Navbar() {
  return (
      <div className="navBar flex justify-between items-center px-[3rem] py-[1rem] bg-white">
        <div className="logoDiv">
          <img src={foundrLogo} className="h-12" alt="logo" />
        </div>
        <div className="menu flex gap-8">
          <li className="text-[#326789] hover:text-lightBlue">Home</li>
          <li className="text-[#326789] hover:text-lightBlue">Articles</li>
          <li className="text-[#326789] hover:text-lightBlue">Mentorship</li>
          <li className="text-[#326789] hover:text-lightBlue">Contact</li>
        </div>
      </div>
      
  );
}

export default Navbar;
