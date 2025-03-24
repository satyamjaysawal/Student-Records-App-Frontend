$(document).ready(function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html'; // Redirect to login if not logged in
    return;
  }
  console.log('Using token:', token); // Debug token

  const table = $('#marksTable').DataTable({
    ajax: {
      url: `${BACKEND_API_BASE_URL}/api/students/marks`,
      headers: { Authorization: `Bearer ${token}` },
      dataSrc: '',
      error: function (xhr, error, thrown) {
        const errorMessage = xhr.responseText || 'An unknown error occurred';
        console.error('DataTables AJAX error:', xhr.status, errorMessage, thrown);
        alert('Failed to load marks: ' + errorMessage);
        if (xhr.status === 401 || xhr.status === 403) { // Unauthorized or Forbidden
          localStorage.removeItem('token'); // Clear invalid token
          window.location.href = 'login.html'; // Redirect to login
        }
      },
    },
    columns: [
      { data: 'student_id' },
      { data: 'name' },
      { data: 'semester_id' },
      { data: 'subject_name' },
      {
        data: null,
        render: function (data, type, row) {
          return `${row.marks_obtained} / ${row.total_marks}`;
        }
      },
    ],
  });

  $('#markForm').submit(function (e) {
    e.preventDefault();
    const mark = {
      student_id: $('#student_id').val(),
      semester_id: $('#semester_id').val(),
      subject_name: $('#subject_name').val(),
      marks_obtained: $('#marks_obtained').val(),
      total_marks: $('#total_marks').val() || 100,
    };

    $.ajax({
      url: `${BACKEND_API_BASE_URL}/api/students/marks`,
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      data: JSON.stringify(mark),
      contentType: 'application/json',
      success: function () {
        table.ajax.reload();
        $('#markForm')[0].reset();
      },
      error: function (err) {
        const errorMessage = err.responseText || 'An unknown error occurred';
        console.error('Add mark error:', errorMessage);
        alert('Failed to add mark: ' + errorMessage);
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('token');
          window.location.href = 'login.html';
        }
      },
    });
  });
});