import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authenticate } from "../features/authentication/authSlice";
import { toast, Toaster } from "react-hot-toast";

export const Otp = () => {
  
  const [email,setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(60);
  const location = useLocation();
  const data = location.state?.data;
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{
    setEmail(data.email)
    setTimeout(()=>toast.success("An OTP has been sent to your email."),100)
  },[])

  useEffect(()=>{
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      ({
        method:'POST',
        url: `http://localhost:8000/api/user/verifyOtp?otp=${otp}`,
      })
      .then(() => {
        axios
      ({
        method:'POST',
        url: `http://localhost:8000/api/user/signup`,
        data:data
      }).then(()=> {
          dispatch(authenticate());
          navigate("/", { replace: "true" });
        })
    })
      .catch(() => {
        toast.error("Sorry, something went wrong, try again...") 
      });
  };

  const resendOtp = ()=>{
    axios({
      method:"POST",
      url:`http://localhost:8000/api/user/sendMail`,
      data:data,
    }).then((res)=> {
      toast.success("OTP resent successfully.")
      setCounter(60)
    })
    .catch(()=>{ toast.error('Oops, something went wrong!') })
  }

  return (
    <div className="flex justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-3xl font-bold">
          OTP
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="px-[3rem] flex flex-col my-[2rem]"
        >
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={email}
            disabled
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            OTP
          </label>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={e => setOtp(e.target.value)}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
        </form>
        <div className="ml-[3rem]">
          <button
            onClick={(e) => handleSubmit(e)}
            className="border border-darkBlue px-6 py-2 text-darkBlue rounded font-bold hover:shadow-md"
          >
            Submit
          </button>
          <div className="flex items-center">
            {counter ? <p  className="text-xs mt-4 mb-1 text-lightBlue">Timer : {counter} Sec</p> : 
            <p className="text-xs mt-4 mb-1 text-lightBlue">
              Didn't get OTP?
            <button className="ml-px" onClick={resendOtp}>Resend</button> 
            </p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp