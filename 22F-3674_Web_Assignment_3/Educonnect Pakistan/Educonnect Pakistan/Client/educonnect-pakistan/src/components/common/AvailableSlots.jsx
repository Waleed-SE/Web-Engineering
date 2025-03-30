import React from "react";

const AvailableSlots = ({ availableSlots, selectedSlot, setSelectedSlot }) => {
  return (
    <div className="available-slots">
      <p>Availability:</p>
      {availableSlots.length === 0 ? (
        <p>No available slots for the selected date.</p>
      ) : (
        <ul>
          {availableSlots.map((slot, index) => (
            <li key={slot._id || index}>
              <input
                type="radio"
                id={slot._id || index}
                name="timeSlot"
                value={`${slot.day}, ${slot.time}, ${slot.period}`}
                onChange={(e) => setSelectedSlot(e.target.value)}
              />
              <label htmlFor={slot._id || index}>
                {slot.day}, {slot.time} {slot.period}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableSlots;
