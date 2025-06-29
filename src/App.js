import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Jobs from './pages/Jobs';
import Stories from './pages/Stories';
import Courses from './pages/Courses';
import Account from './pages/Account';
import About from './pages/About';
import Auth from './pages/Auth';

// Admin Layout and Pages
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageJobs from './admin/ManageJobs';
import ManageCourses from './admin/ManageCourses';
import ManageMigrations from './admin/ManageMigrations';
import ManageStories from './admin/ManageStories';
import ManageUsers from './admin/ManageUsers';

function AppLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === '/auth' || location.pathname.startsWith('/admin');

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <AdminLayout>
              <ManageJobs />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminLayout>
              <ManageCourses />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/migrations"
          element={
            <AdminLayout>
              <ManageMigrations />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/stories"
          element={
            <AdminLayout>
              <ManageStories />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <ManageUsers />
            </AdminLayout>
          }
        />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
