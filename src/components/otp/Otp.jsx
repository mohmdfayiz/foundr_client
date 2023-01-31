// import { Toaster, toast } from "react-hot-toast"

// const Otp = (data) => {

//     return (
//         <div className="flex justify-center">
//           <Toaster position="top-center" reverseOrder={false}></Toaster>
//           <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
//             <h2 className="text-darkBlue text-center text-3xl font-bold">
//               OTP
//             </h2>
//             <form
//               onSubmit={(e) => handleSubmit(e)}
//               className="px-[3rem] flex flex-col my-[2rem]"
//             >
//               <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 name="email"
//                 value={data.email}
//                 disabled
//                 className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
//               />
//               <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
//                 OTP
//               </label>
//               <input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter OTP"
//                 onChange={e => setOtp(e.target.value)}
//                 className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
//               />
//             </form>
//             <div className="ml-[3rem]">
//               <button
//                 onClick={(e) => handleSubmit(e)}
//                 className="border border-darkBlue px-6 py-2 text-darkBlue rounded font-bold hover:shadow-md"
//               >
//                 Submit
//               </button>
//               <div className="flex items-center">
//                 {data.counter ? <p  className="text-xs mt-4 mb-1 text-lightBlue">Timer : {data.counter} Sec</p> : 
//                 <p className="text-xs mt-4 mb-1 text-lightBlue">
//                   Didn't get OTP?
//                 <button className="ml-px" onClick={data.onClick}>Resend</button> 
//                 </p>}
//               </div>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default Otp