import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { submitJobApplication } from '../../services/jobApplicationService';
import './JobApplicationForm.css';

export default function JobApplicationForm() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams(); // Job ID from URL
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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Handle nested education fields
    if (name.startsWith('education.')) {
      const fieldName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        education: {
          ...prev.education,
          [fieldName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Submit application
      await submitJobApplication(id, formData);
      
      // Reset form and show success message
      setFormData({
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
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="application-form-container">
        <h2>Job Application</h2>
        <p>Please log in to apply for this job.</p>
        <a href="/auth" className="btn btn-primary">Login</a>
      </div>
    );
  }

  return (
    <div className="application-form-container">
      <h2>Job Application</h2>
      {success && <div className="alert alert-success">Application submitted successfully!</div>}
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="education.level">Education Level *</label>
          <select
            id="education.level"
            name="education.level"
            value={formData.education.level}
            onChange={handleChange}
            required
          >
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
          <input
            type="text"
            id="education.institution"
            name="education.institution"
            value={formData.education.institution}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="education.fieldOfStudy">Field of Study *</label>
          <input
            type="text"
            id="education.fieldOfStudy"
            name="education.fieldOfStudy"
            value={formData.education.fieldOfStudy}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="education.graduationYear">Graduation Year *</label>
          <input
            type="number"
            id="education.graduationYear"
            name="education.graduationYear"
            value={formData.education.graduationYear}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="experience">Work Experience (years)</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="0"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows="5"
            placeholder="Tell us why you're a good fit for this position..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cv">Upload CV *</label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}