import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "./api";

interface ApiProps {
  method: "get" | "post" | "put" | "delete" | "patch"; 
  url: string;
  bodyData?: object; 
  headers?: object;
  params?: object;
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL

});

export const apiConnector = async ({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiProps): Promise<AxiosResponse> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data: bodyData || undefined,
      headers: headers || undefined,
      params: params || undefined,
    };


    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error; 
  }
};
