import API from '../api/axios';

export const fetchStories = () => API.get('/stories');
export const createStory = (data) => API.post('/stories', data);
export const updateStory = (id, data) => API.put(`/stories/${id}`, data);
export const deleteStory = (id) => API.delete(`/stories/${id}`);
