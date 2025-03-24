$(document).ready(function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html'; // Redirect to login if not logged in
    return;
  }

  const table = $('#studentTable').DataTable({
    ajax: {
      url: `${BACKEND_API_BASE_URL}/api/students`,
      headers: { Authorization: `Bearer ${token}` },
      dataSrc: '',
      error: function (xhr, error, thrown) {
        const errorMessage = xhr.responseText || 'An unknown error occurred';
        console.error('DataTables AJAX error:', xhr.status, errorMessage, thrown);
        alert('Failed to load students: ' + errorMessage);
        if (xhr.status === 401 || xhr.status === 403) { // Unauthorized or Forbidden
          localStorage.removeItem('token'); // Clear invalid token
          window.location.href = 'login.html'; // Redirect to login
        }
      },
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'dob' },
      { data: 'mobile' },
      { data: 'email' },
    ],
  });

  $('#studentForm').submit(function (e) {
    e.preventDefault();
    const student = {
      name: $('#name').val(),
      dob: $('#dob').val(),
      mobile: $('#mobile').val(),
      email: $('#email').val(),
    };

    $.ajax({
      url: `${BACKEND_API_BASE_URL}/api/students`,
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      data: JSON.stringify(student),
      contentType: 'application/json',
      success: function () {
        table.ajax.reload();
        $('#studentForm')[0].reset();
      },
      error: function (err) {
        const errorMessage = err.responseText || 'An unknown error occurred';
        console.error('Add student error:', errorMessage);
        alert('Failed to add student: ' + errorMessage);
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('token');
          window.location.href = 'login.html';
        }
      },
    });
  });
});