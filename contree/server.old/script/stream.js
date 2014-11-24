var http = require('http'),
    fileSystem = require('fs'),
    path = require('path'),
    util = require('util'),
	sys=require('sys'),
	url=require('url');

http.createServer(function(request, response) {

var defaults = {
    watch : 'default_video.avi',
    foo : 'default value',
    bar : 'default.value'
};

var url_parts = url.parse(request.url, true);
console.log(url_parts.query['watch']);

movie=url_parts.query['watch'];
if(movie==undefined){movie="jgo.avi";}
switch(url_parts.pathname) {
case '/':
sys.puts("display root");
break;
case '/create':
sys.puts("display create");
break;
case '/edit':
sys.puts("display edit");
break;
default:
sys.puts("oh dear, 404");
}


    var filePath = path.join(__dirname, 'avi/'+movie);
	console.log(filePath);
    var stat = fileSystem.statSync(filePath);
	console.log("nouveau stream pour :" +request.connection.remoteAddress);

    response.writeHead(200, {
        'Content-Type': 'video/mpeg',
        'Content-Length': stat.size
    });console.log('stat size  : '+stat.size);

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to util.pump()
    util.pump(readStream, response);
})
.listen(7780,"192.168.1.84");
console.log("listening 7780");