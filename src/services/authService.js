import API from '../api/axios';

// User
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Company
export const registerCompany = (data) => API.post('/company/register', data);
export const loginCompany = (data) => API.post('/company/login', data);