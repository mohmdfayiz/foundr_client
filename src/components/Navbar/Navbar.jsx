import React from "react";
import { Link } from "react-router-dom";
import foundrLogo from "../../assets/logo.svg";
let login = true;

function Account() {
  return (
    <li className="dropdown">
      <img
        width={40}
        className="rounded-full"
        src="src\assets\pexels-bestbe-models-2080383.jpg"
        alt="profile"
      />
      <div class="dropdown-content">
        <li className="text-[#326789] hover:text-lightBlue my-1">
          <Link to={"/notifications"}>Notifications</Link>
        </li>
        <li className="text-[#326789] hover:text-lightBlue my-1">
          <Link to={"/messages"}>Messages</Link>
        </li>
        <li className="text-[#326789] hover:text-lightBlue my-1">
          <Link to={"/account"}>Account</Link>
        </li>
      </div>
    </li>
  );
}

function Navbar() {
  return (
    <div className="navBar  flex justify-between items-center px-[3rem] py-[1rem] bg-white w-full fixed shadow top-0">
      <div className="logoDiv">
        <img src={foundrLogo} className="h-12" alt="logo" />
      </div>
      <div className="menu flex items-center gap-8">
        <li className="text-[#326789] hover:text-lightBlue">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="text-[#326789] hover:text-lightBlue">
          <Link to={"/articles"}>Articles</Link>
        </li>
        <li className="text-[#326789] hover:text-lightBlue">Mentorship</li>
        {login ? (
          <Account />
        ) : (
          <li className="text-[#326789] hover:text-lightBlue">About</li>
        )}
      </div>
    </div>
  );
}

export default Navbar;
