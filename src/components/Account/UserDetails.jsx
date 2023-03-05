import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { userProfileValidation } from "../../middlewares/validate";

const PersonalInfo = (props) => {
  // const [changed, setChanged] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [tempUserDetails, setTempUserDetails] = useState({});

  useEffect(() => {
    if (props) {
      setUserDetails(props);
      setTempUserDetails(props);
    }
  }, [props]);

  const resetData = () => {
    setTempUserDetails(userDetails);
  };

  const updateUserProfile = async (profileDetails) => {
    try {
      const token = localStorage.getItem("token");
      const { status } = await axios.post(
        "/api/user/updateUserProfile",
        profileDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (status === 201) {
        toast.success("User profile updated successfully");
      }
    } catch (error) {
      toast.error("Sorry, something went wrong!");
    }
  };

  const formik = useFormik({
    initialValues: {
      intro: tempUserDetails?.intro || "",
      gender: tempUserDetails?.gender || "",
      age: tempUserDetails?.age || "",
      country: tempUserDetails?.location?.country || "",
      state: tempUserDetails?.location?.state || "",
      city: tempUserDetails?.location?.city || "",
    },
    validate: userProfileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateUserProfile(values);
    },
  });

  return (
    <div className="md:col-span-7 p-5 col-span-12 shadow-md rounded-lg bg-white">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h3 className="font-bold text-lg text-darkBlue">User Profile</h3>
      <form onSubmit={formik.handleSubmit}>
        <textarea
          className="border rounded-md w-full p-3 mt-2"
          id="intro"
          cols="30"
          placeholder="About your self..."
          {...formik.getFieldProps("intro")}
        />
        <div className="grid gap-2 grid-cols-6">
          <select
            id="gender"
            className="border rounded-md p-1 h-10 col-span-3"
            {...formik.getFieldProps("gender")}
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
            type="number"
            id="age"
            placeholder="Age"
            {...formik.getFieldProps("age")}
          />

          <input
            className="border rounded-md col-span-2 p-2 "
            placeholder="Country"
            type="text"
            name="country"
            {...formik.getFieldProps("country")}
          />
          <input
            className="border rounded-md col-span-2 p-2 "
            placeholder="State"
            type="text"
            name="state"
            {...formik.getFieldProps("state")}
          />
          <input
            className="border rounded-md col-span-2 p-2"
            placeholder="City"
            type="text"
            name="city"
            {...formik.getFieldProps("city")}
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="border py-1 px-3 rounded-md  border-darkBlue text-darkBlue font-bold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
