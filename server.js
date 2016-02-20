var fs = require('fs');
var express = require('express');

var app = express();
app.use('/', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/cards.json', function(request, response) {
  fs.readFile('cards.json', function(error, data) {
    response.send(data.toString());
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
