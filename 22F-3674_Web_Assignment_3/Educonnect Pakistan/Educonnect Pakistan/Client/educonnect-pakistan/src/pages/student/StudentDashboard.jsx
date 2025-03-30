import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>
        Welcome, Student! Here you can access all the tools and resources to
        manage your learning experience.
      </p>

      {/* Feature 1: Tutor Search and Filtering System */}
      <section>
        <h2>Search for Tutors</h2>
        <button onClick={() => navigate("/dashboard/student/tutors")}>
          Search for Tutors
        </button>
      </section>

      {/* Feature 3: Session Management Dashboard */}
      <section>
        <h2>Manage Sessions</h2>
        <button onClick={() => navigate("/dashboard/student/sessions")}>
          View Upcoming Sessions
        </button>
      </section>

      {/* Feature 4: Review and Rating System */}
      <section>
        <h2>Rate Your Tutors</h2>
        <button onClick={() => navigate("/dashboard/student/reviews")}>
          Leave a Review
        </button>
      </section>

      {/* Feature 5: Wishlist for Tutors */}
      <section>
        <h2>Your Tutor Wishlist</h2>
        <button onClick={() => navigate("/dashboard/student/wishlist")}>
          View Wishlist
        </button>
      </section>
    </div>
  );
};

export default StudentDashboard;
