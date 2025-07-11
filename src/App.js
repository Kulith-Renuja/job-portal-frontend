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
import ManageCountries from './admin/ManageCountries';

// Auth Protection Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function AppLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === '/auth' || location.pathname.startsWith('/admin');

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
      {/* Public Routes */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected User Route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
      path="/categories"
      element={
      <ProtectedRoute>
      <Categories />
      </ProtectedRoute>
      }
      />
      <Route
      path="/jobs"
      element={
      <ProtectedRoute>
      <Jobs />
      </ProtectedRoute>
      }
      />
      <Route
      path="/stories"
      element={
      <ProtectedRoute>
      <Stories />
      </ProtectedRoute>
      }
      />
      <Route
      path="/courses"
      element={
      <ProtectedRoute>
      <Courses />
      </ProtectedRoute>
      }
      />
      <Route
      path="/about"
      element={
      <ProtectedRoute>
      <About />
      </ProtectedRoute>
      }
      />
      <Route
      path="/account"
      element={
      <ProtectedRoute>
      <Account />
      </ProtectedRoute>
      }
      />
      

          
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes (protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageJobs />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageCourses />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/migrations"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageMigrations />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/stories"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageStories />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageUsers />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/countries"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageCountries />
              </AdminLayout>
            </AdminRoute>
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
