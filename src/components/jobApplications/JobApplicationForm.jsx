import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParams, Link, useLocation } from 'react-router-dom';
import { submitJobApplication } from '../../services/jobApplicationService';
import './JobApplicationForm.css';

export default function JobApplicationForm() {
const { user, isAuthenticated } = useAuth();
const { id } = useParams(); // Job ID from URL
const location = useLocation();

const [formData, setFormData] = useState({
name: '',
email: '',
phone: '',
education: {
level: '',
institution: '',
fieldOfStudy: '',
graduationYear: ''
},
experience: '',
coverLetter: '',
cv: null
});

const [loading, setLoading] = useState(false);
const [serverMsg, setServerMsg] = useState('');
const [error, setError] = useState(null);

// Prefill from user (if available)
useEffect(() => {
if (user) {
setFormData((prev) => ({
...prev,
name: prev.name || user.name || '',
email: prev.email || user.email || '',
phone: prev.phone || user.phone || ''
}));
}
}, [user]);

const handleChange = (e) => {
const { name, value, files } = e.target;
if (name.startsWith('education.')) {
  const fieldName = name.split('.')[1];
  setFormData((prev) => ({
    ...prev,
    education: { ...prev.education, [fieldName]: value }
  }));
  return;
}

if (name === 'cv' && files && files[0]) {
  const file = files[0];
  // optional client-side validations
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (!allowed.includes(file.type)) {
    setError('File must be PDF, DOC, or DOCX');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    setError('File must be 5MB or less');
    return;
  }
  setError(null);
  setFormData((prev) => ({ ...prev, cv: file }));
  return;
}

setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
};

const handleSubmit = async (e) => {
e.preventDefault();
setServerMsg('');
setError(null);
setLoading(true);
try {
  const res = await submitJobApplication(id, formData);
  // Response from backend includes message and meetsEducation
  setServerMsg(res.data?.message || 'Application submitted');
  // Reset form (keep contact info, up to you)
  setFormData({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    education: { level: '', institution: '', fieldOfStudy: '', graduationYear: '' },
    experience: '',
    coverLetter: '',
    cv: null
  });
} catch (err) {
  setError(err?.response?.data?.message || 'Failed to submit application. Please try again.');
} finally {
  setLoading(false);
}
};

if (!isAuthenticated) {
const redirect = encodeURIComponent(location.pathname);
return (
<div className="application-form-container">
  <h2>Job Application</h2>
  <p>Please log in to apply for this job.</p>
  <Link to={`/auth?redirect=${redirect}`} className="btn btn-primary">Login</Link>
</div>
);
}

return (
<div className="application-form-container">
<h2>Job Application</h2>
 {serverMsg && <div className="alert alert-success">{serverMsg}</div>}
  {error && <div className="alert alert-error">{error}</div>}

  <form onSubmit={handleSubmit} className="application-form">
    <div className="form-group">
      <label htmlFor="name">Full Name *</label>
      <input id="name" name="name" value={formData.name} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email Address *</label>
      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label htmlFor="phone">Phone Number *</label>
      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label htmlFor="education.level">Education Level *</label>
      <select id="education.level" name="education.level" value={formData.education.level} onChange={handleChange} required>
        <option value="">Select Education Level</option>
        <option value="high-school">High School</option>
        <option value="diploma">Diploma</option>
        <option value="bachelor">Bachelor's Degree</option>
        <option value="master">Master's Degree</option>
        <option value="doctorate">Doctorate</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="education.institution">Institution *</label>
      <input id="education.institution" name="education.institution" value={formData.education.institution} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label htmlFor="education.fieldOfStudy">Field of Study *</label>
      <input id="education.fieldOfStudy" name="education.fieldOfStudy" value={formData.education.fieldOfStudy} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label htmlFor="education.graduationYear">Graduation Year *</label>
      <input id="education.graduationYear" name="education.graduationYear" type="number" min="1900" max={new Date().getFullYear()} value={formData.education.graduationYear} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label htmlFor="experience">Work Experience (years)</label>
      <input id="experience" name="experience" type="number" min="0" value={formData.experience} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="coverLetter">Cover Letter</label>
      <textarea id="coverLetter" name="coverLetter" rows="5" placeholder="Tell us why you're a good fit..." value={formData.coverLetter} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="cv">Upload CV { /* keep required if you want */ }*</label>
      <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleChange} />
    </div>

    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit Application'}
    </button>
  </form>
</div>
);
}