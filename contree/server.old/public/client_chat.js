(function($){



/*Liaison au serveur*/
	var socket=io.connect();



/*dernier utilisateur à avoir poster un message*/
	var lastuser=false;
	
	
/*Creation d'un profil*/
	var me;
/*Traitement du formulaire de login*/

	$('#loginform').submit(function(event){
		event.preventDefault();
		if($('#username').val()!=''){
			me={
				username : $('#username').val(),
				url : $('#url').val()
			};
			socket.emit('login',me);
		}else{
			alert('Veuillez entrer un pseudo.');
		}
	});
/*Disparition du div de login*/
	socket.on('logged',function(){
		$('#login').fadeOut("slow");
	})
	

/*Ajout de l'avatar du nouvel utilisateur*/
	socket.on('newuser',function(user){
		$('#users').append('<img src="'+user.avatar+'" id="'+user.id+'" style="width:64px; height:64px;"/>');
	})
/*Suppression de l'avatar*/
	socket.on('disuser', function(user){
		$('#'+user.id).remove();
	})

	
	
/*Emission du message client*/	
	$('#form').submit(function(event){
		event.preventDefault();
		socket.emit('newmsg',{message: $('#message').val()});
		$('#message').val('');
		$('#message').focus();
	})


/*Affichage du message serveur*/	
	socket.on('newmsg',function(message){
		
		if(lastuser != message.user.id){//Separation si le locuteur change
			$('#messages').append('<br><br><br><div class="message"><div class="info"><h3><strong>'+message.user.username+'<img src="'+message.user.avatar+'" class="avatar"></strong></h3>');
		}
		
		
		//if(message.user.id == me.username){//Class différentes pour l'utilisateur
			$('#messages').append('<div class="texto_d"><p style="color:grey;">'+message.message+'</p><span class="date" style="font-size:60%; color:grey; font-family:tahoma;">'+message.h+':'+message.m+'</span></div></div>');
		/*}else{
			$('#messages').append('<div class="texto_g"><p style="color:grey;">'+message.message+'</p><span class="date" style="font-size:60%; color:grey; font-family:tahoma;">'+message.h+':'+message.m+'</span></div></div>');
		}*/
		
		$(document).scrollTop($('#messages').height());

		
		lastuser=message.user.id;
	})

/*Lancement du quizz*/	
	$('#quizz').submit(function(event){
		event.preventDefault();
		socket.emit('quizz');
		
		$('#quizzbutton').attr('disabled','disabled');
		setTimeout(function(){$('#quizzbutton').removeAttr('disabled');},15*1000);
	})

	
	
/* afficher les smileys */
	var tab=[" :)"," :("," :P"," ;)"," :D"," :O"," 8)"," 8|"," >:("," :'("," 3:)"," O:)"," :*"," <3"," ^_^"," -_-"," O.o"," >o<"," :v"," :3"," :|]"," (^^^)",' <(")'," :putnam:"," :42:"," (Y)"," :poop:"];
	
	$('.smileys').append('');
	for(var i=0;i<27;i++){
		$('.smileys').append('<img class="lolclic" id="'+i+'" src="Images/smileys/'+(i+1)+'.png" />');
	};
 
	$('.lolclic').click(function(event){
		$('#message').val($('#message').val()+tab[$(this).attr("id")]); 
		$('#message').focus();
	});
	
	$('#lolipop').click(function(){
		$('.smileys').toggle(1000);
	});
	
	$('.smileys').hide();
	$('#message').resizable();
	$( ".draggable" ).draggable();
		

})(jQuery);