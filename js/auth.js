$(document).ready(function () {
  // const BACKEND_API_BASE_URL = 'http://localhost:5000'; 
  const BACKEND_API_BASE_URL = 'https://student-records-app-backend.vercel.app'; 

  $('#registerForm')?.submit(function (e) {
    e.preventDefault();
    const username = $('#regUsername').val();
    const password = $('#regPassword').val();

    $.ajax({
      url: `${BACKEND_API_BASE_URL}/api/auth/register`,
      method: 'POST',
      data: JSON.stringify({ username, password }),
      contentType: 'application/json',
      success: function () {
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
      },
      error: function (err) {
        console.error('Register error:', err.responseText);
        alert('Registration failed: ' + err.responseText);
      },
    });
  });

  $('#loginForm')?.submit(function (e) {
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

    $.ajax({
      url: `${BACKEND_API_BASE_URL}/api/auth/login`,
      method: 'POST',
      data: JSON.stringify({ username, password }),
      contentType: 'application/json',
      success: function (response) {
        console.log('Token received:', response.token);
        localStorage.setItem('token', response.token);
        window.location.href = 'index.html';
      },
      error: function (err) {
        console.error('Login error:', err.responseText);
        alert('Login failed: ' + err.responseText);
      },
    });
  });

  $('#logoutButton')?.click(function () {
    $.ajax({
      url: `${BACKEND_API_BASE_URL}/api/auth/logout`,
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      success: function () {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
      },
      error: function (err) {
        console.error('Logout error:', err.responseText);
        alert('Logout failed: ' + err.responseText);
      },
    });
  });
});