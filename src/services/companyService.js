import API from '../api/axios';

export const fetchCompanies = () => API.get('/companies');
export const updateCompanyStatus = (id, status) => API.put(`/companies/${id}`, { status });