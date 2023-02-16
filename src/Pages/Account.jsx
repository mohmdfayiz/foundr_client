import React, { useState } from "react";
import { ProfileCard, UserDetails, Preferences } from "../components";
import { useEffect } from "react";
import axios from "axios";

export const Account = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const getUserDetails = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/user/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(data.userDetails);
      console.log(data);
    };
    getUserDetails();
  }, []);

  return (
    <div className="m-[3rem]">
      <div className="p-[1.5rem] grid grid-cols-12 gap-4 ">
        <ProfileCard
          profilePhoto={userDetails?.profilePhoto}
          userName={userDetails.userName}
          email={userDetails.email}
          connections={userDetails.connections}
        />
        <UserDetails
          intro={userDetails?.intro}
          gender={userDetails?.gender}
          age={userDetails?.age}
          location={userDetails?.location}
        />
        <Preferences 
          isTechnical = {userDetails?.isTechnical}
          haveIdea = {userDetails?.haveIdea}
          accomplishments = {userDetails?.accomplishments}
          education = {userDetails?.education}
          employment = {userDetails?.employment}
          responsibilities = {userDetails?.responsibilities}
          interests = {userDetails?.interests}
          activelySeeking = {userDetails?.activelySeeking}
          cofounderTechnical = {userDetails?.cofounderTechnical}
          cofounderHasIdea = {userDetails?.cofounderHasIdea}
          locationPreference = {userDetails?.locationPreference}
          cofounderResponsibilities = {userDetails?.cofounderResponsibilities}
        />
      </div>
    </div>
  );
};
