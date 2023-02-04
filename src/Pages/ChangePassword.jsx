// import { Toaster } from "react-hot-toast"

const ChangePassword = () => {
  return (
    <div className="flex justify-center">
      {/* <Toaster position="top-center" reverseOrder={false}></Toaster> */}
      <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-2xl font-bold">
          Change Password
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="px-[3rem] flex flex-col my-[2rem]"
        >
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            New password
          </label>
          <input
            type="text"
            name="newPassword"
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            Confirm password
          </label>
          <input
            type="password"
            name="otp"
            onChange={e => setOtp(e.target.value)}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
        </form>
        <div className="ml-[3rem]">
          <button
            onClick={(e) => handleSubmit(e)}
            className="border border-darkBlue px-6 py-2 text-darkBlue rounded font-bold hover:shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword