import React, { useState, useEffect } from "react";
import { API } from "../../utils/Api";
import { getStudentIdFromLocalStorage } from "../../utils/helper";
import "../../assets/css/ReviewPage.css";

const ReviewPage = () => {
  const [completedSessions, setCompletedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const studentId = getStudentIdFromLocalStorage();

  // Fetch completed sessions from API
  const fetchCompletedSessions = async () => {
    try {
      const response = await fetch(
        `${API.student.getCompletedSessions(studentId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch completed sessions");
      }

      const data = await response.json();
      setCompletedSessions(data.sessions || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching completed sessions:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Submit review
  const submitReview = async (sessionId, tutorId) => {
    if (!rating || rating < 1 || rating > 5) {
      alert("Please provide a valid rating between 1 and 5.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API.student.submitReview()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentId,
          tutor: tutorId,
          session: sessionId,
          rating,
          reviewText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      alert("Review submitted successfully!");
      setReviewText("");
      setRating(0);
      setSelectedSession(null);
      fetchCompletedSessions(); // Refresh sessions
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCompletedSessions();
  }, []);

  if (loading) return <p>Loading completed sessions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="review-page">
      <h1>Completed Sessions</h1>
      {completedSessions.length === 0 ? (
        <p>No completed sessions available.</p>
      ) : (
        <ul className="session-list">
          {completedSessions.map((session) => (
            <li key={session._id} className="session-item">
              <h3>{session.tutor.name}</h3>
              <p>Subject: {session.subject}</p>
              <p>Date: {new Date(session.date).toLocaleDateString()}</p>
              <button
                onClick={() => setSelectedSession(session)}
                className="review-button"
              >
                Review
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedSession && (
        <div className="review-form">
          <h2>Review {selectedSession.tutor.name}</h2>
          <label>
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="">Select a rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
          <label>
            Review Text:
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here"
            />
          </label>
          <button
            onClick={() =>
              submitReview(selectedSession._id, selectedSession.tutor._id)
            }
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
