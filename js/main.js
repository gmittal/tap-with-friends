 var urlChunks = window.location.pathname;
 var room;

 if (urlChunks.substring(urlChunks.length-1) === "/") {
    room = urlChunks.substring(1, urlChunks.length-1);
 } else {
    room = urlChunks.substring(1, urlChunks.length);
 }

 $(".tapRoom").text("#"+room);
 $("title").text("#"+room);


 var taps = 0;

 function tap() {
    taps += 1;
    socket.emit('taps', { 'taps': '1', 'name': room });

 }

 $("#tapper").click(function() {
    tap();
    
 });

 function updateDisplay(data) {
    $("#numTaps").text(data);
 }






//  var elm = document.body; // or some selection of the element you want to disable

// var catcher = function(evt) {
//     if (evt.touches.length < 2)
//         evt.preventDefault();
// };

// elm.addEventListener('touchstart', catcher, true);




  var socket = io('http://yo.ngrok.com');

  socket.on(room, function (data) {
    console.log(data);
    updateDisplay(numeral(data.taps).format('0,0'));
    
  });
