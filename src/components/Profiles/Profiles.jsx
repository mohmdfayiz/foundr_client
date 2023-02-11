import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
export const Profiles = () => {

  const [profiles, setProfiles] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const matchingProfiles = async () => {
      const { data } = await axios.get("/api/user/matchingProfiles", {headers:{Authorization: `Bearer ${token}`}});
      setProfiles(data);
    };
    matchingProfiles();
  },[]);

  const handleConnection = async(user) =>{
    const config = {headers:{Authorization: `Bearer ${token}`}}
    const {status} = await axios.post(`/api/user/connectionRequest?to=${user}`,{}, config);
    if(status === 201){ toast.success('Request sent successfully')}
  }

  return (
    <div className="bg-white w-full  my-[4rem] pl-12 py-4 ">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h2 className="font-bold text-lg  text-darkBlue ">Matching Profiles</h2>
      <div className="flex overflow-x-auto overflow-y-hidden scrollBar py-3">
        {
          profiles.map((profile) => 
            <div key={profile._id} className="bg-[#e9eef2] mr-5 mt-3 flex flex-col items-center shadow profileCard p-4 hover:shadow-lg cursor-pointer">
              <img src="src\assets\man.png" alt="profile" />
              <p className="text-sm font-bold text-darkBlue">{profile.userName}</p>
              <p className="text-xs text-gray-600">country</p>
              <button onClick={() => handleConnection(profile._id)} className="px-3 py-1 border border-darkBlue rounded-md text-xs mt-1 text-darkBlue">
                Connect
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
