import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import avatar from "../../assets/man.png";
import { useDispatch } from "react-redux";
import {
  showModal,
  setProfile,
} from "../../app/slices/matchingProfileSlice";

export const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const matchingProfiles = async () => {
      const {
        data: { matchingProfiles },
      } = await axios.get("/api/user/matchingProfiles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(matchingProfiles);
    };
    matchingProfiles();
  }, []);

  const dispatch = useDispatch();
  const showProfile = async (profile) => {
    dispatch(showModal());
    dispatch(setProfile(profile));
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto my-[4rem] pl-12 py-4 ">
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="font-bold text-lg  text-darkBlue ">Matching Profiles</h2>
        <div className="flex overflow-x-auto overflow-y-hidden scrollBar py-3">
          {profiles.map((profile) => (
            <div
              key={profile._id}
              className="bg-[#e9eef2] mr-5 mt-3 flex flex-col items-center shadow profileCard p-4 hover:shadow-lg cursor-pointer"
            >
              <img
                src={profile.profilePhoto || avatar}
                alt="profile"
                className="rounded-full w-20 h-20 object-cover"
              />
              <p className="text-sm text-center font-bold text-darkBlue ten-chars">
                {profile.userName}
              </p>
              <p className="text-xs text-gray-600">
                {profile.location?.country}
              </p>
              <button
                onClick={() => showProfile(profile)}
                className="px-2 py-1 border border-darkBlue rounded-md text-xs mt-1 text-darkBlue"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
