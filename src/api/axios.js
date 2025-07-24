import axios from 'axios';

// CRA uses REACT_APP_ prefix for env variables
const API = axios.create({
<<<<<<< HEAD
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
=======
  baseURL: process.env.REACT_APP_API_URL ||'http://localhost:5000/api/v1',
>>>>>>> 5a83d0b5e4171f1093f02934a81f800ca429f934
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
