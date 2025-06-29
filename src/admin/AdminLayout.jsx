import AdminSidebar from './components/AdminSidebar';
import './admin.css';

export default function AdminLayout({ children }) {
return (
<div className="admin-layout">
<AdminSidebar />
<main className="admin-content">
{children}
</main>
</div>
);
}