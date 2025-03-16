import { API } from "./axiosInstance"
import { AxiosError } from 'axios';


interface ApiRequestProps {
    url: string;
    data?: any;
};

interface ApiResponse {
    status: string | boolean;
    message?: string;
    [key: string]: any;
}

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


