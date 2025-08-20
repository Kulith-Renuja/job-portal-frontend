import { useState } from 'react';
import './Auth.css';
import logo from '../assets/login-logo.png';
import { loginUser, registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [isCompanyRegistration, setIsCompanyRegistration] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirm, setRegisterConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); 

  // 🔐 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
    const res = await loginUser({ phone: loginPhone, password: loginPassword });
    const { token, ...user } = res.data;

    // ✅ Update context + localStorage
    login(token, user);

    navigate(user.role === 'admin' ? '/admin/dashboard' : '/');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // 📝 Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (registerPassword !== registerConfirm) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword,
    });

    const { token, ...user } = res.data;

    // ✅ Update context
    login(token, user);

    navigate(user.role === 'admin' ? '/admin/dashboard' : '/');

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={logo} alt="Job Portal" className="auth-logo" />
        <h2>Find Your Dream Job</h2>
        <p>
          Join thousands of professionals who have discovered their perfect career opportunities through our platform.
        </p>
        <div className="stats">
          <p><strong>50K+</strong> Active Jobs</p>
          <p><strong>10K+</strong> Companies</p>
          <p><strong>100K+</strong> Success Stories</p>
        </div>
      </div>

      <div className="auth-right">
        <h1 className="auth-h1">ජීවිතේම ගොඩයන්න</h1>
        <div className="tabs">
          <button onClick={() => {setIsLogin(false); setIsCompanyRegistration(false);}} className={!isLogin && !isCompanyRegistration ? 'active' : ''}>Register</button>
          <button onClick={() => {setIsLogin(false); setIsCompanyRegistration(true);}} className={isCompanyRegistration ? 'active' : ''}>Company Register</button>
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
        </div>

        {error && <p className="error-text">{error}</p>}
        {isLogin ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h3>Welcome Back</h3>
            <p>Sign in to your account to continue</p>
            <input
              type="tel"
              placeholder="Phone Number"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <div className="form-options">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>
            <button className="primary-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : isCompanyRegistration ? (
          <div className="auth-form">
            <h3>Company Registration</h3>
            <p>Please register your company through our company registration form.</p>
            <a href="/company-register" className="primary-btn">Register Company</a>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <h3>Create Account</h3>
            <p>Sign up to get started</p>
            <input
              type="text"
              placeholder="Full Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={registerPhone}
              onChange={(e) => setRegisterPhone(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email address (optional) "
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerConfirm}
              onChange={(e) => setRegisterConfirm(e.target.value)}
              required
            />
            <button className="primary-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
