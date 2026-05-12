import { useState } from 'react';
import { registerCompany } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CompanyRegisterForm() {
  // Company info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [brNumber, setBrNumber] = useState('');

  // Contact person
  const [contactName, setContactName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Password
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Other states
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (!agree) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const res = await registerCompany({
        name,
        email,
        telephone,
        country,
        address,
        industry,
        companySize,
        brNumber,
        contactPerson: {
          fullName: contactName,
          jobTitle,
          mobile: mobileNumber,
        },
        password,
      });

      const { token, ...company } = res.data;
      login(token, company);
      navigate('/company/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Company registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>Register Your Company</h3>
      <p>Fill in details to create your company account</p>

      {/* Company Info */}
      <input type="text" placeholder="Company Name*" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="tel" placeholder="Telephone (optional)" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
      <input type="text" placeholder="Country*" value={country} onChange={(e) => setCountry(e.target.value)} required />
      <input type="text" placeholder="Address*" value={address} onChange={(e) => setAddress(e.target.value)} required />

      {/* Dropdowns */}
      <select value={industry} onChange={(e) => setIndustry(e.target.value)} required>
        <option value="">Select Industry*</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
      </select>

      <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} required>
        <option value="">Select Company Size*</option>
        <option value="1-10">1-10</option>
        <option value="11-50">11-50</option>
        <option value="51-200">51-200</option>
        <option value="200+">200+</option>
      </select>

      <input type="text" placeholder="BR Number (optional)" value={brNumber} onChange={(e) => setBrNumber(e.target.value)} />

      {/* Contact Person */}
      <h4>Contact Person Details</h4>
      <input type="text" placeholder="Full Name*" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
      <input type="text" placeholder="Job Title*" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
      <input type="tel" placeholder="Mobile Number*" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />

      {/* Passwords */}
      <div className="password-wrapper">
        <input type={showPassword ? "text" : "password"} placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
      </div>

      <div className="password-wrapper">
        <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password*" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <FaEyeSlash /> : <FaEye />}</span>
      </div>

      <label className="checkbox-label">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        I agree to the terms and conditions
      </label>

      {error && <p className="error-text">{error}</p>}

      <button className="primary-btn" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
