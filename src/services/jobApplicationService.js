import API from '../api/axios';

export const submitJobApplication = async (jobId, form) => {
const fd = new FormData();
fd.append('jobId', jobId);
fd.append('name', form.name);
fd.append('email', form.email);
fd.append('phone', form.phone);
fd.append('experience', form.experience || 0);
fd.append('coverLetter', form.coverLetter || '');

// nested education
fd.append('education[level]', form.education.level);
fd.append('education[institution]', form.education.institution);
fd.append('education[fieldOfStudy]', form.education.fieldOfStudy);
fd.append('education[graduationYear]', form.education.graduationYear);

if (form.cv) fd.append('cv', form.cv);

return API.post('/applications', fd); // backend handles filtering and emails
};