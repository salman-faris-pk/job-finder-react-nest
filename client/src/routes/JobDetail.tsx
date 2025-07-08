import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { CompanyAplicants, CustomButton, CvUpload, DeleteModal, JobCard } from "../components";
import { useSelector } from "../redux/store";
import { deletePost, JobDetailById } from "../apis/fetching.apis";
import { Job } from "../utils/types";
import Loading from "../components/Loaders/Loading";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { formatSalary } from "../utils/formatSalary";
import { Link } from "react-router-dom";


const JobDetail = () => {
 
  const { id } = useParams<{ id: string }>();
  const location=useLocation();
  const { user }=useSelector((state)=> state.user)
  const [job, setJob] = useState<Job | null>(null);
  const [selected, setSelected] = useState("0");
  const [isFetching,setIsFetching]=useState(false);
  const [smilarJobs,setSimilarJobs]=useState<Job[]>([])
  const [isdletesModal, setIsdeleteModal] = useState(false);
  const [openApplyModal, setApplyModal] = useState(false);
  const [applicationCount,setAppCount]=useState<number | null>(null)
  
  const getjoBDetail =async(signal: AbortSignal)=>{
     setIsFetching(true)
     if (!id) {
      setIsFetching(false);
      return;
    };

     try {
        const res=await JobDetailById(id,signal);
           
        setJob(res?.data)  

        const filteredSimilarJobs = res?.similarJobs?.filter((similarJob: Job) => similarJob.id !== id);
        setSimilarJobs(filteredSimilarJobs);

        setAppCount(res?.applicationCount)
        setIsFetching(false)
     } catch (error) {
       if ((error as AxiosError).code === 'ERR_CANCELED') {
            return;
        }
     }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

     id && getjoBDetail(signal);
     window.scrollTo({ top: 0, left: 0, behavior: "instant" });

     return () => {
      controller.abort();
    };
  }, [id]);


  const handleDeletePost=async()=>{
    setIsFetching(true)
    if(!job?.id){
      setIsFetching(false)
      return;
    };

    try {
      const res=await deletePost(job?.id);
      if(res?.success){
        toast.success(res?.message)
        setTimeout(()=>{
        window.location.replace("/")
        },1000)
      }else{
        toast.error(res?.message)
      }
      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      console.log(error);
    }
  };

  return (
    <div className='container mx-auto'>
      <div className='w-full flex flex-col md:flex-row gap-10 mt-5'>

        {/* LEFT SIDE */}
        {isFetching ? (
        <Loading />
         ) : (
        <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
          <div className='w-full flex items-center justify-between'>
            <div className='w-3/4 flex gap-2'>
              <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className='w-20 h-20 md:w-24 md:h-20 rounded'
              />

              <div className='flex flex-col'>
                <p className='text-xl font-semibold text-gray-600'>
                  {job?.jobTitle}
                </p>

                <span className='text-base'>{job?.location}</span>

                <span className='text-base text-blue-600'>
                  {job?.company?.name}
                </span>

                <span className='text-gray-500 text-sm'>
                  {moment(job?.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className=''>
              <AiOutlineSafetyCertificate className='text-3xl text-blue-500' />
            </div>
          </div>

          <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
            <div className='bg-[#bdf4c8] w-44 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Salary</span>
              <p className={`${job?.salary && Number(job.salary) <= 50000 ? "text-md font-bold" : "text-lg font-semibold"} text-gray-700`}>
                 {formatSalary(job?.salary)}
               </p>
            </div>

            <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Job Type</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.jobType}
              </p>
            </div>

            <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>No. of Applicants</span>
              <p className='text-lg font-semibold text-gray-700'>
                {applicationCount || 0}
              </p>
            </div>

            <div className='bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>No. of Vacancies</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.vacancies}
              </p>
            </div>
          </div>

          <div className='w-full flex gap-4 py-5'>
            <CustomButton
              onClick={() => setSelected("0")}
              title='Job Description'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                selected === "0"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />

            <CustomButton
              onClick={() => setSelected("1")}
              title='Company'
              containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                selected === "1"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />
          </div>

          <div className='my-6'>
            {selected === "0" ? (
              <>
                <p className='text-xl font-semibold'>Job Decsription</p>
                <p className="text-sm font-mono text-gray-500 mb-2">
                {job?.experience} {job?.experience === 1 ? "year" : "years"} experience
                </p>

                <span className='text-base'>{job?.detail[0]?.desc}</span>

                {job?.detail[0]?.requirements && (
                  <>
                    <p className='text-xl font-semibold mt-8'>Requirement</p>
                    <span className='text-base'>
                      {job?.detail[0]?.requirements}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='mb-6 flex flex-col'>
                  <p className='text-xl text-blue-600 font-semibold'>
                    {job?.company?.name}
                  </p>
                  <span className='text-base'>{job?.company?.location}</span>
                  <span className='text-sm'>{job?.company?.email}</span>
                </div>

                <p className='text-xl font-semibold'>About Company</p>
                <span>{job?.company?.about}</span>
              </>
            )}
          </div>


   <div className="w-full">
   {user && user?.id === job?.companyId ? (
    <>
      <CustomButton
        title="Delete Job"
        onClick={() => setIsdeleteModal(true)}
        containerStyles={`w-full cursor-pointer flex items-center justify-center text-white 
          bg-gradient-to-r from-red-600 to-red-800 hover:from-red-600 hover:to-red-800 py-3 px-5 outline-none rounded-full text-base`}
      />

      {isdletesModal && (
        <DeleteModal 
          isOpen={isdletesModal}  
          onClose={() => setIsdeleteModal(false)} 
          onDelete={() => {
            handleDeletePost();
            setIsdeleteModal(false);
          }}
        />
      )}
    </>
  ) : user && user?.accountType === "seeker" ? (
    <>
      <CustomButton
        title="Apply Now"
        onClick={() => setApplyModal(true)}
        containerStyles={`cursor-pointer w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
      />

      {openApplyModal && (
        <CvUpload
          isOpen={openApplyModal}
          onClose={() => setApplyModal(false)}
          JobId={job?.id}
          userId={user?.id}
        />
      )}
    </>
  ) : !user ? (
    <Link to={'/user-auth'} state={{ from: location.pathname }}
    className="cursor-pointer w-full flex items-center justify-center text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
    >
          SignIn
    </Link>
  
  ) : null}
</div>

        </div>
         )}

         
        {/* RIGHT SIDE */}
   <div className='w-full md:w-1/3 2xl:w-2/4 p-1 shadow-md'>
    {user && user?.id === job?.companyId ? (
        <CompanyAplicants jobId={job?.id}/>
  ) : (
    <>
      <p className='text-gray-500 font-semibold'>Similar Job Posts</p>
      <div className="w-full flex flex-wrap gap-4">
        {smilarJobs?.length > 0 ? (
          smilarJobs.slice(0, 6).map((job, index) => (
            <JobCard 
              job={{
                ...job,
                name: job?.company.name,
                logo: job?.company.profileUrl
              }} 
              key={index} 
            />
          ))
        ) : (
          <p className="w-full text-center mt-10 text-gray-500 text-sm">
            No similar jobs available
          </p>
        )}
      </div>
    </>
  )}
</div>


      </div>
    </div>
  );
};

export default JobDetail;

