$(document).ready(function () {
  const token = localStorage.getItem('token');
  if (!token) {
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
        if (xhr.status === 401 || xhr.status === 403) {
          localStorage.removeItem('token');
          window.location.href = 'login.html';
        }
      },
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'dob' },
      { data: 'mobile' },
      { data: 'email' },
      {
        data: null,
        render: function (data, type, row) {
          return '<button class="btn btn-danger btn-sm delete-student" data-id="' + row.id + '">X</button>';
        }
      }
    ],
  });

  // Handle delete student click
  $('#studentTable').on('click', '.delete-student', function () {
    const studentId = $(this).data('id');
    if (confirm('Are you sure you want to delete this student?')) {
      $.ajax({
        url: `${BACKEND_API_BASE_URL}/api/students/${studentId}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        success: function () {
          table.ajax.reload();
        },
        error: function (err) {
          const errorMessage = err.responseText || 'An unknown error occurred';
          console.error('Delete student error:', errorMessage);
          alert('Failed to delete student: ' + errorMessage);
          if (err.status === 401 || err.status === 403) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
          }
        },
      });
    }
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