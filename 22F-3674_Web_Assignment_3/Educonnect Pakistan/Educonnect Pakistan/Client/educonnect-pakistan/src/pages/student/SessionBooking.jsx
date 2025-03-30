import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../utils/Api";
import {
  getStudentIdFromLocalStorage,
  fetchFreeSlots,
} from "../../utils/helper";
import TutorDetails from "../../components/tutors/TutorDetails";
import DateSelector from "../../components/common/DateSelector";
import AvailableSlots from "../../components/common/AvailableSlots";
import SessionTypeSelector from "../../components/tutors/SessionTypeSelector";
import BookingConfirmation from "../../components/tutors/BookingConfirmation";
import "../../assets/css/SessionBooking.css";

const SessionBooking = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [sessionType, setSessionType] = useState("online");
  const [price, setPrice] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [date, setDate] = useState(null);
  const studentId = getStudentIdFromLocalStorage();

  // Fetch tutor details and free slots
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const tutorResponse = await fetch(`${API.tutors.getTutor(tutorId)}`);
        const tutorData = await tutorResponse.json();
        setTutor(tutorData);
        setPrice(tutorData.hourlyRate);

        if (date) {
          const freeSlots = await fetchFreeSlots(
            tutorId,
            date,
            tutorData.availability
          );
          setAvailableSlots(freeSlots);
        }
      } catch (error) {
        console.error("Error fetching tutor data or slots:", error);
      }
    };

    fetchTutorData();
  }, [tutorId, date]);

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    try {
      if (!selectedSlot || !date) {
        alert("Please select a time slot and session date before confirming.");
        return;
      }

      const [day, time, period] = selectedSlot.split(", ");

      const response = await fetch(`${API.student.bookSession}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: studentId,
          tutor: tutorId,
          date,
          day,
          time,
          period,
          sessionType,
          price,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setConfirmationMessage(
          `Session successfully booked with ${tutor.name} for ${day}, ${time} ${period} (${sessionType}).`
        );
        setTimeout(() => navigate("/dashboard/student/sessions"), 2000);
      } else {
        alert(`Booking failed. Please try again. ${data.message}`);
      }
    } catch (error) {
      console.error("Error booking session:", error);
      alert(
        "An error occurred while booking the session. Please try again later."
      );
    }
  };

  return (
    <div className="book-session">
      <h1>Book a Session</h1>
      {tutor ? (
        <div>
          <TutorDetails tutor={tutor} />
          <DateSelector date={date} setDate={setDate} />
          <AvailableSlots
            availableSlots={availableSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
          <SessionTypeSelector
            sessionType={sessionType}
            setSessionType={setSessionType}
          />
          <button onClick={handleConfirmBooking}>Confirm Booking</button>
          <BookingConfirmation confirmationMessage={confirmationMessage} />
        </div>
      ) : (
        <p>Loading tutor details...</p>
      )}
    </div>
  );
};

export default SessionBooking;
