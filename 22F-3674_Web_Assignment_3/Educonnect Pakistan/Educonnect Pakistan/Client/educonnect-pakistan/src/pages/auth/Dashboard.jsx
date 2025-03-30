import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <h2>You are not logged in.</h2>
        <p>Please choose an option below:</p>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      {user.role === "admin" && <p>Admin Controls</p>}
      {user.role === "tutor" && <p>Tutor Dashboard</p>}
      {user.role === "student" && <p>Student Dashboard</p>}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
