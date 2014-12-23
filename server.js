var express = require('express');
var app = express();

// var mongojs = require('mongojs');
// var db = mongojs('mongodb://107.170.245.170:27000', ['global']);
var Firebase = require('firebase');

var port = 5000;

var globalDB = new Firebase("https://tap-78901.firebaseio.com/");

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



	  res.sendFile(__dirname + '/tap.html');


});


var io = require('socket.io').listen(app.listen(process.env.PORT || port));

var totalTaps = 0;

                  

io.on('connection', function (socket) {

  socket.on('taps', function (data) {

    var roomName = data.name;
    var json={};
    var db1 = new Firebase("https://tap-78901.firebaseio.com/"+data.name+"/"+data.name);
    var db2 = new Firebase("https://tap-78901.firebaseio.com/"+data.name);
    db1.once('value', function (snap) {
    	

    	if (snap.val() != null) {
    		var integerVal = parseInt(snap.val(), 10);
	    	
	    	json[roomName] =  integerVal+= 1;
    	} else {
    		json[roomName] = 1;
    	}

    	    db2.set(json, function() {

		    });;
    	
    });


    

  });


  setInterval(function() {

  		  	globalDB.once('value', function (snapshot) {
  	

				snapshot.forEach(function (data1) {
			
					socket.emit(data1.key(), {taps: data1.val()[data1.key()]});
				});

			});
  }, 50);


});


console.log('Listening on port ' + port);
