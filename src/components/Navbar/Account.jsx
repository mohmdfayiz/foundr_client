import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unAuthenticate } from "../../features/authentication/authSlice";
import avatar from "../../assets/man.png"

export const Account = () =>{

  const navigate = useNavigate()
  const dispatch = useDispatch();
  function userLogout(){
    localStorage.removeItem('token');
    dispatch(unAuthenticate())
    navigate('/', {replace:true})
  }

  return (
    <>
    <div className="dropdown">
      <img
        width={40}
        className="rounded-full"
        src={avatar}
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
