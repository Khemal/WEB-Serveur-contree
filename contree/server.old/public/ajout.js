(function($){



/*Liaison au serveur*/
	var socket=io.connect();

$('#out').submit(function(event){
		event.preventDefault();
		var out={
			question : $('#question').val(),
			reponse : $('#reponse').val(),
			commentaire : $('#commentaire').val()
		};
		socket.emit('out',out);
		
		$('#question').val('');
		$('#reponse').val('');
		$('#commentaire').val('');
	});


})(jQuery);