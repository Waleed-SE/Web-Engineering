import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DateSelector = ({ date, setDate }) => {
  return (
    <div className="date-selector">
      <label>
        Select Date:
        <Calendar onChange={setDate} value={date} />
      </label>
      {date && <p>Selected Date: {date.toDateString()}</p>}
    </div>
  );
};

export default DateSelector;
