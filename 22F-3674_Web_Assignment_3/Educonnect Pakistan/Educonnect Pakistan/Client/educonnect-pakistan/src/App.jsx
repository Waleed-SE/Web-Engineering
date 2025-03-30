import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RegistrationForm from "./pages/auth/RegistrationForm";
import LoginForm from "./pages/auth/LoginForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TutorSearch from "./pages/student/TutorSearch";
import SessionBooking from "./pages/student/SessionBooking";
import SessionManagement from "./pages/student/SessionManagement";
import WishlistPage from "./pages/student/WishListPage";
import ReviewPage from "./pages/student/ReviewPage";
import TutorDashboard from "./pages/tutor/TutorDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  const { user, login } = useAuth();

  const handleLogin = (user) => {
    // Save the logged-in user's data using the AuthContext
    login(user);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Login and registration routes */}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationForm />} />
          {/* Role-specific dashboards */}
          <Route
            path="/dashboard/admin"
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard/student"
            element={
              user?.role === "student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard/tutor"
            element={
              user?.role === "tutor" ? (
                <TutorDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/dashboard/student/tutors" element={<TutorSearch />} />
          <Route
            path="/dashboard/student/book-session/:tutorId"
            element={<SessionBooking />}
          />
          <Route
            path="/dashboard/student/sessions"
            element={<SessionManagement />}
          />
          <Route
            path="/dashboard/student/wishlist"
            element={<WishlistPage />}
          />
          <Route path="/dashboard/student/reviews" element={<ReviewPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
