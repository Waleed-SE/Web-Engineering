import React from "react";

const BookingConfirmation = ({ confirmationMessage }) => {
  return (
    <div className="booking-confirmation">
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
};

export default BookingConfirmation;
