import { useState } from "react";
import { CustomButton, JobCard} from "../components";
import { jobs } from "../utils/datas";
import TextInput from "../components/TextInput";
import JobTypes from "../components/JobTypes";
import { useForm } from "react-hook-form"
import { JobFormInputs } from "../utils/types";
import { uploadJobAPI } from "../apis/uploads.apis";

const UploadJob = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormInputs>({
    mode: "onChange",
    defaultValues: {},
  });

  const [errMsg, setErrMsg] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data:JobFormInputs) => {
    setIsLoading(true)

    try {
      const formData = new FormData();
  
      formData.append("jobTitle", data.jobTitle);
      formData.append("salary", String(data.salary));
      formData.append("vacancies", String(data.vacancies));
      formData.append("experience", String(data.experience));
      formData.append("location", data.location);
      formData.append("desc", data.desc);
      if (data.requirements) {
        formData.append("requirements", data.requirements);
      }
      if (jobType) {
        formData.append("jobType", jobType);
      }
  
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const res = await uploadJobAPI(formData);
  
      console.log("API Response:", res);
  
      if (res.success) {

      } else {
        setErrMsg(res.message || "An error occurred while uploading the job.");
      }
    } catch (error) {
      console.error("Error uploading job:", error);
      setErrMsg("An error occurred while uploading the job.");
    } finally {
      setIsLoading(false);
    }
    

  };

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

            {errMsg && (
              <span role='alert' className='text-sm text-red-500 mt-0.5'>
                {errMsg}
              </span>
            )}
            <div className='mt-2'>
              <CustomButton
                type='submit'
                containerStyles='inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                title='Sumbit'
              />
            </div>
          </form>
        </div>
      </div>


        {/**right section */}

      <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
        <p className='text-gray-500 font-semibold'>Recent Job Post</p>
        <div className='w-full flex flex-wrap gap-6'>
          {jobs.slice(0, 4).map((job, index) => {
            return <JobCard job={job} key={index} />;
          })}
        </div>
      </div>

    </div>
  );
};

export default UploadJob;
