


io.sockets.on('connection',function(socket){


		    // Start listening for mouse move events
    socket.on('mousemove', function (data) {
		console.log("BOUGEZ BOUGEZ");
        // This line sends the event (broadcasts it)
        // to everyone except the originating client.
        socket.broadcast.emit('moving', data);
    });
	
	
});