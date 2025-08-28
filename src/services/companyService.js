import API from '../api/axios';

export const fetchCompanies = () => API.get('/companies');
// Align payload name with backend: { companyStatus: 'approved' | 'rejected' | 'pending' }
export const updateCompanyStatus = (id, companyStatus) =>API.put(`/companies/${id}`, { companyStatus });

export const fetchCompanyJobs = (companyId) =>
API.get(`/companies/${companyId}/jobs`);

export const canCompanyPost = (companyId) =>
API.get(`/companies/${companyId}/can-post`);