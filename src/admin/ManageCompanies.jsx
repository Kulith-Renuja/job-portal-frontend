import { useEffect, useState } from 'react';
import './ManageCompanies.css';
import { fetchCompanies, updateCompanyStatus } from '../services/companyService';

export default function ManageCompanies() {
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await fetchCompanies();
      setCompanies(res.data);
    } catch (err) {
      console.error('Failed to load companies', err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateCompanyStatus(id, status);
      setCompanies(companies.map(company =>
        company._id === id ? { ...company, status } : company
      ));
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.companyName.toLowerCase().includes(search.toLowerCase()) ||
    company.contactEmail.toLowerCase().includes(search.toLowerCase()) ||
    company.registrationNumber.includes(search)
  );

  return (
    <div className="manage-companies">
      <h1 className="manage-title">Manage Companies</h1>

      <input
        type="text"
        className="company-search"
        placeholder="Search by company name, email or registration number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="company-list">
        {filteredCompanies.map(company => (
          <div key={company._id} className="company-row">
            <div className="company-info">
              <p className="company-name">{company.companyName}</p>
              <p>{company.contactEmail}</p>
              <p>{company.registrationNumber}</p>
              <p className={`company-status ${company.status || 'pending'}`}>
                Status: {company.status || 'pending'}
              </p>
            </div>
            <div className="company-actions">
              {company.status !== 'approved' && (
                <button onClick={() => changeStatus(company._id, 'approved')}>Approve</button>
              )}
              {company.status !== 'rejected' && (
                <button className="reject" onClick={() => changeStatus(company._id, 'rejected')}>Reject</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}