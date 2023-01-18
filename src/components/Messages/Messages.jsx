import React from "react";

const Messages = () => {
  return (
    <div className="m-[3rem]">
      <div className="h-20"></div>

      <div className="flex items-center">
        <img src="src\assets\Message.svg" width={35} alt="Message_icon" />
        <h2 className="ml-px text-[#91AABA] text-3xl font-bold">Messages</h2>
      </div>

      <div className="grid grid-cols-12 my-6 rounded-lg messageBox">
        <div className="col-span-4 flex flex-col px-3 overflow-y-scroll bg-darkBlue text-white">
          <div className="flex items-center my-2 p-2 rounded hover:bg-lightBlue cursor-pointer ">
            <img className="rounded-full w-10" src="src\assets\pexels-andrew-personal-training-697509.jpg" alt="profile_img" />
            <h2 className="ml-2 font-bold">Name</h2>
          </div>
          <div className="flex items-center my-2 p-2 rounded hover:bg-lightBlue cursor-pointer ">
            <img className="rounded-full w-10" src="src\assets\pexels-andrew-personal-training-697509.jpg" alt="profile_img" />
            <h2 className="ml-2 font-bold">Name</h2>
          </div>
          <div className="flex items-center my-2 p-2 rounded hover:bg-lightBlue cursor-pointer ">
            <img className="rounded-full w-10" src="src\assets\pexels-andrew-personal-training-697509.jpg" alt="profile_img" />
            <h2 className="ml-2 font-bold">Name</h2>
          </div>
          <div className="flex items-center my-2 p-2 rounded hover:bg-lightBlue cursor-pointer ">
            <img className="rounded-full w-10" src="src\assets\pexels-andrew-personal-training-697509.jpg" alt="profile_img" />
            <h2 className="ml-2 font-bold">Name</h2>
          </div>
          
        </div>

        <div className="col-span-8 bg-gray-50 p-5 overflow-y-scroll relative">
           <div className="absolute bottom-10 flex">
              <input type="text" name="" id="" className="border border-darkBlue focus:outline-none py-2 px-5 rounded-3xl"/>
              <button className="bg-darkBlue p-3 text-white font-bold rounded-full ml-2">🏹</button>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Messages;
