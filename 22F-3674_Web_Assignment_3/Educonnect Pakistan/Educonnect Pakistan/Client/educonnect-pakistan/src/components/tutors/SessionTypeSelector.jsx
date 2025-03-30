import React from "react";

const SessionTypeSelector = ({ sessionType, setSessionType }) => {
  return (
    <div className="session-type-selector">
      <label>
        Session Type:
        <select
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
        >
          <option value="online">Online</option>
          <option value="in-person">In-Person</option>
        </select>
      </label>
    </div>
  );
};

export default SessionTypeSelector;
