# **Student Dashboard Application**

This project is a **Student Dashboard Application** designed for students to manage their academic sessions, book new tutors, handle their wishlist, review completed sessions, and more. The application includes robust frontend functionality paired with backend APIs for dynamic data handling.

---

## **Features Overview**

### 1. **Session Management Page**
- **Purpose**: Enables students to manage their sessions (reschedule, cancel, and view details).
- **Key Functionalities**:
  - View all sessions assigned to the student.
  - Reschedule sessions by selecting a new date, time, and period.
  - Cancel sessions via an API call.
  - Navigate to the "Tutor Search" page for booking new sessions.
- **Frontend Components**:
  - `SessionCalendar` for selecting specific dates.
  - `SessionList` for displaying filtered sessions.
  - `SessionModal` for rescheduling sessions.
- **Backend Integration**:
  - `GET /students/sessions/:studentId`: Fetch all sessions for the student.
  - `POST /students/sessions/reschedule/:sessionId`: Reschedule a session.
  - `DELETE /students/sessions/cancel/:sessionId`: Cancel a session.

---

### 2. **Wishlist Page**
- **Purpose**: Allows students to manage their favorite tutors for future reference.
- **Key Functionalities**:
  - View the wishlist with detailed tutor information.
  - Add tutors to the wishlist using an API call.
  - Remove tutors from the wishlist via an API call.
- **Frontend Components**:
  - Dynamic wishlist rendering with a list of tutors.
  - Buttons for adding and removing tutors from the wishlist.
- **Backend Integration**:
  - `POST /students/wishlist/add/:studentId`: Add a tutor to the wishlist.
  - `DELETE /students/wishlist/remove/:studentId`: Remove a tutor from the wishlist.
  - `GET /students/wishlist/:studentId`: Fetch the student's wishlist.

---

### 3. **Completed Sessions and Reviews**
- **Purpose**: Allows students to view completed sessions and submit reviews for tutors.
- **Key Functionalities**:
  - View all completed sessions with tutor and subject details.
  - Submit reviews, including ratings and optional review text.
  - Display completed sessions dynamically with backend data.
- **Frontend Components**:
  - List of completed sessions with "Review" buttons.
  - Form for submitting reviews with rating selection and text area.
- **Backend Integration**:
  - `GET /students/sessions/completed/:studentId`: Fetch completed sessions.
  - `POST /students/reviews`: Submit a review for a session.
- **Database Schema**:
  ```javascript
  const ReviewSchema = new mongoose.Schema({
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String },
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
  }, { timestamps: true });
