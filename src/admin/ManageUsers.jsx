import { useEffect, useState } from 'react';
import './ManageUsers.css';
import { fetchUsers, updateUserStatus } from '../services/userService';

export default function ManageUsers() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users', err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateUserStatus(id, status);
      setUsers(users.map(user =>
        user._id === id ? { ...user, status } : user
      ));
    } catch (err) {
      console.error('Status update failed', err);
    }
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
          <div key={user._id} className="user-row">
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p className={`user-status ${user.status || 'active'}`}>
                Status: {user.status || 'active'}
              </p>
            </div>
            <div className="user-actions">
              <button onClick={() => changeStatus(user._id, 'deactivated')}>Deactivate</button>
              <button className="flag" onClick={() => changeStatus(user._id, 'flagged')}>Flag</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
