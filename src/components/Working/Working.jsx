import React from "react";
import { steps } from "../../constants";

export const Working = () => {
  return (
    <div className="container max-w-7xl mx-auto my-[5rem] flex flex-col">
      <h2 className="font-extrabold text-2xl text-darkBlue text-center mb-4">
        How does it work?
      </h2>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center justify-center">
          <div className="bg-lightBlue h-10 w-10 sm:h-12 sm:w-12 m-3 flex items-center justify-center rounded-full">
            <p className="text-white font-bold">{index + 1}</p>
          </div>
          <div className="w-2/3">
            <p className="text-lightBlue md:text-xl ml-4">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
