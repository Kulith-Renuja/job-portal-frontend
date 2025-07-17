import API from '../api/axios';

export const fetchUsers = () => API.get('/usermanage');
export const updateUserStatus = (id, status) =>
  API.put(`/usermanage/${id}`, { status });
