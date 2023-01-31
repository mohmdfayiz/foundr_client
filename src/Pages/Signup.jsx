import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { signupformValidation } from "../middlewares/validate";

export const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate: signupformValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      toast.loading("Let's verify your email.")
      axios({
        method:"GET",
        url: `http://localhost:8000/api/user/generateOtp?email=${values.email}`,
      }).then(()=>{
          axios({
            method:"POST",
            url:`http://localhost:8000/api/user/sendMail`,
            data:{...values}
          }).then(()=> {
            navigate('/emailVarification',{ state: { data: {...values} } })
          })
          .catch(()=>{ toast.error('Oops, something went wrong!') })
      }).catch((err)=>{
        if (err.response.status === 422) toast.error("Email already exist!");
        else toast.error("Something went wrong, Try agian.");
      })
    },
  });

  return (
    <div className="flex justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-3xl font-bold">
          Sign up
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="px-[3rem] pt-[1rem] flex flex-col mt-[2rem]"
        >
          <label className="text-sm text-darkBlue" htmlFor="userName">
            Full name
          </label>
          <input
            type="text"
            name="userName"
            {...formik.getFieldProps("userName")}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            Email
          </label>
          <input
            type="text"
            name="email"
            {...formik.getFieldProps("email")}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <label className="text-sm text-darkBlue mt-5" htmlFor="userName">
            Password
          </label>
          <input
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <div>
            <button
              type="submit"
              className="border border-darkBlue px-6 py-2 mt-4 text-darkBlue rounded font-bold hover:shadow-md"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="ml-[3rem]">
          <p className="text-xs mt-4 mb-1 text-lightBlue">
            Already have an account? <Link to={"/signin"}>Sign in.</Link>{" "}
          </p>
          <p className="text-xs text-lightBlue">Terms and conditions.</p>
        </div>
      </div>
    </div>
  );
};
