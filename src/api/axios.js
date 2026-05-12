import axios from 'axios';

// CRA uses REACT_APP_ prefix for env variables
<<<<<<< HEAD
=======




/* 
const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});
*/
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL ,
});
>>>>>>> fix-temp

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL ,
});
/* 

*/


/* 
const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});
*/
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
