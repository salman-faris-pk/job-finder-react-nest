import { CompanyUpdateData } from "../utils/types";
import { API } from "./axiosInstance"



export const EditCompany=async(Formdatas:FormData)=>{
  const response=await API.put('/companies/update-company',Formdatas,{
    headers:{
        'Content-Type': 'multipart/form-data',
    }
  });
  
   return response.data;
};


