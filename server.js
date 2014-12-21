var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('mongodb://107.170.245.170:27000', ['global']);

var port = 5000;


app.use(express.static(__dirname + ""));

app.use(function(req, res, next) {
  if (/\/hidden\/*/.test(req.path)) {
    return res.send(404, "Not Found"); // or 403, etc
  }
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/:tap_party_name', function (req, res) {
	console.log(req.param("tap_party_name").toLowerCase());
	var id = req.param("tap_party_name").toLowerCase();

	db.global.save({'id': id, 'taps': 0});

  res.sendFile(__dirname + '/tap.html');

  totalTaps

});


var io = require('socket.io').listen(app.listen(process.env.PORT || port));

var totalTaps = 0;

                  

io.on('connection', function (socket) {
	// totalTaps.push()
  

  socket.on('taps', function (data) {
    // console.log(data);
    totalTaps += 1;


    

  });

  setInterval(function() { socket.emit('totalTaps', {taps: totalTaps}); }, 1);



});




