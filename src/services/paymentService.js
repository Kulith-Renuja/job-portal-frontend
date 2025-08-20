import API from '../api/axios';

export const createPayment = (paymentData) => API.post('/payments', paymentData);
export const getPaymentHistory = (companyId) => API.get(`/payments/company/${companyId}`);
export const verifyPayment = (paymentId) => API.get(`/payments/verify/${paymentId}`);