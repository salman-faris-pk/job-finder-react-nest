import { useEffect, useState } from "react";
import { AiOutlineMail, AiFillGithub, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import UserForm from "../components/UserForm";
import { BiLinkExternal } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { userById } from "../apis/fetching.apis";
import { AxiosError } from "axios";
import { API } from "../apis/axiosInstance";
import ProfileLoader from "../components/Loaders/Profile";
import Loading from "../components/Loaders/Loading";

interface UserData {
  id?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  location?: string;
  email?: string;
  contact?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  about?: string;
  profileUrl?: string;
}

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData>({});
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCurrentUserLoading, setIsCurrentUserLoading] = useState<boolean>(true);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const isCurrentUserProfile = !id || id === currentUser?.id;

  useEffect(() => {
    if (imageModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [imageModalOpen]);

  const fetchCurrentUser = async (signal: AbortSignal) => {
    try {
      setIsCurrentUserLoading(true);
      const response = await API.get("/user/validate-me", { signal });
      setCurrentUser(response.data.user);
    } catch (error) {
      if ((error as AxiosError).code === 'ERR_CANCELED') {
        return;
      }
      console.error("Failed to fetch current user:", error);
      setCurrentUser(null);
    } finally {
      setIsCurrentUserLoading(false);
    }
  };

  const fetchUserById = async (signal: AbortSignal) => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const res = await userById(id, signal);
      if (res.success) {
        setUserData(res.user);
      }
    } catch (error) {
      if ((error as AxiosError).code === 'ERR_CANCELED') {
        return;
      }
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchCurrentUser(signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (isCurrentUserProfile) {
      setUserData(currentUser || {});
      setIsLoading(false);
    } else if (id) {
      fetchUserById(signal);
    }

    return () => {
      controller.abort();
    };
  }, [id, currentUser, isCurrentUserProfile]);

 
   if (isCurrentUserLoading || (id && isLoading)) {
    return <Loading />;
  }

  if ((!id && !currentUser) || (id && !userData)) {
    return <ProfileLoader />;
  }
 


  return (
    <div className="container mx-auto py-10 px-4 relative">
      {isCurrentUserProfile && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
            aria-label="Edit profile"
          >
            <AiOutlineEdit size={24} />
          </button>
        </div>
      )}

      <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <div className="md:mr-8 mb-6 md:mb-0 relative">
              <div 
                className="cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setImageModalOpen(true)}
              >
                <img
                  src={userData?.profileUrl || '/profile.jpg'}
                  alt={userData?.firstName || "profile"}
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-300 shadow-md"
                />
              </div>
            </div>
            <div className="flex-1 md:text-left">
              <h1 className="text-3xl font-bold tracking-tight">
                {userData?.firstName + " " + userData?.lastName}
              </h1>
              <h2 className="text-xl font-medium text-blue-200 mt-1">
                {userData?.jobTitle || "Professional Title"}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-4 text-sm">
                {userData?.location && (
                  <div className="flex items-center">
                    <HiLocationMarker className="mr-2 text-blue-300" />
                    <span>{userData.location}</span>
                  </div>
                )}
                {userData?.email && (
                  <div className="flex items-center">
                    <AiOutlineMail className="mr-2 text-blue-300" />
                    <span>{userData.email}</span>
                  </div>
                )}
                {userData?.contact && (
                  <div className="flex items-center">
                    <FiPhoneCall className="mr-2 text-blue-300" />
                    <span>{userData.contact}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-blue-700 mr-3"></div>
              <h3 className="text-xl font-bold text-gray-800">PROFESSIONAL PROFILE</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-4 border-l-2 border-gray-200">
              {userData?.about || "No professional summary provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-blue-700 mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800">CONTACT INFORMATION</h3>
              </div>
              <div className="space-y-3 pl-4">
                {userData?.email && (
                  <div className="flex items-start">
                    <AiOutlineMail className="mt-1 mr-3 text-blue-700" />
                    <span>{userData.email}</span>
                  </div>
                )}
                {userData?.contact && (
                  <div className="flex items-start">
                    <FiPhoneCall className="mt-1 mr-3 text-blue-700" />
                    <span>{userData.contact}</span>
                  </div>
                )}
                {userData?.location && (
                  <div className="flex items-start">
                    <HiLocationMarker className="mt-1 mr-3 text-blue-700" />
                    <span>{userData.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-blue-700 mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800">ONLINE PRESENCE</h3>
              </div>
              <div className="space-y-3 pl-4">
                {userData?.githubUrl && (
                  <div className="flex items-center">
                    <AiFillGithub className="mr-3 text-blue-700" />
                    <a 
                      href={userData.githubUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub Profile
                    </a>
                  </div>
                )}
                {userData?.portfolioUrl && (
                  <div className="flex items-center">
                    <BiLinkExternal className="mr-3 text-blue-700" />
                    <a 
                      href={userData.portfolioUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Professional Portfolio
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isCurrentUserProfile && (
            <div className="hidden md:flex justify-end mt-10">
              <button
                onClick={() => setOpen(true)}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md shadow-md transition-all duration-200 transform hover:scale-105"
              >
                Edit Professional Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {isCurrentUserProfile && (
        <UserForm open={open} setOpen={setOpen} />
      )}

      {imageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none z-50 p-2"
              aria-label="Close image modal"
            >
              <AiOutlineClose size={32} />
            </button>
            <div className="overflow-auto">
              <img
                src={userData?.profileUrl || '/profile.jpg'}
                alt={userData?.firstName || "profile"}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;