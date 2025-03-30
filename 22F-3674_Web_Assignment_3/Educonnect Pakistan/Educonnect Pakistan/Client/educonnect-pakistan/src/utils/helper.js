import { API } from "./Api";

export const getStudentIdFromLocalStorage = () => {
  const userData = localStorage.getItem("user");

  if (!userData) {
    console.error("User data not found in local storage");
    return null;
  }

  try {
    const parsedUserData = JSON.parse(userData);
    return parsedUserData._id;
  } catch (error) {
    console.error("Error parsing user data from local storage:", error);
    return null;
  }
};

export const fetchFreeSlots = async (tutorId, date, availability) => {
  if (!tutorId || !date || !availability) {
    console.error(
      "Tutor ID, date, or availability is missing.",
      tutorId,
      date,
      availability
    );
    return [];
  }

  try {
    const response = await fetch(
      `${API.tutors.getBookedSlots(tutorId)}?date=${date.toISOString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch booked slots.");
    }

    const data = await response.json();
    const bookedSlots = data.bookedSessions.map((session) => ({
      day: session.day,
      time: session.time,
      period: session.period,
    }));

    // Filter out booked slots from tutor availability
    const freeSlots = availability.filter(
      (slot) =>
        !bookedSlots.some(
          (booked) =>
            booked.day === slot.day &&
            booked.time === slot.time &&
            booked.period === slot.period
        )
    );

    return freeSlots;
  } catch (error) {
    console.error("Error fetching free slots:", error);
    return [];
  }
};
