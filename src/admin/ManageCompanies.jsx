import { useEffect, useState } from 'react';
import './ManageCompanies.css';
import { fetchCompanies, updateCompanyStatus } from '../services/companyService';

export default function ManageCompanies() {
const [search, setSearch] = useState('');
const [statusFilter, setStatusFilter] = useState('all'); // all | pending | approved | rejected
const [companies, setCompanies] = useState([]);
const [loading, setLoading] = useState(false);
const [updatingId, setUpdatingId] = useState(null);
const [expandedId, setExpandedId] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
loadCompanies();
}, []);

const loadCompanies = async () => {
setLoading(true);
setError(null);
try {
const res = await fetchCompanies();
setCompanies(res.data || []);
} catch (err) {
console.error('Failed to load companies', err);
setError('Failed to load companies. Please try again.');
} finally {
setLoading(false);
}
};

const changeStatus = async (id, nextStatus) => {
setUpdatingId(id);
setError(null);
try {
await updateCompanyStatus(id, nextStatus); // sends { companyStatus: nextStatus }
// Better: re-fetch to avoid drift and use server as source of truth
await loadCompanies();
} catch (err) {
console.error('Status update failed', err);
setError(err?.response?.data?.message || 'Status update failed');
} finally {
setUpdatingId(null);
}
};

const toggleExpand = (id) => {
setExpandedId((current) => (current === id ? null : id));
};

const matchesSearch = (c) => {
const s = search.trim().toLowerCase();
if (!s) return true;
const name = (c.companyName || '').toLowerCase();
const email = (c.contactEmail || '').toLowerCase();
const reg = String(c.registrationNumber || '').toLowerCase();
return name.includes(s) || email.includes(s) || reg.includes(s);
};

const matchesStatus = (c) => {
const st = (c.companyStatus || 'pending').toLowerCase();
return statusFilter === 'all' ? true : st === statusFilter;
};

const filteredCompanies = companies.filter((c) => matchesSearch(c) && matchesStatus(c));

return (
<div className="manage-companies">
<h1 className="manage-title">Manage Companies</h1>
{error && <div className="alert alert-error">{error}</div>}

  <div className="toolbar">
    <input
      type="text"
      className="company-search"
      placeholder="Search by company name, email or registration number"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="status-filters">
      <button
        className={`chip ${statusFilter === 'all' ? 'active' : ''}`}
        onClick={() => setStatusFilter('all')}
      >
        All
      </button>
      <button
        className={`chip ${statusFilter === 'pending' ? 'active' : ''}`}
        onClick={() => setStatusFilter('pending')}
      >
        Pending
      </button>
      <button
        className={`chip ${statusFilter === 'approved' ? 'active' : ''}`}
        onClick={() => setStatusFilter('approved')}
      >
        Approved
      </button>
      <button
        className={`chip ${statusFilter === 'rejected' ? 'active' : ''}`}
        onClick={() => setStatusFilter('rejected')}
      >
        Rejected
      </button>
    </div>
  </div>

  {loading ? (
    <div>Loading companies...</div>
  ) : filteredCompanies.length === 0 ? (
    <p>No companies found.</p>
  ) : (
    <div className="company-list">
      {filteredCompanies.map((company) => {
        const status = company.companyStatus || 'pending';
        const isExpanded = expandedId === company._id;
        const isUpdating = updatingId === company._id;

        return (
          <div key={company._id} className="company-row">
            <div className="company-info">
              <p className="company-name">{company.companyName || '—'}</p>
              <p>{company.contactEmail || '—'}</p>
              <p>{company.registrationNumber || '—'}</p>
              <p className={`company-status ${status}`}>
                Status: {status}
              </p>
            </div>

            <div className="company-actions">
              <button
                className="secondary"
                onClick={() => toggleExpand(company._id)}
              >
                {isExpanded ? 'Hide Details' : 'View Details'}
              </button>

              {status !== 'approved' && (
                <button
                  onClick={() => changeStatus(company._id, 'approved')}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating…' : 'Approve'}
                </button>
              )}
              {status !== 'rejected' && (
                <button
                  className="reject"
                  onClick={() => changeStatus(company._id, 'rejected')}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating…' : 'Reject'}
                </button>
              )}
            </div>

            {isExpanded && (
              <div className="company-details">
                <div className="details-grid">
                  <div>
                    <p className="label">Contact Person</p>
                    <p>{company.contactPerson || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Account Phone (Login)</p>
                    <p>{company.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Company Landline</p>
                    <p>{company.contactPhone || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Company Email</p>
                    <p>{company.contactEmail || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Address</p>
                    <p>{company.address || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Website</p>
                    <p>{company.website || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Industry</p>
                    <p>{company.industry || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Company Size</p>
                    <p>{company.companySize || '—'}</p>
                  </div>
                  <div>
                    <p className="label">Joined</p>
                    <p>{company.createdAt ? new Date(company.createdAt).toLocaleDateString() : '—'}</p>
                  </div>
                </div>

                <div className="description-card">
                  <p className="label">Description</p>
                  <p>{company.description || '—'}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  )}
</div>
);
}