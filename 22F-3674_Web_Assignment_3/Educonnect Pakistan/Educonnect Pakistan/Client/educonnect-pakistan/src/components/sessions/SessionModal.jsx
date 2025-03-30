import React, { useState, useEffect } from "react";
import DateSelector from "../../components/common/DateSelector";
import AvailableSlots from "../../components/common/AvailableSlots";
import { fetchFreeSlots } from "../../utils/helper"; // Import helper function
import { API } from "../../utils/Api";

const SessionModal = ({
  selectedSession,
  isModalOpen,
  closeModal,
  handleReschedule,
  tutorId,
}) => {
  const [tutor, setTutor] = useState(null); // Store tutor data
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [price, setPrice] = useState(0); // Store tutor price for potential updates
  const [isLoadingSlots, setIsLoadingSlots] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tutor data and free slots dynamically
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        if (tutorId) {
          const tutorResponse = await fetch(`${API.tutors.getTutor(tutorId)}`);

          const tutorData = await tutorResponse.json();
          setTutor(tutorData);
          setPrice(tutorData.hourlyRate);

          if (selectedDate) {
            const freeSlots = await fetchFreeSlots(
              tutorId,
              selectedDate,
              tutorData.availability || [] // Fallback to an empty array if undefined
            );
            setAvailableSlots(freeSlots);
          }
        }
      } catch (error) {
        console.error("Error fetching tutor data or slots:", error);
        setError("Failed to fetch tutor data or slots.");
      }
    };

    fetchTutorData();
  }, [tutorId, selectedDate]); // Refresh when tutorId or date changes

  if (!isModalOpen || !selectedSession) return null; // Render nothing if modal is closed or session is undefined

  // Confirm the rescheduling
  const handleConfirmReschedule = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot before confirming.");
      return;
    }

    const [day, time, period] = selectedSlot.split(", ");

    try {
      const response = await fetch(
        `${API.student.rescheduleSession(selectedSession._id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: selectedSession._id, // Session to be rescheduled
            tutor: tutorId, // ID of the tutor
            student: selectedSession.student, // ID of the student
            date: selectedDate, // Selected date
            day, // Selected day
            time, // Selected time
            period, // Selected period
            sessionType: selectedSession.sessionType, // Type of session (e.g., online, in-person)
            price, // Updated price
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reschedule session.");
      }

      const data = await response.json();
      alert("Session successfully rescheduled!");

      // Call the parent function to update session data in the main component
      handleReschedule(data.updatedSession);
      closeModal();
    } catch (error) {
      console.error("Error rescheduling session:", error);
      alert(
        "An error occurred while rescheduling the session. Please try again."
      );
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Reschedule Session</h3>
        <p>
          <strong>Date:</strong> {new Date(selectedSession.date).toDateString()}
        </p>
        <p>
          <strong>Time:</strong> {selectedSession.time}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <hr />

        {/* Select a new date */}
        <h4>Select a New Date:</h4>
        <DateSelector date={selectedDate} setDate={setSelectedDate} />

        {/* Display available slots */}
        {selectedDate && (
          <div>
            <h4>Available Slots on {selectedDate.toDateString()}:</h4>
            {isLoadingSlots ? (
              <p>Loading slots...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <AvailableSlots
                availableSlots={availableSlots}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot}
              />
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="modal-actions">
          <button
            onClick={handleConfirmReschedule}
            disabled={!selectedSlot || isLoadingSlots}
          >
            Confirm Reschedule
          </button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
