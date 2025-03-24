$(document).ready(function () {
  // BACKEND_API_BASE_URL is now from config.js
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first');
    window.location.href = 'login.html';
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
      },
    });
  });
});