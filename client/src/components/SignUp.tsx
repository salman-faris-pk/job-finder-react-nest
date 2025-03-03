import { useState } from "react";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const SignUp = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = () => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
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

        <form className="w-full flex flex-col gap-5">
          <TextInput name="email" label="Email Address" placeholder="email@example.com" type="email" />

          {isRegister && (
            <div className="w-full flex gap-1 md:gap-2">
              <div className={`${accountType === "seeker" ? "w-1/2" : "w-full"}`}>
                <TextInput
                  name={accountType === "seeker" ? "firstName" : "name"}
                  label={accountType === "seeker" ? "First Name" : "Company Name"}
                  placeholder={accountType === "seeker" ? "eg. James" : "Company name"}
                  type="text"
                />
              </div>

              {accountType === "seeker" && (
                <div className="w-1/2">
                  <TextInput name="lastName" label="Last Name" placeholder="Wagonner" type="text" />
                </div>
              )}
            </div>
          )}

          <div className="w-full flex gap-1 md:gap-2">
            <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
              <TextInput name="password" label="Password" placeholder="Password" type="password" />
            </div>

            {isRegister && (
              <div className="w-1/2">
                <TextInput label="Confirm Password" placeholder="Password" type="password" />
              </div>
            )}
          </div>

          {errMsg && <span role="alert" className="text-sm text-red-500 mt-0.5">{errMsg}</span>}

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
