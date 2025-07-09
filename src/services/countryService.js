import API from '../api/axios';

export const fetchCountries = () => API.get('/countries');
export const createCountry = (data) => API.post('/countries', data);
export const updateCountry = (id, data) => API.put(`/countries/${id}`, data);
export const deleteCountry = (id) => API.delete(`/countries/${id}`);
