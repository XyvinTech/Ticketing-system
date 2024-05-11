import React, { useEffect } from "react";
import { ReactComponent as EnvelopeIcon } from "../assets/icons/EnvelopeIcon.svg";
import { ReactComponent as LockClosedIcon } from "../assets/icons/LockClosedIcon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { getLogin } from "../api/userapi";

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //  const{getLogin, user}=useAdminStore();
  //  useEffect(() => {
  //   fetchLogin();
  // }, []);
  const onSubmit = async (datas) => {
    try {
      const user = await getLogin(datas);
      localStorage.setItem("token", user.token);
      // localStorage.setItem("user", user.userType);
      if (user?.userType) {
        switch (user?.userType) {
          case "manager":
            navigate("/Manager/Ticket");
            break;
          case "projectLead":
            navigate("/ProjectLead/Ticket");
            break;
          case "client":
            navigate("/Client/Ticket");
            break;
          case "member":
            navigate("/Member/Ticket");
            break;
          case "admin":
            navigate("/Admin/Ticket");
            break;
          default:
            navigate("/");
            break;
        }
      }
      toast.success("Login successfully!");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login Error");
    }
  };

  return (
    <div className="flex flex-col justify-center px-5 my-20 mx-auto w-full max-w-[480px]">
      <div className="flex flex-col self-stretch pt-6 px-6 py-9 w-full text-sm leading-5 text-gray-700 bg-white rounded-md border border border-solid shadow">
        <header className="mb-6">
          <img src={Logo} alt="Logo" className="mx-auto mb-4" />
          <h2 className="text-center text-lg">Sign in to your account</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput
                  type="email"
                  label="Email"
                  placeholder="email@example.com"
                  Icon={EnvelopeIcon}
                  name="email"
                  {...field}
                />
              )}
              rules={{ required: "Email is required" }}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput
                  type="password"
                  label="Password"
                  placeholder="********"
                  Icon={LockClosedIcon}
                  name="password"
                  {...field}
                />
              )}
              rules={{ required: "Password is required" }}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <StyledButton type="submit" text="Login" className="mt-8 w-full" />
        </form>
        {/* <div className="mt-3  block text-center">or continue with</div> */}

        {/* <div className="mt-1">
          <p className="text-center text-gray-500">
            Don't have an account?
            <Link
              to={"/Register"}
              className="text-purple-600 hover:text-purple-800"
            >
              Sign up
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
