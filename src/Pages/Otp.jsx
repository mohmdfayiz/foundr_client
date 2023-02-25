import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authenticate } from "../features/authentication/authSlice";

export const Otp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(userData?.email);
    setUsername(userData?.userName);
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await axios.post(`/api/user/verifyOtp?code=${otp}`);
      if (status === 200) {
        if (userName) { // sign up api
          await axios
            .post(`/api/user/signup`, { ...userData })
            .then((response) => {
              toast.success("Signup success🎉");
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              );
              dispatch(authenticate());
              navigate("/");
            });
        } else { // change password
          toast.success("OTP Verified.");
          navigate("/changePassword",{state:{email}});
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Invalid OTP!");
      } else {
        toast.error("Something went wrong! Try agian.");
      }
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/user/authenticate?email=${email}`);
      await axios.post("/api/user/sendMail", {
        email,
        content: `OTP for your email verification is ${data.code}`,
      });
      setCounter(60);
      toast.success("OTP has been sent to your email");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-3xl font-bold">OTP</h2>
        <form className="px-[3rem] my-[1rem]" onSubmit={handleSubmit}>
          <label className="text-sm text-darkBlue mt-5" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={email}
            disabled
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 mb-5 text-darkBlue"
          />
          <label className="text-sm text-darkBlue mt-5" htmlFor="otp">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 mb-5 text-darkBlue"
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="border border-darkBlue mt-2 px-6 py-2 text-darkBlue rounded font-bold hover:shadow-md"
            >
              Submit
            </button>
            <div className="flex items-center">
              {counter ? (
                <p className="text-xs text-lightBlue">Timer : {counter} Sec</p>
              ) : (
                <p className="text-xs text-lightBlue">
                  Didn't get OTP?
                  <button className="ml-px" onClick={resendOtp}>
                    Resend
                  </button>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
