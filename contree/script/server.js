var http=require('http');
var fs = require('fs');


httpServer=http.createServer(function(request,response){
	console.log('page chargee');
	fs.readFile('C://prog/html/index.html', function (err, html) {
    if (err) {
        throw err; 
    }  
	response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(html);  
    response.end();  
	});
});
httpServer.listen(7780);
var io=require('socket.io').listen(httpServer);

var users={};
var messages = [];
var limitemessages = 25;

io.sockets.on('connection',function(socket){
	console.log('New user');
	var me=false;
	
	for(var k in users){
		socket.emit('newuser', users[k]);
	}
	for(var k in messages){
		socket.emit('newmsg', messages[k]);
	}
	
	socket.on('login',function(user){
		me=user;
		console.log(me);
		me.id=user.username;
		me.avatar=user.url;
		socket.emit('logged');
		users[me.id]=me;
		io.sockets.emit('newuser',me);
	});
	
	socket.on('disconnect', function(){
		if(!me){return false;}
		delete users[me.id];
		io.sockets.emit('disuser',me);
	});
	
	
	
	
	socket.on('newmsg', function(message){
		message.user = me;
		
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		if (message.m<10){message.m='0'+message.m;}
		//ne marche pas
		
		messages.push(message);
		io.sockets.emit('newmsg',message);
		if(messages.length>limitemessages){messages.shift();}
		console.log(message);
	});
	
});