const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost";
const authPath = import.meta.env.VITE_AUTH_PATH || "/api/auth";
const basePort = import.meta.env.VITE_BASE_PORT || ":5000";
const studentPath = import.meta.env.VITE_STUDENT_PATH || "/api/students";
const adminPath = import.meta.env.VITE_ADMIN_PATH || "/api/admins";
const tutorPath = import.meta.env.VITE_TUTOR_PATH || "/api/tutors";

// API Endpoints
export const API = {
  auth: {
    login: `${baseURL}${basePort}${authPath}/login`,
    // register: `${baseURL}${basePort}${authPath}/register`,
  },
  student: {
    getStudents: `${baseURL}${basePort}${studentPath}/students`,
    bookSession: `${baseURL}${basePort}${studentPath}/students/book`,
    getAllSessions: (studentId) =>
      `${baseURL}${basePort}${studentPath}/students/${studentId}/sessions`,
    cancelSession: (sessionId) =>
      `${baseURL}${basePort}${studentPath}/students/sessions/cancel/${sessionId}`,
    rescheduleSession: (sessionId) =>
      `${baseURL}${basePort}${studentPath}/students/sessions/reschedule/${sessionId}`,
    addToWishlist: (studentId) =>
      `${baseURL}${basePort}${studentPath}/students/wishlist/add/${studentId}`,
    getWishlist: (studentId) =>
      `${baseURL}${basePort}${studentPath}/students/wishlist/${studentId}`,
    removeFromWishlist: (studentId) =>
      `${baseURL}${basePort}${studentPath}/students/wishlist/remove/${studentId}`,
    completeSession: (sessionId) =>
      `${baseURL}${basePort}${studentPath}/students/sessions/complete/${sessionId}`,
    submitReview: () => `${baseURL}${basePort}${studentPath}/students/reviews`,
    getCompletedSessions: (studentId) =>
      `${baseURL}${basePort}${studentPath}/students/sessions/completed/${studentId}`,
  },
  tutors: {
    getTutors: `${baseURL}${basePort}${tutorPath}/tutors`,
    getTutor: (tutorId) =>
      `${baseURL}${basePort}${tutorPath}/tutors/${tutorId}`,
    getTutorSessions: (tutorId) =>
      `${baseURL}${basePort}${tutorPath}/tutors/${tutorId}/sessions`,
    getBookedSlots: (tutorId) =>
      `${baseURL}${basePort}${tutorPath}/tutors/${tutorId}/booked-sessions`,
  },
  admin: {},
};
