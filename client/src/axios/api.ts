import axios, { AxiosInstance } from 'axios';

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the Axios instance
export default api;
