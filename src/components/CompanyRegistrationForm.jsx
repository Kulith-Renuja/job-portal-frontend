import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../services/authService';
import './CompanyRegistrationForm.css';

export default function CompanyRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    address: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    website: '',
    industry: '',
    companySize: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Submit company registration
      await registerCompany(formData);
      
      // Show success message
      setSuccess(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err) {
      setError('Failed to register company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-registration-container">
      <h2>Company Registration</h2>
      <p>Please fill in the details below to register your company.</p>
      
      {success && (
        <div className="alert alert-success">
          Company registration submitted successfully! You will be redirected to the login page shortly.
        </div>
      )}
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="company-registration-form">
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="registrationNumber">Registration Number *</label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Company Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person *</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone *</label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email *</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="website">Company Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="industry">Industry *</label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          >
            <option value="">Select Industry</option>
            <option value="IT">Information Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="companySize">Company Size *</label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            required
          >
            <option value="">Select Company Size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Company Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Please provide a brief description of your company..."
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Register Company'}
        </button>
      </form>
    </div>
  );
}