import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyAdds.css";

export default function CompanyAdds() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("listings");

  const renderContent = () => {
    switch (activeTab) {
      case "listings":
        return <div className="content-box">My Job Listings page will load here.</div>;
      case "upgrade":
        return <div className="content-box">Upgrade Plan page will load here.</div>;
      case "slots":
        return <div className="content-box">Remaining Slots page will load here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="company-dashboard">
      <div className="top-section">
        <h1>Company Dashboard</h1>
        <button
          className="post-job-btn"
          onClick={() => navigate("/company/post-job")}
        >
          + Post a Job
        </button>
      </div>

      <div className="dashboard-buttons">
        <button
          className={activeTab === "listings" ? "active" : ""}
          onClick={() => setActiveTab("listings")}
        >
          My Job Listings
        </button>
        <button
          className={activeTab === "upgrade" ? "active" : ""}
          onClick={() => setActiveTab("upgrade")}
        >
          Upgrade Plan
        </button>
        <button
          className={activeTab === "slots" ? "active" : ""}
          onClick={() => setActiveTab("slots")}
        >
          Remaining Slots
        </button>
      </div>

      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
}
