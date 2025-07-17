import API from '../api/axios';

export const fetchDashboardStats = () => API.get('/dashboard/stats');
