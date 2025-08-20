// Service for filtering job applications based on education level

export const filterApplicationsByEducation = (applications, requiredEducationLevel) => {
  // Define education level hierarchy
  const educationHierarchy = {
    'high-school': 1,
    'diploma': 2,
    'bachelor': 3,
    'master': 4,
    'doctorate': 5
  };

  // Get the minimum required education level
  const minEducationLevel = educationHierarchy[requiredEducationLevel] || 0;

  // Filter applications based on education level
  return applications.filter(application => {
    const applicantEducationLevel = educationHierarchy[application.education.level] || 0;
    return applicantEducationLevel >= minEducationLevel;
  });
};

export const filterApplicationsByFieldOfStudy = (applications, requiredFieldOfStudy) => {
  if (!requiredFieldOfStudy) {
    return applications;
  }

  return applications.filter(application => {
    // Case insensitive comparison
    return application.education.fieldOfStudy.toLowerCase().includes(requiredFieldOfStudy.toLowerCase());
  });
};

export const filterApplicationsByGraduationYear = (applications, minGraduationYear) => {
  if (!minGraduationYear) {
    return applications;
  }

  return applications.filter(application => {
    return parseInt(application.education.graduationYear) >= parseInt(minGraduationYear);
  });
};

export const filterApplicationsByMultipleCriteria = (applications, job) => {
  let filteredApplications = applications;

  // Filter by education level
  if (job.requiredEducationLevel) {
    filteredApplications = filterApplicationsByEducation(filteredApplications, job.requiredEducationLevel);
  }

  // Filter by field of study
  if (job.requiredFieldOfStudy) {
    filteredApplications = filterApplicationsByFieldOfStudy(filteredApplications, job.requiredFieldOfStudy);
  }

  // Filter by graduation year
  if (job.minGraduationYear) {
    filteredApplications = filterApplicationsByGraduationYear(filteredApplications, job.minGraduationYear);
  }

  return filteredApplications;
};