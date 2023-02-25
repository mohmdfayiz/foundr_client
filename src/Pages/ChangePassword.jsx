import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Password does not match!");
      } else if (values.password.length < 6) {
        toast.error("Password should contain atleast 6 characters!");
      } else {
        try {
          const { status } = await axios.post("/api/user/changePassword", {
            email,
            newPassword: values.password,
          });
          if (status === 200) {
            toast.success("Password changed sucessfully.");
            navigate("/signin");
          }
        } catch (error) {
          toast.error('Something went wrong!')
        }
      }
    },
  });

  return (
    <div className="flex justify-center">
      <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-2xl font-bold">
          Change Password
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="px-[3rem] flex flex-col my-[1rem]"
        >
          <label
            id="newPassword"
            className="text-sm text-darkBlue mt-5"
            htmlFor="userName"
          >
            New password
          </label>
          <input
            type="text"
            name="newPassword"
            id="newPassword"
            {...formik.getFieldProps("password")}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <label
            id="cofirmPassword"
            className="text-sm text-darkBlue mt-5"
            htmlFor="userName"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="otp"
            id="cofirmPassword"
            {...formik.getFieldProps("confirmPassword")}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <button
            type="submit"
            className="border border-darkBlue py-2  mt-5 text-darkBlue rounded font-bold hover:shadow-md"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
