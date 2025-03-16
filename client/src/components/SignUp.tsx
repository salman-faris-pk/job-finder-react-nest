import { useState, useEffect } from "react";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, companySchema, loginSchema } from "../utils/zodvalidation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { apiRequest } from "../apis/auth-api";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { AuthFormData,CompanyErrors,CompanyFormData,Errors, LoginFormData, UserErrors, UserFormData } from "../utils/types";

const SignUp = () => {
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showCoPassword, setShowCoPassword] = useState(false);

  // let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(
      isRegister
        ? accountType === "seeker"
          ? userSchema
          : companySchema
        : loginSchema
    ),
    mode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [accountType, isRegister, reset]);

  const onSubmit = async (data:AuthFormData) => {

    let formData: Omit<AuthFormData, "cPassword">;

    if (isRegister) {
      const { cPassword, ...otherDatas } = data as UserFormData | CompanyFormData;
      formData = otherDatas;
    } else {  
      formData = data as LoginFormData;
    };

    let URL: string | null = null;

    if (isRegister) {
      URL = accountType === "seeker" ? "auth/register" : "auth/company-register";
    } else {
      URL = accountType === "seeker" ? "auth/login" : "auth/company-login";
    }

    try {
      const res = await apiRequest({
        url: URL,
        data: formData,
      });


      if (res.status === "failed" && res.message) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        // reset();
        // window.location.replace(from);
      }
    } catch (error) {
      console.error("API Error:", error); 
    }
  };

  const currentErrors = errors as Errors;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white m-2 p-6 text-left align-middle shadow-md">
        <h3 className="text-xl font-semibold text-gray-900">
          {isRegister ? "Create Account" : "Account Sign In"}
        </h3>

        <div className="w-full flex items-center justify-center py-4">
          <button
            className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
              accountType === "seeker"
                ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                : "bg-white border border-blue-400"
            }`}
            onClick={() => setAccountType("seeker")}
          >
            User Account
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
              accountType !== "seeker"
                ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                : "bg-white border border-blue-400"
            }`}
            onClick={() => setAccountType("company")}
          >
            Company Account
          </button>
        </div>

        {accountType === "seeker" && (
          <div className="w-full flex items-center justify-center py-2 mb-5">
            <button className="flex items-center justify-center w-full gap-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100">
              <FcGoogle />
              {isRegister ? "Sign up with Google" : "Sign in with Google"}
            </button>
          </div>
        )}

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="email"
            label="Email Address"
            placeholder="email@example.com"
            type="email"
            register={register("email")}
            error={currentErrors.email?.message}
          />

          {isRegister && (
            <div className="w-full flex gap-1 md:gap-2">
              <div className={`${accountType === "seeker" ? "w-1/2" : "w-full"}`}>
                <TextInput
                  name={accountType === "seeker" ? "firstName" : "name"}
                  label={accountType === "seeker" ? "First Name" : "Company Name"}
                  placeholder={accountType === "seeker" ? "eg. James" : "Company name"}
                  type="text"
                  register={register(accountType === "seeker" ? "firstName" : "name")}
                  error={
                    accountType === "seeker"
                      ? (currentErrors as UserErrors).firstName?.message
                      : (currentErrors as CompanyErrors).name?.message
                  }
                />
              </div>

              {accountType === "seeker" && (
                <div className="w-1/2">
                  <TextInput
                    name="lastName"
                    label="Last Name"
                    placeholder="Wagonner"
                    type="text"
                    register={register("lastName")}
                    error={(currentErrors as UserErrors).lastName?.message}
                  />
                </div>
              )}
            </div>
          )}

          <div className="w-full flex gap-1 md:gap-2 relative">
            <div className={`${isRegister ? "w-1/2" : "w-full"} relative`}>
              <TextInput
                name="password"
                label="Password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                register={register("password")}
                error={currentErrors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>

            {isRegister && (
              <div className="w-1/2 relative">
                <TextInput
                  name="cPassword"
                  label="Confirm Password"
                  placeholder="Password"
                  type={showCoPassword ? "text" : "password"}
                  register={register("cPassword")}
                  error={(currentErrors as UserErrors | CompanyErrors).cPassword?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowCoPassword(!showCoPassword)}
                  className="absolute right-3 top-10 text-gray-500"
                >
                  {showCoPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            )}
          </div>


          <div className="mt-2">
            <CustomButton
              type="submit"
              containerStyles="inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800"
              title={isRegister ? "Create Account" : "Login Account"}
            />
          </div>
        </form>

        <div className="mt-4">
          <p className="text-sm text-gray-700">
            {isRegister ? "Already have an account?" : "Do not have an account?"}
            <span
              className="text-sm text-blue-600 ml-2 hover:text-blue-700 hover:font-semibold cursor-pointer"
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? "Login" : "Create Account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;