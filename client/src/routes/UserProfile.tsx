import { useState } from "react";
import { AiOutlineMail,AiFillGithub } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import UserForm from "../components/UserForm";
import { useSelector } from "../redux/store";
import { BiLinkExternal } from "react-icons/bi";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  
  const [open, setOpen] = useState<boolean>(false);
  const userInfo = user;

  return (
    <div className='container mx-auto flex items-center justify-center py-10'>
      <div className='w-full md:w-2/3 2xl:w-2/4 bg-white shadow-lg p-10 pb-20 rounded-lg'>
        <div className='flex flex-col items-center justify-center mb-4'>
          <h1 className='text-4xl font-semibold text-slate-600'>
            {userInfo?.firstName + " " + userInfo?.lastName}
          </h1>

          <h5 className='text-blue-700 text-base font-bold'>
            {userInfo?.jobTitle || "Add Job Title"}
          </h5>

          <div className='w-full flex flex-wrap lg:flex-row justify-between mt-8 text-sm'>
            <p className='flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full'>
              <HiLocationMarker /> {userInfo?.location ?? "No Location"}
            </p>
            <p className='flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full'>
              <AiOutlineMail /> {userInfo?.email ?? "No Email"}
            </p>
            <p className='flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full'>
              <FiPhoneCall /> {userInfo?.contact ?? "No Contact"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 mt-4 mb-3">
      <a
      href={userInfo?.githubUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-blue-700 font-semibold"
    >
      <AiFillGithub /> GitHub
    </a>
    <a
      href={userInfo?.portfolioUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-blue-700 font-semibold"
    >
      <BiLinkExternal /> Portfolio
    </a>
  </div>

        <hr />

        <div className='w-full py-10'>
          <div className='w-full flex flex-col-reverse md:flex-row gap-8 py-6'>
            <div className='w-full md:w-2/3 flex flex-col gap-4 text-lg text-slate-600 mt-20 md:mt-0'>
              <p className='text-[#0536e7]  font-semibold text-2xl'>ABOUT</p>
              <span className='text-base text-justify leading-7'>
                {userInfo?.about ?? "No About Found"}
              </span>
            </div>

            <div className='w-full md:w-1/3 h-44'>
              <img
                src={userInfo?.profileUrl || '/profile.jpg'}
                alt={userInfo?.firstName || "profile"}
                className='w-full h-48 object-contain rounded-lg'
              />
              <button
                className='w-full md:w-64 bg-blue-600 text-white mt-4 py-2 rounded'
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserProfile;