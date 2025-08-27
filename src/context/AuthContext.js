// /src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const normalizeUser = (u) => {
if (!u) return u;
const isCompany = u.role === 'company';
return {
...u,
companyId: isCompany ? (u.companyId || u._id) : null, // single-model -> companyId = user._id
companyStatus: isCompany ? u.companyStatus : undefined
};
};

export const AuthProvider = ({ children }) => {
const [token, setToken] = useState(null);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const storedToken = localStorage.getItem('token');
const storedUserRaw = localStorage.getItem('user');
if (storedToken && storedUserRaw) {
  const parsed = JSON.parse(storedUserRaw);
  const normalized = normalizeUser(parsed);
  setToken(storedToken);
  setUser(normalized);
  // overwrite with normalized to keep storage consistent
  localStorage.setItem('user', JSON.stringify(normalized));
}
setLoading(false);
}, []);

const login = (tokenValue, userPayload) => {
const normalized = normalizeUser(userPayload);
localStorage.setItem('token', tokenValue);
localStorage.setItem('user', JSON.stringify(normalized));
setToken(tokenValue);
setUser(normalized);
};

const logout = () => {
localStorage.removeItem('token');
localStorage.removeItem('user');
setToken(null);
setUser(null);
};

const isAuthenticated = !!token;
const isAdmin = user?.role === 'admin';
const isCompany = user?.role === 'company';
const isCompanyApproved = isCompany && user?.companyStatus === 'approved';
const companyId = user?.companyId || null;

return (
<AuthContext.Provider
value={{ token, user, companyId, login, logout, isAdmin, isAuthenticated, isCompany, isCompanyApproved, loading }}
>
{children}
</AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);