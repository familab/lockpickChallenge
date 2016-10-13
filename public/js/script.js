var socket = io.connect();

var people = [];
var scores = [];

socket.on('emergencyButton', function (data) {
  console.log('emergencyButton', data);
});
socket.on('startButton', function (data) {
  console.log('startButton', data);
});
socket.on('door1', function (data) {
  console.log('door1', data);
});
socket.on('door2', function (data) {
  console.log('door2', data);
});
socket.on('door3', function (data) {
  console.log('door3', data);
});
socket.on('updatePeople', function () {
  socket.emit('getPeople');
});
socket.on('updateScores', function () {
  socket.emit('getScores');
});
socket.on('people', function (data) {
  people = data;
});
socket.on('scores', function (data) {
  scores = data;
});

$('a[data-toggle="tab"]').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
  $(e.target).addClass('bg-inverse');
  $(e.relatedTarget).removeClass('bg-inverse');
})
