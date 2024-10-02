import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({  
    baseURL: 'http://localhost:8000',
    timeout: 9000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

export default instance;