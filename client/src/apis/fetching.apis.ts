import { API } from "./axiosInstance"




export const CompanyById=async(id: string | null)=>{
   const response=await API.get(`/companies/${id}`)
   
   return response.data.data;
};


export const RecentPosts=async(id:string | null) => {
    
   const response=await API.get(`/companies/${id}`)
   return response.data.data;
};