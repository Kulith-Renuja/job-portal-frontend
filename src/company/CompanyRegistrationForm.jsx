import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../services/authService';
import './CompanyRegistrationForm.css';

export default function CompanyRegistrationForm() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
// Account (login)
phone: '', // Account Phone (used for login)
password: '',
confirmPassword: '',
// Company profile
companyName: '',
registrationNumber: '',
address: '',
contactPerson: '',
contactPhone: '',     // Company Landline (optional)
contactEmail: '',     // Optional
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
setFormData(prev => ({ ...prev, [name]: value }));
};

const validate = () => {
const {
companyName, registrationNumber, address, contactPerson,
phone, password, confirmPassword
} = formData;
if (!companyName || !registrationNumber || !address || !contactPerson || !phone || !password) {
  return 'Please fill all required fields.';
}
if (password.length < 6) {
  return 'Password must be at least 6 characters.';
}
if (password !== confirmPassword) {
  return 'Passwords do not match.';
}
// Basic phone sanity check (adjust as needed)
const phoneDigits = phone.replace(/[^\d]/g, '');
if (phoneDigits.length < 7) {
  return 'Please enter a valid account phone number.';
}
return null;
};

const handleSubmit = async (e) => {
e.preventDefault();
setError(null);
const validationError = validate();
if (validationError) {
  setError(validationError);
  return;
}

setLoading(true);
try {
  // Prepare payload (trim strings)
  const payload = {
    phone: formData.phone.trim(),                // login phone (required)
    password: formData.password,                 // required
    companyName: formData.companyName.trim(),    // required
    registrationNumber: formData.registrationNumber.trim(), // required
    address: formData.address.trim(),            // required
    contactPerson: formData.contactPerson.trim(),// required
    contactPhone: formData.contactPhone.trim(),  // optional landline
    contactEmail: formData.contactEmail.trim(),  // optional
    website: formData.website.trim(),
    industry: formData.industry.trim(),
    companySize: formData.companySize.trim(),
    description: formData.description.trim()
  };

  await registerCompany(payload);

  setSuccess(true);
  // Redirect to login page after 3 seconds
  setTimeout(() => navigate('/auth'), 3000);
} catch (err) {
  setError(err?.response?.data?.message || 'Failed to register company. Please try again.');
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
    {/* Account (login) */}
    <div className="form-group">
      <label htmlFor="phone">Account Phone (used for login) *</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="e.g., 07XXXXXXXX"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="password">Password *</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        minLength={6}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="confirmPassword">Confirm Password *</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        minLength={6}
        required
      />
    </div>

    {/* Company profile */}
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

    {/* Company contact (optional) */}
    <div className="form-group">
      <label htmlFor="contactPhone">Company Landline (optional)</label>
      <input
        type="tel"
        id="contactPhone"
        name="contactPhone"
        value={formData.contactPhone}
        onChange={handleChange}
        placeholder="e.g., 0112XXXXXX"
      />
    </div>

    <div className="form-group">
      <label htmlFor="contactEmail">Company Contact Email (optional)</label>
      <input
        type="email"
        id="contactEmail"
        name="contactEmail"
        value={formData.contactEmail}
        onChange={handleChange}
        placeholder="e.g., hr@company.com"
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
        placeholder="https://example.com"
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