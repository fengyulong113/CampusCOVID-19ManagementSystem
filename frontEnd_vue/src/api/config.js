import axios from 'axios';

export const baseURL = 'http://127.0.0.1:3000';

const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    return Promise.reject(err) //错误抛到业务代码
  }
);

export { axiosInstance } 