import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authenticate } from "../features/authentication/authSlice";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { loginformValidate } from "../middlewares/validate";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginformValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let checking = toast.loading("Checking...");
      axios
        .post("/api/user/signin", { ...values })
        .then((res) => {
          toast.dismiss(checking);
          let { token, userId } = res.data;
          localStorage.setItem("token", JSON.stringify(token));
          dispatch(authenticate());
          navigate("/", { replace: "true" });
        })
        .catch((error) => {
          toast.dismiss();
          if (error.response?.status === 404) toast.error("Invalid email");
          else if (error.response?.status === 401)
            toast.error("Invalid password");
          else toast.error("Something went wrong, Try agian.");
        });
    },
  });

  return (
    <div className="flex justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="my-[3rem] py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
        <h2 className="text-darkBlue text-center text-3xl font-bold">
          Sign in
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="px-[3rem] pt-[1rem] flex flex-col my-[2rem]"
        >
          <label className="text-sm text-darkBlue mt-5" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...formik.getFieldProps("email")}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <label className="text-sm text-darkBlue mt-5" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            {...formik.getFieldProps("password")}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
          />
          <div>
            <button
              type="submit"
              className="border border-darkBlue px-6 py-2 mt-[2rem] text-darkBlue rounded font-bold hover:shadow-md"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="ml-[3rem]">
          <p className="text-xs mb-1 text-lightBlue">
            Don't have an account? <Link to={"/signup"}>Sign up.</Link>
          </p>
          <Link to={"/forgotPassword"} className="text-xs text-lightBlue">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};
