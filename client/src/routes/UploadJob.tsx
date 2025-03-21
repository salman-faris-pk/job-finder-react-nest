import { startTransition, useEffect, useState } from "react";
import { CustomButton, JobCard} from "../components";
import TextInput from "../components/TextInput";
import JobTypes from "../components/JobTypes";
import { useForm } from "react-hook-form"
import { Job, JobFormInputs, JobSubmissionData } from "../utils/types";
import { uploadJobAPI } from "../apis/uploads.apis";
import { toast } from "sonner";
import Loading from "../components/Loaders/Loading";
import { useSelector } from "../redux/store";
import { RecentPosts } from "../apis/fetching.apis";

const UploadJob = () => {

  const {user}=useSelector((state)=> state.user)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormInputs>({
    mode: "onChange",
    defaultValues: {},
  });

  const [jobType, setJobType] = useState("Full-Time");
  const [isLoading, setIsLoading] = useState(false);
  const [recentPost, setRecentPost] = useState<Job[]>([]);

  
  const onSubmit = async (data: JobFormInputs) => {
    startTransition(() => {
      setIsLoading(true);
    });
  
    try {
      const payload: JobSubmissionData = {
        jobTitle: data.jobTitle,
        jobType: jobType,
        location: data.location,
        salary: Number(data.salary),
        vacancies: Number(data.vacancies),
        experience: Number(data.experience),
        desc: data.desc,
        requirements: data.requirements,
      };
  
      const res = await uploadJobAPI(payload);
  
     if(res.status !== "failed"){
        toast.success(res.message);
        startTransition(() => {
          reset();
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      startTransition(() => {
        setIsLoading(false);
      });
  
    } catch (error:any) {
      console.error("Error uploading job:", error);

      let errorMessage = "Failed to upload job";
     if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
      toast.error(errorMessage);
      
    }finally {
      startTransition(() => {
        setIsLoading(false);
      });
    }
  };


  const getRecendPosts=async()=>{
    try {
      const id=user?.id;
     const res=await RecentPosts(id)
     setRecentPost(res?.jobPosts)
    } catch (error:any) {
      console.log(error);
      toast.error(error.res?.message)
    }    
  };

  useEffect(()=>{
    getRecendPosts()
  },[])

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
      <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
        <div>
          <p className='text-gray-500 font-semibold text-2xl'>Job Post</p>

          <form
            className='w-full mt-2 flex flex-col gap-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='jobTitle'
              label='Job Title'
              placeholder='eg. Software Engineer'
              type='text'
              required={true}
              register={register("jobTitle", {
                required: "Job Title is required",
              })}
              error={errors.jobTitle ? errors.jobTitle?.message : ""}
            />

            <div className='w-full flex gap-4'>
              <div className={`w-1/2 mt-2`}>
                <label className='text-gray-600 text-sm mb-1'>Job Type</label>
                <JobTypes jobType={jobType} setJobType={setJobType} />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='salary'
                  label='Salary (USD)'
                  placeholder='eg. 1500'
                  type='number'
                  min={0}
                  register={register("salary", {
                    required: "Salary is required",
                  })}
                  error={errors.salary ? errors.salary?.message : ""}
                />
              </div>
            </div>

            <div className='w-full flex gap-4'>
              <div className='w-1/2'>
                <TextInput
                  name='vacancies'
                  label='No. of Vacancies'
                  placeholder='vacancies'
                  type='number'
                  register={register("vacancies", {
                    required: "Vacancies is required!",
                  })}
                  error={errors.vacancies ? errors.vacancies?.message : ""}
                />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='experience'
                  label='Years of Experience'
                  placeholder='experience'
                  type='number'
                  register={register("experience", {
                    required: "Experience is required",
                  })}
                  error={errors.experience ? errors.experience?.message : ""}
                />
              </div>
            </div>

            <TextInput
              name='location'
              label='Job Location'
              placeholder='eg. New York'
              type='text'
              register={register("location", {
                required: "Job Location is required",
              })}
              error={errors.location ? errors.location?.message : ""}
            />
            <div className='flex flex-col'>
              <label className='text-gray-600 text-sm mb-1'>
                Job Description
              </label>
              <textarea
                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                {...register("desc", {
                  required: "Job Description is required!",
                })}
                aria-invalid={errors.desc ? "true" : "false"}
              ></textarea>
                {errors.desc && (
                <span role='alert' className='text-xs text-red-500 mt-0.5'>
                  {errors.desc?.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 text-sm mb-1'>
                Core Responsibilities
              </label>
              <textarea
                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                {...register("requirements")}
              ></textarea>
            </div>
            
          
            <div className='mt-2'>
              {isLoading ? (
                <Loading/>
              ):(
                <CustomButton
                type='submit'
                containerStyles='inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                title='Sumbit'
              />
              )}
            </div>
          </form>
        </div>
      </div>


        {/**right section */}

      <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
        <p className='text-gray-500 font-semibold'>Recent Job Post</p>
        <div className='w-full flex flex-wrap gap-6'>
          {recentPost.slice(0, 4).map((job, index) => {
           const data= {
            ...job,
            name: user?.name,
            logo: user?.profileUrl,
           }
            return <JobCard job={data} key={index} />;
          })}
        </div>
      </div>

    </div>
  );
};

export default UploadJob;
