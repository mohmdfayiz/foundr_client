import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email) return toast.error("Email required");
    axios({
      method: "POST",
      url: `http://localhost:8000/api/user/verifyUser`,
      data: {email},
    })
      .then((res) => {
        toast.success("OTP sent successfully.");
        axios.post('http://localhost:8000/api/user/sendMail',({email})).then(()=>{
          navigate('/emailVarification',{ state: { data: {email:email} } })
        })
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 404) toast.error("User with this Email not found!")
        else toast.error("Oops, something went wrong!");
      });
  };

  return (
    <div className="flex justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="my-[4rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-2xl font-bold">
          Forgot Password?
        </h2>
        <p className="text-xs text-center px-10 my-3 text-lightBlue">
          Don't worry, Recover your Account by enter the registered email. We
          will send you an OTP to verify it's you.
        </p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="px-[3rem] flex flex-col"
        >
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />

          <div className="flex justify-center mt-3">
            <Link
              to={"/signin"}
              className="border border-darkBlue px-3 py-2 text-darkBlue rounded font-bold hover:shadow-md"
            >
              Back to Sign in
            </Link>
            <button
              type="submit"
              className="border bg-darkBlue px-6 py-2 ml-4   text-white rounded font-bold hover:shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
