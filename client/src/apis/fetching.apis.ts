import { replace } from "react-router-dom";
import { API } from "./axiosInstance"
import { UpdateURLParams } from "../utils/types";




export const CompanyById=async(id: string | null)=>{
   const response=await API.get(`/companies/${id}`)
   
   return response.data.data;
};


export const RecentPosts=async(id:string | null) => {
    
   const response=await API.get(`/companies/${id}`)
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
      params.set('jtype', jType)
   };

   if(exp){
      params.set('exp', exp.toString())
   }

   const newURL= `${location.pathname}?${params.toString()}`;

   if (navigate) {
      navigate(newURL, { replace: true });
    }

   return newURL;
};


export const GetCompanies=async(newURL:string)=>{
   const response=await API.get(newURL);
   return response.data;

}