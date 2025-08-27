import API from '../api/axios';

export const registerUser = (data) => API.post('/auth/register', data);
export const registerCompany = (data) => API.post('/auth/register-company', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');