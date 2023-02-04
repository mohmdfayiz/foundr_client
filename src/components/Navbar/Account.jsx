import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unAuthenticate } from "../../features/authentication/authSlice";

export const Account = () =>{

  const dispatch = useDispatch();
  function userLogout(){
    localStorage.removeItem('token');
    dispatch(unAuthenticate())
  }

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
        <button onClick={userLogout} className="text-[#326789] hover:text-lightBlue my-1">
          Logout
        </button>
      </div>
    </div>
    </>
  );
}