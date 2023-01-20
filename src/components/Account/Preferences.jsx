import React from "react";

const Preferences = () => {
  return (
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
  );
};

export default Preferences;
