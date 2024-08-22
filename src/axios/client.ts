import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  // AxiosRequestConfig,
} from "axios";

// interface XAxiosInstance extends AxiosInstance {
//   request<T = any, R = AxiosResponse<T>>(
//     config: AxiosRequestConfig
//   ): Promise<R>;
// }
const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: getAuthToken(),
  },
});

// const axiosUploadClient: AxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_SERVER,
//   timeout: 15000,
// });

// function getAuthToken(): string | null {
//   let user: string | null = null;
//   if (typeof window !== "undefined") {
//     // Access localStorage here
//     user = window.localStorage.getItem("user");
//   }
//   return user ? `Bearer ${user}` : null;
// }

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // toast.error(error.message);
    return Promise.reject(error);
  }
);
// axiosUploadClient
export { axiosClient };
