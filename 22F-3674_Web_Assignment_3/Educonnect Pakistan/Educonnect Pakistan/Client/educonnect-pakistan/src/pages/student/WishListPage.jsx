import React, { useState, useEffect } from "react";
import { API } from "../../utils/Api";
import { getStudentIdFromLocalStorage } from "../../utils/helper";
import "../../assets/css/Wishlist.css";

const studentId = getStudentIdFromLocalStorage();

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist from API
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${API.student.getWishlist(studentId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json();
      console.log(data);
      setWishlist(data.wishlist || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Remove tutor from wishlist
  const removeFromWishlist = async (tutorId) => {
    try {
      const response = await fetch(
        `${API.student.removeFromWishlist(studentId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tutorId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove tutor from wishlist");
      }

      const data = await response.json();
      setWishlist(data.wishlist || []);
      alert("Tutor removed from wishlist");
    } catch (error) {
      console.error("Error removing tutor from wishlist:", error);
      alert("Failed to remove tutor from wishlist");
    }
  };

  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map((tutor) => (
            <li key={tutor._id} className="wishlist-item">
              <h3>{tutor.name}</h3>
              <p>Subjects: {tutor.subjects.join(", ")}</p>
              <p>Hourly Rate: ${tutor.hourlyRate}</p>
              <p>Rating: {tutor.rating}</p>
              <button
                onClick={() => removeFromWishlist(tutor._id)}
                className="remove-button"
              >
                Remove from Wishlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
