import React from "react";
import { Link } from "react-router-dom";
import foundrLogo from "../../assets/logo.svg";
let login = true;

export const Account = () =>{
  return (
    <>
    <div className="dropdown">
      <img
        width={40}
        className="rounded-full"
        src="\src\assets\man.png"
        alt="profile"
      />
      <div className="dropdown-content">
        <li key={"message"} className="text-[#326789] hover:text-lightBlue my-1.5">
          <Link to={"/messages"}>Messages</Link>
        </li>
        <li key={"account"} className="text-[#326789] hover:text-lightBlue my-1.5">
          <Link to={"/account"}>Account</Link>
        </li>
        <hr />
        <li key={"logout"} className="text-[#326789] hover:text-lightBlue my-1">
          <Link to={"/"}>Logout</Link>
        </li>
      </div>
    </div>
    </>
  );
}

function Navbar() {
  return (
    <div className="navBar  flex justify-between items-center px-[3rem] py-[1rem] bg-white w-full fixed z-10 shadow top-0">
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
        <li className="text-[#326789] hover:text-lightBlue">
          <Link to={'/events'}>Events</Link></li>
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
