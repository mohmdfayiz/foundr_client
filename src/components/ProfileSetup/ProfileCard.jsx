import React, { useState } from "react";
import converToBase64 from "../../helper/convert";
import avatar from '../../assets/man.png'

const ProfileCard = ({ userName, email, connections }) => {

  const [file, setFile] = useState("");
  const onUpload = async (e) => {
    const base64 = await converToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="flex flex-col py-5 justify-center items-center md:col-span-5 col-span-12 rounded-lg shadow-md bg-white leading-none relative z-0">

      <div >
        <label htmlFor="profile-photo" className="cursor-pointer">
          <img src={ file || avatar} alt="avatar" className='h-24 w-24 object-cover rounded-full'/>
        </label>
        <input type="file" id="profile-photo" className="hidden" onChange={onUpload}/>
      </div>

      <h2 className="text-xl font-bold text-darkBlue mt-2">{userName}</h2>
      <p className="text-gray-500 m-2">{email}</p>
      {/* <div className="flex">
        <button className="border bg-darkBlue text-white font-semibold px-4 py-3 m-2 rounded-md">
          {connections?.length} Connection
        </button>
        <Link
          to={"/messages"}
          className="border bg-darkBlue text-white font-semibold px-4 py-3 m-2 rounded-md"
        >
          Messages
        </Link>
      </div> */}
      {/* <div className="absolute top-4 right-4 cursor-pointer">
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </button>
        
      </div> */}
    </div>
  );
};

export default ProfileCard;
