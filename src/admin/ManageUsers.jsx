import { useState } from 'react';
import './ManageUsers.css';

export default function ManageUsers() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Ayesha Perera', email: 'ayesha@gmail.com', phone: '0771234567', status: 'active' },
    { id: 2, name: 'Nimal Silva', email: 'nimal.silva@example.com', phone: '0712345678', status: 'active' },
    { id: 3, name: 'Chamari Karunaratne', email: 'chamari.k@jobs.lk', phone: '0759876543', status: 'flagged' },
  ]);

  const handleDeactivate = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: 'deactivated' } : user
    ));
  };

  const handleFlag = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: 'flagged' } : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search)
  );

  return (
    <div className="manage-users">
      <h1 className="manage-title">Manage Users</h1>

      <input
        type="text"
        className="user-search"
        placeholder="Search by name, email or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-row">
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p className={`user-status ${user.status}`}>Status: {user.status}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => handleDeactivate(user.id)}>Deactivate</button>
              <button className="flag" onClick={() => handleFlag(user.id)}>Flag</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
