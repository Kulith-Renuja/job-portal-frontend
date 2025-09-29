import { useState } from "react";
import logo from "../assets/login-logo.png";
import UserLoginForm from "../components/auth/UserLoginForm";
import UserRegisterForm from "../components/auth/UserRegisterForm";
import CompanyLoginForm from "../company/components/CompanyLoginForm";
import CompanyRegisterForm from "../company/components/CompanyRegisterForm";
import "./Auth.css";

export default function AuthPage() {
  const [authType, setAuthType] = useState("user"); // "user" | "company"
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {/* Left side */}
      <div className="auth-left">
        <img src={logo} alt="Job Portal" className="auth-logo" />
        <h2>Find Your Dream Job</h2>
        <p>
          Join thousands of professionals and companies using our platform to
          connect and grow.
        </p>
        <div className="stats">
          <p><strong>50K+</strong> Active Jobs</p>
          <p><strong>10K+</strong> Companies</p>
          <p><strong>100K+</strong> Success Stories</p>
        </div>
      </div>

      {/* Right side */}
      <div className="auth-right">
        <h1 className="auth-h1">ජීවිතේම ගොඩයන්න</h1>

        {/* Tabs for user vs company */}
        <div className="tabs_2">
          <button
            onClick={() => setAuthType("user")}
            className={authType === "user" ? "active" : ""}
          >
            User
          </button>
          <button
            onClick={() => setAuthType("company")}
            className={authType === "company" ? "active" : ""}
          >
            Company
          </button>
        </div>

        {/* Tabs for login vs register */}
        <div className="tabs">
          <button
            onClick={() => setIsLogin(false)}
            className={!isLogin ? "active" : ""}
          >
            Register
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={isLogin ? "active" : ""}
          >
            Login
          </button>
        </div>

        {/* Render correct form */}
        <div className="form-wrapper scroll-frame">
          {authType === "user" && (
            isLogin ? <UserLoginForm /> : <UserRegisterForm />
          )}
          {authType === "company" && (
            isLogin ? <CompanyLoginForm /> : <CompanyRegisterForm />
          )}
        </div>
      </div>
    </div>
  );
}
