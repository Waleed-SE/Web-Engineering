import React from "react";

const TutorDetails = ({ tutor }) => {
  return (
    <div className="tutor-details">
      <h2>Tutor: {tutor.name}</h2>
      <p>Subjects: {tutor.subjects.join(", ")}</p>
      <p>Hourly Rate: ${tutor.hourlyRate}</p>
    </div>
  );
};

export default TutorDetails;
