// document.addEventListener('DOMContentLoaded', () => {
//     const roleSelect = document.getElementById('role');
//     const passwordField = document.getElementById('password');
//     const passwordLabel = document.getElementById('passwordLabel');
//     const loginForm = document.getElementById('loginForm');
//     const errorMessage = document.getElementById('errorMessage');

//     // Show password field only for admin login
//     roleSelect.addEventListener('change', () => {
//         if (roleSelect.value === 'admin') {
//             passwordField.style.display = 'block';
//             passwordLabel.style.display = 'block';
//         } else {
//             passwordField.style.display = 'none';
//             passwordLabel.style.display = 'none';
//         }
//     });

//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const role = roleSelect.value;
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         const endpoint = role === 'admin' ? '/auth/admin-login' : '/auth/student-login';
//         const body = role === 'admin' ? { username, password } : { rollNumber: username };

//         try {
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(body)
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem('token', data.token);
//                 localStorage.setItem('user', JSON.stringify(data));

//                 window.location.href = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
//             } else {
//                 errorMessage.textContent = data.message;
//             }
//         } catch (error) {
//             errorMessage.textContent = 'An error occurred. Please try again.';
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    const roleSelect = document.getElementById('role');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const role = roleSelect.value; // Get selected role: admin or student
        const username = document.getElementById('username').value; // Username (rollNumber for students)
        const password = document.getElementById('password').value; // Password for both roles

        // Define the endpoint based on role
        const endpoint = role === 'admin' ? '/auth/admin-login' : '/auth/student-login';

        // Create body for the API request
        const body = { username, password }; // Unified username and password for both roles

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token and user details in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.id);

                // Redirect to the appropriate dashboard based on role
                window.location.href = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
            } else {
                // Display error message returned by the server
                errorMessage.textContent = data.message || 'Login failed. Please check your credentials.';
            }
        } catch (error) {
            // Display a generic error message for server issues
            errorMessage.textContent = 'An error occurred. Please try again later.';
            console.error('Error:', error);
        }
    });
});
