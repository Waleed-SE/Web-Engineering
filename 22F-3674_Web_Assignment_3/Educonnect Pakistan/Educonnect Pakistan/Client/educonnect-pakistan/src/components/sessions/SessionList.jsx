import React from "react";

const SessionList = ({
  filteredSessions,
  handleViewReschedule,
  handleCancelSession,
  handleCompleteSession,
}) => {
  return (
    <ul>
      {filteredSessions.map((session) => (
        <li key={session._id}>
          <h3>{session.name}</h3>
          <p>Date: {new Date(session.date).toLocaleDateString()}</p>
          <p>Status: {session.status}</p>

          {session.status !== "canceled" && session.status !== "completed" ? (
            <>
              <button onClick={() => handleViewReschedule(session)}>
                Reschedule
              </button>
              <button onClick={() => handleCancelSession(session._id)}>
                Cancel
              </button>
              <button
                onClick={() => handleCompleteSession(session._id)}
                disabled={session.status === "completed"} // Disable if already completed
              >
                Mark as Complete
              </button>
            </>
          ) : (
            <p style={{ color: "gray" }}>
              This session is {session.status} and cannot be edited.
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SessionList;
