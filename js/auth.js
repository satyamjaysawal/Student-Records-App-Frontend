$(document).ready(function () {
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
        const errorMessage = err.responseText || 'An unknown error occurred';
        console.error('Register error:', errorMessage);
        alert('Registration failed: ' + errorMessage);
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
        const errorMessage = err.responseText || 'An unknown error occurred';
        console.error('Login error:', errorMessage);
        alert('Login failed: ' + errorMessage);
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
        const errorMessage = err.responseText || 'An unknown error occurred';
        console.error('Logout error:', errorMessage);
        alert('Logout failed: ' + errorMessage);
      },
    });
  });
});