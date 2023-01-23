import React from "react";

const Preferences = () => {
  return (
    <div className="col-span-12 my-4 p-5 shadow-md rounded-lg bg-white">
      <h2 className="text-lg font-bold text-darkBlue">Skills</h2>
      <div className="m-3">
        <h4 className="font-medium">Are you Technical?</h4>
        <p className="text-xs text-gray-400">
          You are a programmer, scientist or engineer who can build the product
          without outside assistance.
        </p>
        <input type="radio" name="" id="" /> <label htmlFor="">Yes</label>
        <input className="ml-2" type="radio" name="" id="" />{" "}
        <label htmlFor="">No</label>

        <h4 className="font-medium mt-2">Impressive accomplishment</h4>
        <textarea name="accomplishments" id="" cols="" rows="3" className="border w-full p-2"></textarea>

        <h4 className="font-medium mt-2">Education: schools, degrees (including field of study), and years of graduation. Use a separate line for each school.</h4>
        <textarea name="accomplishments" id="" cols="" rows="3" className="border w-full p-2"></textarea>

        <h4  className="font-medium mt-2">Employment: employers, position / titles, and dates. Use a separate line for each job, most recent first.*</h4>
        <textarea name="accomplishments" id="" cols="" rows="3" className="border w-full p-2"></textarea>

      </div>
      <hr />
      <h2 className="text-lg font-bold text-darkBlue my-3">
        Co-founder Preferences
      </h2>
      <div className="m-3">
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

        <h4>Are you looking for a co-founder who already has a specific idea, or are you open to exploring new ideas together?</h4>
        <input type="radio" name="" id="" />
        <label htmlFor="">I want to see co-founders who have a specific idea</label>

      </div>
    </div>
  );
};

export default Preferences;
