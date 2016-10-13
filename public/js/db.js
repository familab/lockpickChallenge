$(document).ready(function()
{
  $.ajax({
    url: "/db/people",
    type: "GET",
    dataType:"json",
    success: function (response)
    {
      var trHTML = '';
      $.each(response, function (key,value) {
         trHTML +=
            '<tr><th scope="row">' + value.id +
            '</th><td>' + value.name +
            '</td><td>' + value.contact +
            '</td><td>' + '<button data-id="' + value.id + '" data-name="' + value.name + '" data-contact="' + value.contact + '" class="editPerson btn btn-primary">Edit</button>' + ' <button data-id="' + value.id + '" class="deletePerson btn btn-warning">Delete</button>' +
            '</td></tr>';
      });

      $('#peopleTable tbody').append(trHTML);

      $('.editPerson').click(function() {
          var id = $(this).data('id');
          var name = $(this).data('name');
          var contact = $(this).data('contact');

          $('#editPersonName').val(name);
          $('#editPersonContact').val(contact);
          $('#editPersonId').val(id);
          $('#editPersonOldId').val(id);
          $('#editPerson').modal('show');
      });

      $('.deletePerson').click(function() {
        var id = $(this).data('id');
        $.ajax({
          url: "/db/people/" + id,
          type: "DELETE",
          success: function (response)
          {
            location.reload();
          }
        });
      });
    }
  });

  $('#purgePeople').click(function() {
    $.ajax({
      url: "/db/people",
      type: "DELETE",
      success: function (response)
      {
        location.reload();
      }
    });
  });

  $('#addPerson').click(function() {
    $('#editPersonName').val('');
    $('#editPersonContact').val('');
    $('#editPersonId').val('');
    $('#editPersonOldId').val('');
    $('#editPerson').modal('show');
  });

  $('#editPerson button[type="submit"]').click(function() {
    var id = $('#editPersonOldId').val();
    var url = '/db/people';
    var type = 'POST';

    if (id) {
      url = url + '/' + id;
      type = 'PUT';
    }

    $.ajax({
      url: url,
      type: type,
      data: {
        name: $('#editPersonName').val(),
        contact: $('#editPersonContact').val(),
        id: $('#editPersonId').val(),
        gotit: true
      },
      success: function (response)
      {
        location.reload();
      }
    });
  });
});

$(document).ready(function()
{
  $.ajax({
    url: "/db/score",
    type: "GET",
    dataType:"json",
    success: function (response)
    {
      var trHTML = '';
      $.each(response, function (key,value) {
         trHTML +=
            '<tr><th scope="row">' + value.id +
            '</th><td>' + value.time +
            '</td><td>' + value.person +
            '</td><td>' + '<button data-id="' + value.id + '" data-time="' + value.time + '" data-person="' + value.person + '" class="editScore btn btn-primary">Edit</button>' + ' <button data-id="' + value.id + '" class="deleteScore btn btn-warning">Delete</button>' +
            '</td></tr>';
      });

      $('#scoreTable tbody').append(trHTML);

      $('.editScore').click(function() {
          var id = $(this).data('id');
          var time = $(this).data('time');
          var person = $(this).data('person');

          $('#editScoreTime').val(time);
          $('#editScorePerson').val(person);
          $('#editScoreId').val(id);
          $('#editScoreOldId').val(id);
          $('#editScore').modal('show');
      });

      $('.deleteScore').click(function() {
        var id = $(this).data('id');
        $.ajax({
          url: "/db/score/" + id,
          type: "DELETE",
          success: function (response)
          {
            location.reload();
          }
        });
      });
    }
  });

  $('#purgeScore').click(function() {
    $.ajax({
      url: "/db/score",
      type: "DELETE",
      success: function (response)
      {
        location.reload();
      }
    });
  });

  $('#addScore').click(function() {
    $('#editScoreTime').val('');
    $('#editScorePerson').val('');
    $('#editScoreId').val('');
    $('#editScoreOldId').val('');
    $('#editScore').modal('show');
  });

  $('#editScore button[type="submit"]').click(function() {
    var id = $('#editScoreOldId').val();
    var url = '/db/score';
    var type = 'POST';

    if (id) {
      url = url + '/' + id;
      type = 'PUT';
    }

    $.ajax({
      url: url,
      type: type,
      data: {
        time: $('#editScoreTime').val(),
        person: $('#editScorePerson').val(),
        id: $('#editScoreId').val()
      },
      success: function (response)
      {
        location.reload();
      }
    });
  });
});
