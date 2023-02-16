import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";

const PersonalInfo = () => {
  
  const [userDetails, setUserDetails] = useState({})
  const [tempUserDetails, setTempUserDetails] = useState({})

  const updateUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const { status } = await axios.post("/api/user/updateUserDetails", tempUserDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 201) {
        toast.success("User details updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Sorry, something went wrong!");
    }
  };

  const formik = useFormik({
    initialValues:{
      about: '',
      gender: '',
      dateOfBirth: '',
      country: '',
      state: '',
      city: '',
      isTechnical: '',
      haveIdea: '',
      accomplishments: '',
      education:'',
      employment:'',
      responsibilities: [],
      interests: [],
      activelySeekingCofounder: '',
      cofounderSkill: '',
      cofounderIdea: '',
      locationPreference:'',
      cofounderResponsibilities:[]
    }
  })

  return (
    <div className="md:col-span-7 p-5 col-span-12 shadow-md rounded-lg bg-white">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h3 className="font-bold text-lg text-darkBlue">User Profile</h3>
      <form>
        <textarea
          className="border rounded-md w-full p-3 mt-2"
          id="about"
          cols="30"
          value={tempUserDetails.about}
          placeholder="Introduce your self..."
        />
        <div className="grid gap-2 grid-cols-6">
          <select
            id="gender"
            className="border rounded-md p-1 h-10 col-span-3"
            value={tempUserDetails.gender}
          >
            <option value="" className="text-gray-400 ">
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">other</option>
          </select>

          <input
            className="border rounded-md h-10 pl-2 col-span-3"
            type="date"
            id="dateOfBirth"
            value={tempUserDetails.dateOfBirth}
          />

          <input
            className="border rounded-md col-span-2 p-2 "
            placeholder="Country"
            type="text"
            name="country"
            value={tempUserDetails?.location?.country}
          />
          <input
            className="border rounded-md col-span-2 p-2 "
            placeholder="State"
            type="text"
            name="state"
            value={tempUserDetails?.location?.state}
          />
          <input
            className="border rounded-md col-span-2 p-2"
            placeholder="City"
            type="text"
            name="city"
            value={tempUserDetails?.location?.city}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
