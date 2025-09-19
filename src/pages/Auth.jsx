import { useState } from 'react';
import './Auth.css';
import logo from '../assets/login-logo.png';
import { loginUser, registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";  // 👁️ import icons

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirm, setRegisterConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 👁️ states for show/hide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

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

    if (!validatePassword(registerPassword)) {
      setError("Password must be at least 6 characters and include uppercase, lowercase, number, and special character.");
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
      login(token, user);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Password validation regex
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return regex.test(password);
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
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Register</button>
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
        </div>

        {error && <p className="error-text">{error}</p>}
        {isLogin ? (
          // 🔐 Login Form
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
            <div className="password-wrapper">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="form-options">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>
            <button className="primary-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          // 📝 Register Form
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
              placeholder="Email address (optional)"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={registerConfirm}
                onChange={(e) => setRegisterConfirm(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="primary-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
