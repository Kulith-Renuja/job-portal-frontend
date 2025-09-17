import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

// Importing components and pages client-side
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
import Migrations from './pages/Migrations';
import Countries from './pages/Countries';

// Importing details pages
import JobDetails from './pages/DetailsPages/JobDetails';
import CourseDetails from './pages/DetailsPages/CourseDetails';
import MigrationDetails from './pages/DetailsPages/MigrationDetails';
import StoryDetails from './pages/DetailsPages/StoryDetails';
import CountryDetails from './pages/DetailsPages/CountryDetails';

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
            <Home />
        }
      />
      <Route
      path="/categories"
      element={
      <Categories />
      }
      />
      <Route
      path="/visa"
      element={
      <Migrations />
      }
      />
      <Route
      path="/countries"
      element={
      <Countries />
      }
      />
      <Route
      path="/jobs"
      element={
      <Jobs />
      }
      />
      <Route
      path="/stories"
      element={
      <Stories />
      }
      />
      <Route
      path="/courses"
      element={
      <Courses />
      }
      />
      <Route
      path="/about"
      element={
      <About />
      }
      />
      <Route
      path="/account"
      element={
      <Account />
      }
      />
      <Route
        path="/jobs/:id"
        element={
            <JobDetails />
        }
      />
      <Route
        path="/courses/:id"
        element={
            <CourseDetails />
        }
      />
      <Route
        path="/migration/:id"
        element={
            <MigrationDetails />
        }
      />
      <Route
        path="/stories/:id"
        element={
            <StoryDetails />
        }
      />
      <Route
        path="/countries/:id"
        element={
            <CountryDetails />
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
          path="/admin/visa"
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
        <Route path="/admin/Account" element={
            <AdminLayout>
              <Account />
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
