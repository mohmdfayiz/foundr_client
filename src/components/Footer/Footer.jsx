import React from "react";
import foundrLogo from "../../assets/logo.svg";

export const Footer = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-[3rem] py-[1rem] flex justify-between items-center w-full">
        <div>
          <img src={foundrLogo} alt="logo" width={100} />
        </div>
        <div className="flex gap-4 text-sm sm:gap-8 sm:text-lg">
          <li className="text-[#326789] hover:text-lightBlue">About</li>
          <li className="text-[#326789] hover:text-lightBlue">FAQs</li>
          <li className="text-[#326789] hover:text-lightBlue">Help</li>
        </div>
      </div>
    </div>
  );
};
