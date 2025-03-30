import React, { useState, useEffect } from "react";
import TutorList from "../../components/tutors/TutorList"; // Import tutor list component
import "../../assets/css/TutorSearch.css"; // Import CSS
import { API } from "../../utils/Api"; // Import dynamic API paths
import { getStudentIdFromLocalStorage } from "../../utils/helper"; // Import dynamic API paths

const TutorSearch = () => {
  const [filters, setFilters] = useState({
    subject: "",
    rating: "",
    day: "",
    time: "",
    period: "",
    minPrice: "", // Add min price to filters
    maxPrice: "", // Add max price to filters
  });
  const [tutors, setTutors] = useState([]);

  const fetchTutors = async (updatedFilters) => {
    try {
      const { subject, rating, day, time, period, minPrice, maxPrice } =
        updatedFilters;
      const response = await fetch(
        `${API.tutors.getTutors}?subject=${subject}&rating=${rating}&day=${day}&time=${time}&period=${period}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      const data = await response.json();
      setTutors(data.tutors); // Update tutor list
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  const handleFilterChange = (e) => {
    const updatedFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(updatedFilters);
    fetchTutors(updatedFilters); // Fetch tutors with updated filters
  };

  useEffect(() => {
    fetchTutors(filters);
  }, []);

  const addToWishlist = async (tutorId) => {
    try {
      const studentId = getStudentIdFromLocalStorage();
      // Validate inputs
      if (!studentId || !tutorId) {
        alert("Student ID and Tutor ID are required to add to wishlist.");
        return;
      }

      // Perform the API request
      const response = await fetch(`${API.student.addToWishlist(studentId)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
        body: JSON.stringify({ tutorId }), // Send tutor ID in the body
      });

      // Check for response status
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to add tutor to wishlist."
        );
      }

      // Parse the response
      const data = await response.json();
      alert(data.message || "Tutor added to wishlist successfully!");

      // Optionally log or update local state with the updated wishlist
      if (data.wishlist) {
        console.log("Updated wishlist:", data.wishlist); // Debugging purpose
      }
    } catch (error) {
      // Handle errors
      console.error("Error adding to wishlist:", error);
      alert(
        error.message ||
          "An error occurred while adding the tutor to your wishlist."
      );
    }
  };

  return (
    <div className="tutor-search">
      <h1>Search for Tutors</h1>
      <div className="filters">
        <label>
          Subject:
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="english">English</option>
          </select>
        </label>

        <label>
          Rating:
          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>
        </label>

        <label>
          Day:
          <select name="day" value={filters.day} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>

        <label>
          Time:
          <select
            name="time"
            value={filters.time}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="1-2">1-2</option>
            <option value="2-3">2-3</option>
            <option value="3-4">3-4</option>
            <option value="4-5">4-5</option>
            <option value="5-6">5-6</option>
          </select>
        </label>

        <label>
          Period:
          <select
            name="period"
            value={filters.period}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>

        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min price"
          />
        </label>

        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max price"
          />
        </label>
      </div>
      <TutorList tutors={tutors} handleAddToWishlist={addToWishlist} />
    </div>
  );
};

export default TutorSearch;
