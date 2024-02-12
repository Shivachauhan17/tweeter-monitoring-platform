import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({  
    baseURL: 'https://tweeter-monitoring-backend.onrender.com',
    timeout: 9000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

export default instance;