import axios, { AxiosError,AxiosResponse, InternalAxiosRequestConfig} from "axios"

const API_URL=import.meta.env.VITE_API_MAIN_URL || import.meta.env.VITE_API_URL;

export const API= axios.create({
    baseURL: API_URL,
    withCredentials:true,
}); 


let isRefreshing = false;
let refreshSubscribers: (() => void)[] = []; // Store requests while refreshing

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true; 

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => resolve(API(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true }); 
        onTokenRefreshed();
        return API(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);