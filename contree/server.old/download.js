var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("file.png");
var request = http.get("http://www.gravatar.com/avatar/40bec8c5a2a804cc48ab9d8443592b90?r=pg&s=200.jpg&d=identicon", function(response) {
  response.pipe(file);
});