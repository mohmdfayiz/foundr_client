import React from 'react'
import { Link } from 'react-router-dom'
export const Signin = () => {
  return (
    <div className="flex justify-center">
      <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-3xl font-bold">
          Sign in
        </h2>
        <div className="px-[3rem] pt-[1rem] flex flex-col my-[2rem]">
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            Email
          </label>
          <input
            type="text"
            name="email"
            id=""
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            Password
          </label>
          <input
            type="text"
            name="password"
            id=""
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
        </div>
        <div className="ml-[3rem]">
        <button className="border border-darkBlue px-6 py-2 text-darkBlue rounded font-bold hover:shadow-md">
          Sign in
        </button>
        <p className="text-xs mt-4 mb-1 text-lightBlue">Don’t have an account? <Link to={'/signup'}>Sign up.</Link></p>
        <p className="text-xs text-lightBlue">Forgot Password?</p>
        </div>
      </div>
    </div>
  )
}
