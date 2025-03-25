
import { applydataitems, JobSubmissionData } from "../utils/types";
import { API } from "./axiosInstance"



export const EditCompany=async(Formdatas:FormData)=>{
  const response=await API.put('/companies/update-company',Formdatas,{
    headers:{
        'Content-Type': 'multipart/form-data',
    }
  });
  
   return response.data;
};


export const uploadJobAPI=async(payload:JobSubmissionData)=>{
   
  const res=await API.post("/jobs/upload-job",payload,{
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;

};


export const UpdateUserDatas=async(formData: FormData)=>{

  const response=await API.put('/user/update-user',formData,{
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });

   return response.data
}


export const JobApply = async(applydata:applydataitems)=>{
  const formData = new FormData();
  formData.append('userId', applydata.userId);
  formData.append('JobId', applydata.JobId);
  formData.append('CvUrl', applydata.CvUrl);
  if (applydata.whyHire) {
    formData.append('whyHire', applydata.whyHire);
  }

  const response = await API.post('/jobs/job-apply', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};