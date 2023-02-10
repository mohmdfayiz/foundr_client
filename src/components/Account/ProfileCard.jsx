import React from "react";

const ProfileCard = ({userName,email}) => {
  return (
    <div className="flex flex-col py-5 justify-center items-center md:col-span-5 col-span-12 rounded-lg shadow-md bg-white leading-none relative z-0">
      <img src="\src\assets\man.png" alt="" width={100} />
      <h2 className="text-xl font-bold text-darkBlue mt-2">{userName}</h2>
      <p className="text-gray-500 m-2">{email}</p>
      <button className="border border-darkBlue p-2 m-2">
        500 connections
      </button>
      <div className="absolute top-4 right-4 cursor-pointer">
        {/* <img src="\src\assets\pencil.png" alt="edit" width={20} /> */}
        <p className="text-xl font-bold rotate-90">...</p>
      </div>
    </div>
  );
};

export default ProfileCard;
