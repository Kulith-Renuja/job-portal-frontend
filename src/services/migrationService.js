import API from '../api/axios';

export const fetchMigrations = () => API.get('/migrations');
export const createMigration = (data) => API.post('/migrations', data);
export const updateMigration = (id, data) => API.put(`/migrations/${id}`, data);
export const deleteMigration = (id) => API.delete(`/migrations/${id}`);
