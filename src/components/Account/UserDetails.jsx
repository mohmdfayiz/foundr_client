import React from "react";

const PersonalInfo = () => {
  return (
    <div className="md:col-span-7 col-span-12 md:ml-4 shadow-md rounded-lg bg-white">
      <div className="p-5">
        <h3 className="font-bold text-lg text-darkBlue">User Details</h3>
        <div className="my-3">
          <form action="" className="">
            <label htmlFor="" className="text-gray-500">
              About
            </label>
            <textarea
              className="border w-full p-3"
              name=""
              id=""
              cols="30"
              rows="3"
              placeholder="type here..."
            ></textarea>
            <div className="flex flex-wrap md:justify-between">
              <div className="flex flex-col mt-2">
                <label htmlFor="" className="text-gray-500">
                  Gender
                </label>
                <select name="" id="" className="border w-60 p-1" >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className="flex flex-col m-2">
                <label htmlFor="" className="text-gray-500">
                  Date of birth
                </label>
                <input className="border w-60 p-1" type="date" name="" id=""/>
              </div>
            </div>

            <div className="my-2">
              <input
                className="border py-2 pl-1"
                placeholder="City"
                type="text"
                name=""
                id=""
              />
              <input
                className="border py-2 "
                placeholder="State"
                type="text"
                name=""
                id=""
              />
              <input
                className="border py-2"
                placeholder="Country"
                type="text"
                name=""
                id=""
              />
            </div>
          </form>
          <div className="flex justify-end">
            <button className="mx-2 border py-1 px-2  border-darkBlue text-darkBlue font-bold">Save</button>
            <button className="mx-2 border border-gray-500 py-1 px-2 text-gray-500 font-bold">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
