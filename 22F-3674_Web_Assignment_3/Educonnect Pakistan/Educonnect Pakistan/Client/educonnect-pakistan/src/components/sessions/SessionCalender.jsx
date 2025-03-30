import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SessionCalendar = ({ sessions, selectedDate, setSelectedDate }) => {
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      const pending = sessions.some(
        (session) =>
          new Date(session.date).toDateString() === dateString &&
          session.status === "pending"
      );
      const completed = sessions.some(
        (session) =>
          new Date(session.date).toDateString() === dateString &&
          session.status === "completed"
      );

      if (pending) return "pending-session";
      if (completed) return "completed-session";
    }
    return null;
  };

  return (
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      tileClassName={tileClassName}
    />
  );
};

export default SessionCalendar;
