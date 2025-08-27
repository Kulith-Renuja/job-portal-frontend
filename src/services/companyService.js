import API from '../api/axios';

export const fetchCompanies = () => API.get('/companies');
// Align payload name with backend: { companyStatus: 'approved' | 'rejected' | 'pending' }
export const updateCompanyStatus = (id, companyStatus) =>API.put(`/companies/${id}`, { companyStatus });