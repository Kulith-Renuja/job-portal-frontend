import { useState } from 'react';
import './Auth.css';
import logo from '../assets/login-logo.png'; // add your own image or placeholder

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

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
        <div className="tabs">
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Register</button>
        </div>

        {isLogin ? (
          <form className="auth-form">
            <h3>Welcome Back</h3>
            <p>Sign in to your account to continue</p>
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <div className="form-options">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>
            <button className="primary-btn">Sign In</button>
            <div className="divider">Or continue with</div>
            <button className="google-btn">Continue with Google</button>
          </form>
        ) : (
          <form className="auth-form">
            <h3>Create Account</h3>
            <p>Sign up to get started</p>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Phone Number" />
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button className="primary-btn">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}
