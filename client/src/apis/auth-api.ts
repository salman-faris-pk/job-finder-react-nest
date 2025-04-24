import axios, { AxiosError } from 'axios';
import { API } from './axiosInstance';


interface ApiRequestProps {
    url: string;
    data?: any;
};

interface ApiResponse {
    status: string | boolean;
    message?: string;
    [key: string]: any;
}

const API_URL=import.meta.env.VITE_API_URL;

export const Axios= axios.create({
    baseURL: API_URL,
}); 


export const apiRequest= async({url,data}:ApiRequestProps): Promise<ApiResponse> => {

    try {
        const result = await API.post(url, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        
        return result.data;
        
    } catch (error: unknown) {
        const err = error instanceof AxiosError && error.response?.data;
        return err
            ? { status: err.success, message: err.message }
            : { status: false, message: 'Something went wrong' };
    }

};


