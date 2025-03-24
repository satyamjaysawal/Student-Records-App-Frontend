$(document).ready(function () {
  const BACKEND_API_BASE_URL = 'http://localhost:5000'; // Hardcoded for static files
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
        console.error('DataTables AJAX error:', xhr.status, xhr.responseText);
        alert('Failed to load students: ' + xhr.responseText);
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
        console.error('Add student error:', err.responseText);
        alert('Failed to add student: ' + err.responseText);
      },
    });
  });
});