(function($){



/*Liaison au serveur*/
	var socket=io.connect();

//Souris
	
    var doc = $(document),
        win = $(window);

	var lastEmit = $.now();
	
    // Generate an unique ID
    var id = Math.round($.now()*Math.random());


    var clients = {};
    var cursors = {};	
	
	doc.on('mousemove',function(e){
        if($.now() - lastEmit > 30){
            socket.emit('mousemove',{
                'x': e.pageX/*/screen.width*/,
                'y': e.pageY/*/screen.height*/,
                'id': id
            });
            lastEmit = $.now();
		}
    });
	
    socket.on('moving', function (data) {

        if(! (data.id in clients)){
            // a new user has come online. create a cursor for them
            cursors[data.id] = $('<div id="'+data.id+'" class="cursor">').appendTo('#cursors');
        }

        // Move the mouse pointer
        cursors[data.id].css({
            'left' : data.x/**screen.width*/,
            'top' : data.y/*screen.height*/
        });


        // Saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });
	
	socket.on('suppression', function(data){
		$('#'+data.id).remove();
		delete cursors[data.id];
		
	});

	


})(jQuery);