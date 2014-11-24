



/*Creation d'une liste d'utilisateur
  Et d'une pile de message de taille choisie */
var users={};
var messages = [];
var limitemessages = 25;







io.sockets.on('connection',function(socket){


/*Creation d'un BOT*/
var bot={};
bot.username= 'Bohot';
bot.url='http://nakedfeet.free.fr/irma/picts/250px-Vishnu[1].jpg';
bot.id=bot.username;
bot.avatar=bot.url;

/*Fonction message BOT*/
function messagebot(string){
			var mess={};
			mess.user = bot;
			date = new Date();
			mess.h = date.getHours();
			mess.m = date.getMinutes();
			mess.message=string;
			messages.push(mess);
			io.sockets.emit('newmsg',mess);
};
//Fonction message BOT à une seule personne
function messagebotsolo(string){
			var mess={};
			mess.user = bot;
			date = new Date();
			mess.h = date.getHours();
			mess.m = date.getMinutes();
			mess.message=string;
			messages.push(mess);
			socket.emit('newmsg',mess);
};





/*Nouvelle connexion*/
	console.log('New user'.green);
	var me=false;
	
/*Affiche les utilisateurs deja presents*/
	for(var k in users){
		socket.emit('newuser', users[k]);
	}
/*Affiche les messages deja envoyés*/
	for(var k in messages){
		socket.emit('newmsg', messages[k]);
	}
	
/*Connexion au chat, ajout à la liste des utilisateurs.*/
	socket.on('login',function(user){
		me=user;
		console.log(me);
		me.id=user.username;
		me.avatar=user.url;
		socket.emit('logged');
		users[me.id]=me;
		io.sockets.emit('newuser',me);
/*Message d'accueil*/
		messagebotsolo("Je suis bohot, le bot, hot !");
	});

	
	
	
/*Deconnexion du chat, suppression de la liste des utilisateurs*/
	socket.on('disconnect', function(){
		if(!me){return false;}
		delete users[me.id];
		io.sockets.emit('disuser',me);
	});
	

	
/*Reception d'un message client, traitement, renvoi d'un message serveur*/
	socket.on('newmsg', function(message){
		message.user = me;
		
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		
		messages.push(message);
		
		io.sockets.emit('newmsg',message);
		
		if(messages.length>limitemessages){messages.shift();}
		
		console.log([message.user.username,message.message].toString().red);
	});

	
/*Lancement du quizz*/
	socket.on('quizz', function(){
		console.log('Attention debut du quizz'.cyan);
		
		var parser= new xml2js.Parser();
		fs.readFile(__dirname + '/public/' + 'quizz.xml', function(err, data) {
			parser.parseString(data, function (err, result) {
			console.log(result.xml.question[0]._[0]);
			console.log('Done');
			
			var n=result.xml.nombre[0];
			var rand=Math.floor(Math.random()*n);
			
			var tableau=result.xml.question[rand]._.split(",");
			var question=tableau[0];
			var reponse=tableau[1];
			
			var repondu=0;

			
			messagebot("Vous avez 10 secondes pour répondre à la question : "+question);
			

			
			
			});
		});
	});
	

	
});

io.sockets.on('newmsg', function(message){
			console.log('test'.blue);
			if(message.message==reponse){
				
			console.log('bonne réponse !'.cyan);
			messagebot("Bravo, "+message.user.id+", tu as correctement répondu !");
			repondu=1;
			}else{
			messagebot("Réfléchis un peu bon sang!");
			}
					
});

io.sockets.on('connection',function(socket){


		    // Start listening for mouse move events
    socket.on('mousemove', function (data) {
        // This line sends the event (broadcasts it)
        // to everyone except the originating client.
        socket.broadcast.emit('moving', data);
    });
	
	
});
	

