import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFilteredApplications } from '../services/jobApplicationService';
import './FilteredApplications.css';

export default function FilteredApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFilteredApplications();
  }, []);

  const loadFilteredApplications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await getFilteredApplications(user._id);
      setApplications(res.data);
    } catch (err) {
      console.error('Failed to load filtered applications', err);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = (applicationId) => {
    // In a real implementation, this would download the CV file
    // For now, we'll just show an alert
    alert(`Downloading CV for application ${applicationId}`);
  };

  if (loading) return <div>Loading filtered applications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="filtered-applications">
      <h2>Filtered Job Applications</h2>
      <p>These applications match your job requirements.</p>
      
      {applications.length === 0 ? (
        <p>No applications match your requirements yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map(application => (
            <div key={application._id} className="application-card">
              <div className="application-header">
                <h3>{application.name}</h3>
                <span className="application-date">
                  Applied on {new Date(application.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="application-details">
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Phone:</strong> {application.phone}</p>
                <p><strong>Education:</strong> {application.education.level} in {application.education.fieldOfStudy}</p>
                <p><strong>Graduation Year:</strong> {application.education.graduationYear}</p>
                {application.experience && <p><strong>Experience:</strong> {application.experience} years</p>}
              </div>
              
              {application.coverLetter && (
                <div className="cover-letter">
                  <h4>Cover Letter</h4>
                  <p>{application.coverLetter}</p>
                </div>
              )}
              
              <div className="application-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleDownloadCV(application._id)}
                >
                  Download CV
                </button>
                <button className="btn btn-secondary">Contact Applicant</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}