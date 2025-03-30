import React from "react";

const LoadingError = ({ isLoading, error }) => {
  if (isLoading) return <p>Loading sessions...</p>;
  if (error) return <p className="error-message">{error}</p>;
  return null;
};

export default LoadingError;
