import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { API } from "../../utils/Api";
import "../../assets/css/SessionManagement.css";
import { getStudentIdFromLocalStorage } from "../../utils/helper";
import SessionCalendar from "../../components/sessions/SessionCalender";
import SessionList from "../../components/sessions/SessionList";
import SessionModal from "../../components/sessions/SessionModal";
import LoadingError from "../../components/common/LoadingError";

const SessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for navigation
  const studentId = getStudentIdFromLocalStorage();

  // Fetch all sessions for the current student
  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API.student.getAllSessions(studentId)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        const sessionsWithTutor = data.sessions.map((session) => ({
          ...session,
          tutor: session.tutor || {}, // Ensure tutor object exists
        }));
        setSessions(sessionsWithTutor);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, [studentId]);

  // Filter sessions for the selected date
  useEffect(() => {
    const filter = sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return (
        selectedDate &&
        sessionDate.toDateString() === selectedDate.toDateString()
      );
    });
    setFilteredSessions(filter);
  }, [selectedDate, sessions]);

  const handleViewReschedule = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSession(null);
    setIsModalOpen(false);
  };

  const handleReschedule = (newDate, newTime, period) => {
    if (!selectedSession) return;

    const updatedSession = {
      ...selectedSession,
      date: new Date(newDate), // Ensure proper Date format
      time: newTime,
      period,
    };

    // Update `sessions` using functional state update
    setSessions((prevSessions) => {
      return prevSessions.map((session) =>
        session._id === updatedSession._id ? updatedSession : session
      );
    });

    // Ensure `filteredSessions` updates correctly
    setFilteredSessions((prevFiltered) => {
      return prevFiltered.map((session) =>
        session._id === updatedSession._id ? updatedSession : session
      );
    });

    alert("Session rescheduled successfully!");
    closeModal();
  };

  const handleCancelSession = async (sessionId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this session?"
    );
    if (!confirmCancel) return;

    try {
      const response = await fetch(`${API.student.cancelSession(sessionId)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to cancel session");
      }
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );
      alert("Session canceled successfully.");
    } catch (error) {
      alert("Error canceling session: " + error.message);
    }
  };

  const navigateToTutorSearch = () => {
    navigate("/dashboard/student/tutors");
  };

  const handleCompleteSession = async (sessionId) => {
    const confirmComplete = window.confirm(
      "Are you sure you want to mark this session as complete?"
    );
    if (!confirmComplete) return;

    try {
      const response = await fetch(
        `${API.student.completeSession(sessionId)}`,
        {
          method: "POST", // Assuming the backend uses POST for marking completion
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to complete session");
      }
      const data = await response.json();
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === sessionId
            ? { ...session, status: "completed" }
            : session
        )
      );
      alert("Session marked as complete successfully.");
    } catch (error) {
      alert("Error marking session as complete: " + error.message);
    }
  };

  return (
    <div className="session-dashboard">
      <h2>Manage Sessions</h2>

      <LoadingError isLoading={isLoading} error={error} />

      {!isLoading && !error && (
        <div>
          <div className="session-actions">
            {/* New Booking Button */}
            <button
              onClick={navigateToTutorSearch}
              className="new-booking-button"
            >
              New Booking
            </button>
          </div>

          <h3>Session Calendar</h3>
          <SessionCalendar
            sessions={sessions}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          {selectedDate && (
            <>
              <h4>Sessions on {selectedDate.toDateString()}:</h4>
              <SessionList
                filteredSessions={filteredSessions}
                handleViewReschedule={handleViewReschedule}
                handleCancelSession={handleCancelSession}
                handleCompleteSession={handleCompleteSession}
              />
            </>
          )}
        </div>
      )}
      <SessionModal
        selectedSession={selectedSession}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleReschedule={handleReschedule}
        tutorId={selectedSession?.tutor?._id || null}
      />
    </div>
  );
};

export default SessionManagement;
