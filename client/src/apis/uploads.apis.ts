import { AxiosError } from "axios";
import { API } from "./axiosInstance"



export const EditCompany=async(Formdatas:FormData)=>{
  const response=await API.put('/companies/update-company',Formdatas,{
    headers:{
        'Content-Type': 'multipart/form-data',
    }
  });
  
   return response.data;
};


// export const uploadJobAPI=async(formData:FormData)=>{
   
//   const res=await API.post("/jobs/upload-job",formData,{
//     headers:{
//       'Content-Type': 'multipart/form-data',
//   }
//   });
  
//   return res.data;

// }

export const uploadJobAPI = async (formData: FormData) => {
  try {
    const res = await API.post("/jobs/upload-job", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("API Error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Generic Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    throw error; // Re-throw the error to handle it in the calling function
  }
};