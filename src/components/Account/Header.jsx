import React from "react";

export const Header = () => {
  return (
    <div className="m-[3rem]">
      <div className="h-20"></div>
      <div className="p-[1.5rem] grid grid-cols-12 ">
        <div className="flex flex-col justify-center items-center md:col-span-5 col-span-12 rounded-lg shadow-md bg-white py-10 leading-none relative">
          <img src="\src\assets\man.png" alt="" width={100} />
          <h2 className="text-xl font-bold text-darkBlue mt-2">User Name</h2>
          <p className="text-gray-500 m-2">user123@gmail.com</p>
          <p className="text-gray-500 m-2">
            City, State, country ... contactinfo{" "}
          </p>
          <button className="border border-darkBlue p-2 m-2">
            500 connections
          </button>
          <div className="absolute top-4 right-4 cursor-pointer">
            <img src="\src\assets\pencil.png" alt="edit" width={20} />
          </div>
        </div>
        <div className="md:col-span-7 col-span-12 md:ml-4 shadow-md rounded-lg bg-white">
          <div className="p-5">
            <h3 className="font-bold text-xl text-darkBlue">User Details</h3>
            <div className="my-3">
              <form action="" className="flex flex-wrap">
                <label htmlFor="">About</label>
                <textarea
                  className="border w-full p-3"
                  name=""
                  id=""
                  cols="30"
                  rows="3"
                  placeholder="type here..."
                ></textarea>
                <div className="flex flex-col mt-2">
                  <label htmlFor="">Gender</label>
                  <select name="" id="" className="border">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="">Date of birth</label>
                  <input className="border" type="date" name="" id="" />
                </div>
                <div className="my-2">
                  <input
                    className="border py-2 pl-1"
                    placeholder="Enter your city"
                    type="text"
                    name=""
                    id=""
                  />
                  <input
                    className="border py-2 "
                    placeholder="Enter your state"
                    type="text"
                    name=""
                    id=""
                  />
                  <input
                    className="border py-2"
                    placeholder="Enter your country"
                    type="text"
                    name=""
                    id=""
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-12 my-4 p-5 shadow-md rounded-lg bg-white">
          <h2 className="text-xl font-bold text-darkBlue">Preference</h2>
          <div className="mt-3">
            <form action="">
              <h4 className="font-medium">Are you Technical?</h4>
              <p className="text-xs text-gray-400">
                You are a programmer, scientist or engineer who can build the
                product without outside assistance.
              </p>
              <input type="radio" name="" id="" /> <label htmlFor="">Yes</label>
              <input className="ml-2" type="radio" name="" id="" />{" "}
              <label htmlFor="">No</label>
              <h4 className="font-medium mt-2">
                Are you Actively seeking a co-founder ?
              </h4>
              <p className="text-xs text-gray-400">
                Startup School can help you find others interested in finding a
                co-founder.
              </p>
              <input type="radio" name="" id="" /> <label htmlFor="">Yes</label>
              <input className="ml-2" type="radio" name="" id="" />{" "}
              <label htmlFor="">No</label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
