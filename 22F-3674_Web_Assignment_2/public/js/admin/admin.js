document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/auth/login";
    return;
  }

  fetchAvailableCourses();
  const functionSelect = document.getElementById("functionSelect");
  const sections = document.querySelectorAll("section");

  // Hide all sections initially
  sections.forEach((section) => section.classList.add("hidden"));

  // Show the selected section
  functionSelect.addEventListener("change", () => {
    const selectedFunction = functionSelect.value;

    sections.forEach((section) => {
      if (section.id === selectedFunction) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
  });

  /**
   * Fetch all courses from the server
   */
  async function fetchCourses() {
    try {
      const response = await fetch("/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        displayCourses(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  /**
   * Render course list in the UI
   */
  function displayCourses(courses) {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    courses.forEach((course) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <span>${course.title} - Department: ${course.department}, Level: ${course.level}, Seats: ${course.seatsAvailable}</span>
            <button class="update-course" data-course-id="${course._id}">Update</button>
            <button class="delete-course" data-course-id="${course._id}">Delete</button>
        `;
      courseList.appendChild(li);
    });

    attachCourseEventListeners();
  }

  /**
   * Attach event listeners to course buttons dynamically
   */
  function attachCourseEventListeners() {
    // Attach update button listeners
    document.querySelectorAll(".update-course").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const courseId = e.target.getAttribute("data-course-id");
        await updateCourse(courseId);
      });
    });

    // Attach delete button listeners
    document.querySelectorAll(".delete-course").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const courseId = e.target.getAttribute("data-course-id");
        await deleteCourse(courseId);
      });
    });
  }

  /**
   * Add a new course
   */
  document
  .getElementById("addCourseForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const courseCode = document.getElementById("courseCode").value.trim();
    const title = document.getElementById("courseTitle").value.trim();
    const seats = parseInt(document.getElementById("courseSeats").value, 10);
    const department = document.getElementById("courseDepartment").value.trim();
    const level = parseInt(document.getElementById("courseLevel").value, 10);
    const prerequisites = Array.from(
      document.getElementById("coursePrerequisites").selectedOptions
    ).map((option) => option.value); // Get selected prerequisites as an array of IDs

    // Client-side validation
    if (!courseCode || !title || !seats || !department || !level) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is available
        },
        body: JSON.stringify({
          courseCode,
          title,
          seatsAvailable: seats,
          department,
          level,
          prerequisites,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Reset form and refetch courses
        
        document.getElementById("addCourseForm").reset();
        fetchCourses(); // Refresh course list
        fetchAvailableCourses();
        alert("Course added successfully!");
      } else {
        alert(`Error: ${data.message}`);
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });


  /**
   * Fetch all available courses to populate prerequisites dropdown
   */
  async function fetchAvailableCourses() {
    const prerequisitesDropdown = document.getElementById(
      "coursePrerequisites"
    );
    prerequisitesDropdown.innerHTML = ""; // Clear the dropdown before populating

    try {
      const response = await fetch("/admin/courses", {
        headers: { Authorization: `Bearer ${token}` }, // Ensure token is included
      });

      const courses = await response.json();
      if (response.ok) {
        courses.forEach((course) => {
          const option = document.createElement("option");
          option.value = course._id;
          option.textContent = `${course.title} (${course.courseCode})`;
          prerequisitesDropdown.appendChild(option);
        });
      } else {
        console.error("Error fetching available courses:", courses.message);
      }
    } catch (error) {
      console.error("Error fetching available courses:", error);
      alert("Failed to fetch available courses. Please try again.");
    }
  }

  /**
   * Update course details
   */
  async function updateCourse(courseId) {
    const newSeats = prompt("Enter new number of seats:");
    if (!newSeats) return;

    try {
      const response = await fetch(`/admin/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatsAvailable: newSeats }),
      });

      const data = await response.json();
      if (response.ok) {
        fetchCourses();
        alert("Course updated successfully!");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  }

  /**
   * Delete a course
   */
  async function deleteCourse(courseId) {
    try {
      const response = await fetch(`/admin/courses/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        fetchCourses();
        alert("Course deleted successfully!");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }

  /**
   * Fetch all students
   */
  async function fetchStudents() {
    try {
      const response = await fetch("/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        displayStudents(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  /**
   * Render student list in the UI
   */
  function displayStudents(students) {
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    students.forEach((student) => {
      const li = document.createElement("li");
      li.textContent = `${student.name} - Roll Number: ${student.rollNumber}`;
      studentList.appendChild(li);
    });
  }

  /**
   * Override student registration
   */
  document
    .getElementById("overrideRegistrationForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const studentId = document.getElementById("studentId").value;
      const courseId = document.getElementById("courseId").value;

      try {
        const response = await fetch("/admin/override-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ studentId, courseId }),
        });

        const data = await response.json();
        if (response.ok) {
          fetchStudents();
          fetchCourses();
          alert("Registration overridden successfully!");
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error overriding registration:", error);
      }
    });

  /**
   * Logout functionality
   */
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    localStorage.clear(); // Clear stored data
    window.location.href = "/auth/login"; // Redirect to login
  });

  // Initial Fetches
  fetchCourses();
  fetchStudents();
});
