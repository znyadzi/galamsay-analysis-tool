import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://my.api.mockaroo.com/analysis-results",
});

export default axiosInstance;