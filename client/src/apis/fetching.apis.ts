import { API } from "./axiosInstance"
import { UpdateURLParams } from "../utils/types";
import { Axios } from "./auth-api";




export const CompanyById=async(id: string | null,signal: AbortSignal)=>{
   const response=await Axios.get(`/companies/${id}`,{signal})
   
   return response.data.data;
};


export const RecentPosts=async(id:string | null) => {
   const response=await Axios.get(`/companies/${id}`)
   return response.data.data;
};



export const updateURL=({pageNum,query,cmpLoc,sort,navigate,location,jType,exp}:UpdateURLParams)=>{

   if (!location) return; 
    
   const params= new URLSearchParams();

   if(pageNum && pageNum > 1){
      params.set('page',pageNum.toString())
   };
   
   if(query){
      params.set('search', query)
   };

   if(cmpLoc){
      params.set('location', cmpLoc)
   };

   if(sort){
      params.set('sort', sort)
   };

   if(jType){
      const jTypeValue = Array.isArray(jType) ? jType.join(',') : jType;
      params.set('jtype', jTypeValue);
   };

   if(exp){
      const expValue = Array.isArray(exp) ? exp.join(',') : exp.toString();
      params.set('exp', expValue);
   }

   const newURL= `${location.pathname}?${params.toString()}`;

   if (navigate) {
      navigate(newURL, { replace: true });
    }

   return newURL;
};


export const GetCompanies=async(newURL:string,signal: AbortSignal)=>{
   const response=await Axios.get(newURL,{signal});
   return response.data;

};



export const JobDetailById=async(id:string, signal: AbortSignal)=>{
    
   const response=await Axios.get(`/jobs/job-detail/${id}`,{signal});

   return response.data;

};


export const deletePost=async(id: string)=> {

   const response=await API.delete(`/jobs/delete-job/${id}`);
   return response.data;
};


export const FindsJobs=async(newURL:string,signal: AbortSignal)=>{

   const response=await Axios.get("/jobs"+newURL, { signal });
   return response.data;
};

export const fetchMyApplications = async() => {
    const response=await API.get("/user/my-applications");

    return response.data;
};

export const WithDrawApplication =async(id:string,)=>{
   const response = await API.delete(`/user/application/${id}`);

   return response.data;
};

export const JobApplicants=async(id:string)=>{
   const response=await API.get(`/jobs/job-applicants/${id}`);

   return response.data;
};

export const updateApplicationStatus = async (data: {
   jobId: string;
   userId: string;
   newStatus: string;
 }) => {
   const res = await API.put('/jobs/update-status', data);
   return res.data;
 };
 
 export const deleteJobApplication = async (data: {jobId: string;userId: string;}) => {
   
   const res = await API.delete('/jobs/remove-userApplicant', { data });
   return res.data;
 };

 export const userById= async(id:string,signal:AbortSignal)=>{
   const res=await API.get(`/user/userBy/${id}`,{signal})
   return res.data;
 }