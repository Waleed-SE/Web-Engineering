import React from "react";
import { useNavigate } from "react-router-dom";

const TutorList = ({ tutors, handleAddToWishlist }) => {
  const navigate = useNavigate();

  return (
    <div className="tutor-list">
      <h2>Available Tutors</h2>
      {tutors.length > 0 ? (
        <ul>
          {tutors.map((tutor) => (
            <li key={tutor._id} className="tutor-item">
              <h3>{tutor.name}</h3>
              <p>Subjects: {tutor.subjects.join(", ")}</p>
              <p>Rating: {tutor.rating || "N/A"}</p>
              <p>Hourly Rate: ${tutor.hourlyRate || "N/A"}</p>
              <p>Availability:</p>
              <ul>
                {tutor.availability.map((slot, index) => (
                  <li key={slot._id || index}>
                    {slot.day}, {slot.time} {slot.period}
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  navigate(`/dashboard/student/book-session/${tutor._id}`)
                }
              >
                Book a Session
              </button>
              <button
                onClick={() => handleAddToWishlist(tutor._id)}
                className="wishlist-button"
              >
                Add to Wishlist
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tutors found.</p>
      )}
    </div>
  );
};

export default TutorList;
