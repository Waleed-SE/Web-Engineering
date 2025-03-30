// document.addEventListener('DOMContentLoaded', async () => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('user'); // Store the student ID in localStorage during login

//     // Redirect to login if token or userId is missing
//     if (!token || !userId) {
//         window.location.href = '/auth/login';
//         return;
//     }

//     // Function to fetch student details
//     async function fetchStudentData() {
//         try {
//             console.log(userId)
//             const response = await fetch(`/students/${userId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch student data');
//             }

//             const student = await response.json();
//             document.getElementById('studentName').textContent = student.name;
//             document.getElementById('studentRollNumber').textContent = student.rollNumber;

//             displayRegisteredCourses(student.registeredCourses);
//         } catch (error) {
//             console.error(error);
//             alert('Error loading student data. Please try again later.');
//         }
//     }

//     // Function to display registered courses
//     function displayRegisteredCourses(courses) {
//         const courseList = document.querySelector('#registered-courses ul');
//         const noCoursesMessage = document.getElementById('noCoursesMessage');
//         courseList.innerHTML = '';

//         if (courses.length === 0) {
//             noCoursesMessage.style.display = 'block';
//         } else {
//             noCoursesMessage.style.display = 'none';
//             courses.forEach((course) => {
//                 const li = document.createElement('li');
//                 li.innerHTML = `
//                     ${course.title} - ${course.department}
//                     <button class="drop-course" data-course-id="${course._id}">Drop</button>
//                 `;
//                 courseList.appendChild(li);
//             });

//             // Attach event listeners to drop buttons
//             document.querySelectorAll('.drop-course').forEach((button) => {
//                 button.addEventListener('click', async (e) => {
//                     const courseId = e.target.getAttribute('data-course-id');
//                     await dropCourse(courseId);
//                 });
//             });
//         }
//     }

//     // Function to drop a course
//     async function dropCourse(courseId) {
//         try {
//             const response = await fetch(`/students/drop-course`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ studentId: userId, courseId }),
//             });

//             if (!response.ok) {
//                 const error = await response.json();
//                 alert(error.message || 'Failed to drop course');
//                 return;
//             }

//             alert('Course dropped successfully!');
//             fetchStudentData(); // Refresh registered courses
//         } catch (error) {
//             console.error(error);
//             alert('Error dropping the course.');
//         }
//     }

//     // Function to register a course
//     async function registerCourse(courseId) {
//         try {
//             const response = await fetch(`/students/register-course`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ studentId: userId, courseId }),
//             });

//             if (!response.ok) {
//                 const error = await response.json();
//                 alert(error.message || 'Failed to register for course');
//                 return;
//             }

//             alert('Course registered successfully!');
//             fetchStudentData(); // Refresh registered courses
//         } catch (error) {
//             console.error(error);
//             alert('Error registering for the course.');
//         }
//     }

//     // Function to fetch available courses
//     async function fetchAvailableCourses() {
//         try {
//             const response = await fetch('/admin/courses', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch available courses');
//             }

//             const courses = await response.json();
//             displayAvailableCourses(courses);
//         } catch (error) {
//             console.error(error);
//             alert('Error loading available courses. Please try again later.');
//         }
//     }

//     // Function to display available courses
//     function displayAvailableCourses(courses) {
//         const courseList = document.querySelector('#available-courses ul');
//         const noAvailableCoursesMessage = document.getElementById('noAvailableCoursesMessage');
//         courseList.innerHTML = '';

//         if (courses.length === 0) {
//             noAvailableCoursesMessage.style.display = 'block';
//         } else {
//             noAvailableCoursesMessage.style.display = 'none';
//             courses.forEach((course) => {
//                 const li = document.createElement('li');
//                 li.innerHTML = `
//                     ${course.title} - ${course.department} (${course.schedule.days.join(', ')} - ${course.schedule.time})
//                     <p>Seats Available: ${course.seatsAvailable}</p>
//                     <button class="register-course" data-course-id="${course._id}">Register</button>
//                 `;
//                 courseList.appendChild(li);
//             });

//             // Attach event listeners to register buttons
//             document.querySelectorAll('.register-course').forEach((button) => {
//                 button.addEventListener('click', async (e) => {
//                     const courseId = e.target.getAttribute('data-course-id');
//                     await registerCourse(courseId);
//                 });
//             });
//         }
//     }

//     // Logout functionality
//     document.getElementById('logoutButton').addEventListener('click', () => {
//         localStorage.clear();
//         window.location.href = '/auth/login';
//     });

//     // Initialize dashboard data
//     fetchStudentData();
//     fetchAvailableCourses();
// });

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user"); // Store the student ID in localStorage during login

  // Redirect to login if token or userId is missing
  if (!token || !userId) {
    window.location.href = "/auth/login";
    return;
  }

  // Function to fetch student details
  async function fetchStudentData() {
    try {
      const response = await fetch(`/students/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const student = await response.json();
      document.getElementById("studentName").textContent = student.name;
      document.getElementById("studentRollNumber").textContent =
        student.rollNumber;

      displayRegisteredCourses(student.registeredCourses);
      displayPassedCourses(student.passedCourses);
    } catch (error) {
      console.error(error);
      alert("Error loading student data. Please try again later.");
    }
  }

  // Function to display registered courses
  function displayRegisteredCourses(courses) {
    const courseList = document.querySelector("#registered-courses ul");
    const noCoursesMessage = document.getElementById("noCoursesMessage");
    courseList.innerHTML = "";

    if (courses.length === 0) {
      noCoursesMessage.style.display = "block";
    } else {
      noCoursesMessage.style.display = "none";
      courses.forEach((course) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    ${course.title} - ${course.department}
                    <button class="drop-course" data-course-id="${course._id}">Drop</button>
                    <button class="complete-course" data-course-id="${course._id}">Complete</button>
                `;
        courseList.appendChild(li);
      });

      // Attach event listeners to drop and complete buttons
      document.querySelectorAll(".drop-course").forEach((button) => {
        button.addEventListener("click", async (e) => {
          const courseId = e.target.getAttribute("data-course-id");
          await dropCourse(courseId);
        });
      });

      document.querySelectorAll(".complete-course").forEach((button) => {
        button.addEventListener("click", async (e) => {
          const courseId = e.target.getAttribute("data-course-id");
          await completeCourse(courseId);
        });
      });
    }
  }

  // Function to register a course
  async function registerCourse(courseId) {
    try {
      const response = await fetch(`/students/register-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentId: userId, courseId }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to register for course");
        return;
      }

      alert("Course registered successfully!");
      fetchStudentData(); // Refresh registered courses
    } catch (error) {
      console.error(error);
      alert("Error registering for the course.");
    }
  }

  // Function to display passed courses
  function displayPassedCourses(courses) {
    const passedCoursesList = document.querySelector("#passed-courses ul");
    const noPassedCoursesMessage = document.getElementById(
      "noPassedCoursesMessage"
    );
    passedCoursesList.innerHTML = "";

    if (courses.length === 0) {
      noPassedCoursesMessage.style.display = "block";
    } else {
      noPassedCoursesMessage.style.display = "none";
      courses.forEach((course) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    ${course.title} - ${course.department}
                `;
        passedCoursesList.appendChild(li);
      });
    }
  }

  // Function to drop a course
  async function dropCourse(courseId) {
    try {
      const response = await fetch(`/students/drop-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentId: userId, courseId }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to drop course");
        return;
      }

      alert("Course dropped successfully!");
      fetchStudentData(); // Refresh registered courses
    } catch (error) {
      console.error(error);
      alert("Error dropping the course.");
    }
  }

  // Function to complete a course
  async function completeCourse(courseId) {
    try {
      const response = await fetch(`/students/complete-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentId: userId, courseId }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to complete course");
        return;
      }

      alert("Course marked as complete!");
      fetchStudentData(); // Refresh registered and passed courses
    } catch (error) {
      console.error(error);
      alert("Error completing the course.");
    }
  }

  // Function to fetch available courses
  async function fetchAvailableCourses() {
    try {
      const response = await fetch("/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch available courses");
      }

      const courses = await response.json();
      displayAvailableCourses(courses);
    } catch (error) {
      console.error(error);
      alert("Error loading available courses. Please try again later.");
    }
  }

  // Function to display available courses
  function displayAvailableCourses(courses) {
    const courseList = document.querySelector("#available-courses ul");
    const noAvailableCoursesMessage = document.getElementById(
      "noAvailableCoursesMessage"
    );
    courseList.innerHTML = "";

    if (courses.length === 0) {
      noAvailableCoursesMessage.style.display = "block";
    } else {
      noAvailableCoursesMessage.style.display = "none";
      courses.forEach((course) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    ${course.title} - ${
          course.department
        } (${course.schedule.days.join(", ")} - ${course.schedule.time})
                    <p>Seats Available: ${course.seatsAvailable}</p>
                    <button class="register-course" data-course-id="${
                      course._id
                    }">Register</button>
                `;
        courseList.appendChild(li);
      });

      // Attach event listeners to register buttons
      document.querySelectorAll(".register-course").forEach((button) => {
        button.addEventListener("click", async (e) => {
          const courseId = e.target.getAttribute("data-course-id");
          await registerCourse(courseId);
        });
      });
    }
  }

  // Logout functionality
  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/auth/login";
  });

  // Initialize dashboard data
  fetchStudentData();
  fetchAvailableCourses();
});
