$(document).ready(function () {
  const BACKEND_API_BASE_URL = 'http://localhost:5000'; // Hardcoded for static files
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first');
    window.location.href = 'login.html';
    return;
  }

  const table = $('#marksTable').DataTable({
    ajax: {
      url: `${BACKEND_API_BASE_URL}/api/students/marks`,
      headers: { Authorization: `Bearer ${token}` },
      dataSrc: '',
      error: function (xhr, error, thrown) {
        console.error('DataTables AJAX error:', xhr.status, xhr.responseText);
        alert('Failed to load marks: ' + xhr.responseText);
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
        console.error('Add mark error:', err.responseText);
        alert('Failed to add mark: ' + err.responseText);
      },
    });
  });
});