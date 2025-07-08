import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loaders/Loading";
import { Link } from "react-router-dom";
import { FiEdit3, FiPhoneCall, FiUpload } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { CustomButton, JobCard } from "../components";
import { Companies } from "../utils/types";
import CompanyForm from "../components/CompanyForm";
import { useSelector } from "../redux/store";
import { CompanyById } from "../apis/fetching.apis";
import { AxiosError } from "axios";

const CompanyProfile = () => {
  const params = useParams();
  
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState<Companies | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  
  const fetchCompany=async(signal: AbortSignal)=>{
      setIsLoading(true)
      let id : string | null=null;

      if(params.id && params.id !== undefined){
        id=params?.id;
      }else{
        id=user?.id || null; //comanyid from logined companyuser
      };

      try {
        const res=await CompanyById(id,signal);
        setInfo(res)
        setIsLoading(false)
        
      } catch (error) {
        if ((error as AxiosError).code === 'ERR_CANCELED') {
                  return;
        }
        console.log(error);
        setIsLoading(false)
      }
  };

  
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

     fetchCompany(signal);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    return ()=> {
      controller.abort();
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  };

  return (
    <div className='container mx-auto p-5'>
    <div className=''>
      <div className='w-full flex flex-col md:flex-row gap-3 justify-between'>
        <h2 className='text-gray-600 text-xl font-semibold'>
          Welcome, {info?.name}
        </h2>

        {user && user?.accountType  === undefined && info?.id === user?.id && (
            <div className='flex items-center justifu-center py-5 md:py-0 gap-4'>
              <CustomButton
                onClick={() => setOpenForm(true)}
                iconRight={<FiEdit3 />}
                containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
              />

              <Link to='/upload-job'>
                <CustomButton
                  title='Upload Job'
                  iconRight={<FiUpload />}
                  containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600`}
                />
              </Link>
            </div>
           )} 
      </div>

      <div className='w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text-sm'>
        <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
          <HiLocationMarker /> {info?.location ?? "No Location"}
        </p>
        <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
          <AiOutlineMail /> {info?.email ?? "No Email"}
        </p>
        <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
          <FiPhoneCall /> {info?.contact ?? "No Contact"}
        </p>

        <div className='flex flex-col items-center mt-10 md:mt-0'>
          <span className='text-xl'>{info?.jobPosts?.length}</span>
          <p className='text-blue-600 '>Job Post</p>
        </div>
      </div>
    </div>

    <div className='w-full mt-20 flex flex-col gap-2'>
    {info && info?.jobPosts?.length > 0 && (
     <p>
      Jobs Posted
    </p>
    )}

  {info && info?.jobPosts?.length > 0 ? (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
    {info.jobPosts.map((job, index) => {
      const data = {
        ...job,
        name: info?.name,
        email: info?.email,
        logo: info?.profileUrl
      };
      return <JobCard job={data} key={index} />;
    })}
  </div>
) : (
  <div className="w-full py-10 flex flex-col items-center justify-center text-center">
    <div className="text-gray-500 text-lg font-medium mb-2">
      No jobs posted yet
    </div>
    <p className="text-gray-400 max-w-md">
      There are currently no job listings available. Check back later or post a new job opportunity.
    </p>
  </div>
)}
    </div>
     
    
     <CompanyForm open={openForm} setOpen={setOpenForm} />
     
  </div>
  )
}

export default CompanyProfile



