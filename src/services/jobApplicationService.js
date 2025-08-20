import API from '../api/axios';
import { sendApplicationNotification, sendApplicationConfirmation } from './emailService';

export const submitJobApplication = async (jobId, applicationData) => {
  const formData = new FormData();
  
  // Append all application data to FormData
  Object.keys(applicationData).forEach(key => {
    if (key === 'cv' && applicationData[key]) {
      // Handle file upload
      formData.append(key, applicationData[key]);
    } else if (key === 'education' && typeof applicationData[key] === 'object') {
      // Handle nested education object
      Object.keys(applicationData[key]).forEach(eduKey => {
        formData.append(`education[${eduKey}]`, applicationData[key][eduKey]);
      });
    } else if (applicationData[key] !== null && applicationData[key] !== undefined) {
      formData.append(key, applicationData[key]);
    }
  });
  
  // Append job ID
  formData.append('jobId', jobId);
  
  // Submit application
  const response = await API.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  // Send emails (in a real implementation, this would be done on the server)
  // For now, we'll simulate it on the client side
  /*
  if (response.data.companyEmail) {
    await sendApplicationNotification(response.data.companyEmail, applicationData);
  }
  
  if (applicationData.email) {
    await sendApplicationConfirmation(applicationData.email, response.data.job);
  }
  */
  
  return response;
};

export const getJobApplications = (jobId) => {
  return API.get(`/applications/job/${jobId}`);
};

export const getFilteredApplications = (companyId) => {
  return API.get(`/applications/company/${companyId}/filtered`);
};