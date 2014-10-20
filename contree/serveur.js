
var
xml2js = require('xml2js'); //Module pour le quizz
colors = require('colors'); //Module pour la couleur console
http = require('http'),
path = require('path'),
fs = require('fs');

//DEBUT CODAGE WEB SERVER
//Extensions supportées par le web server
extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
	".ico" : "image/x-icon"
};

function getFile(filePath,res,page404,mimeType){
    fs.exists(filePath,function(exists){
        //Si le fichier demandé existe
        if(exists){
            //Le lire
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    //Si il n'y a pas d'erreur on l'envoie
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    //Sinon message console
                    console.dir(err);
                };
            });
        } else {
            //Sinon, le fichier n'existe pas, erreur 404 de même
            fs.readFile(page404,function(err,contents){
                if(!err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        };
    });
};
 
//Trouve le chemin adequat
function requestHandler(req, res) {
    var
	folder,
    fileName = path.basename(req.url) || 'index.html',
    ext = path.extname(fileName),
    localFolder = __dirname + '/public/',
    page404 = localFolder + '404.html';
	
	if (req.url=="/"){folder='index.html'}else{folder=req.url}
 
	//console.log(req.url.replace(/^.*[\\\/]/,''));
	if(ext!='.png'){console.log(folder)};
    //l'extension est-elle bonne ?
    if(!extensions[ext]){
        //404 error
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html><head></head><body>The requested file type is not supported</body></html>");
    };
 //Choisir le fichier
    getFile((localFolder + folder),res,page404,extensions[ext]);
};
 
//Creer le serveur web
httpServer=http.createServer(requestHandler)
 
//sur le port 3000
.listen(3000);








/*Creation d'une liste d'utilisateur
  Et d'une pile de message de taille choisie */
var users={};
var messages = [];
var limitemessages = 25;

//Variables du quizz (globales)
var quizz=false,
	question,
	reponse,
	commentaire=" ",
	decompte;



var io=require('socket.io').listen(httpServer,{ log: false });


//chat
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
			mess.message=string.smileys();
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
			mess.message=string.smileys();
			socket.emit('newmsg',mess);
};

//Fonction affichage smileys
String.prototype.smileys= function(){
	var str=this;
	var smiley={
		enerve:['(>:\\(|>:\-\\(|>\.<)', '<img src="images/smileys/9.png">'], //avancé car incompatible avec triste !
		diable:['(3:\\)|3:\-\\))', '<img src="images/smileys/11.png">'], //incompatible avec :)
		ange:['(o:\\)|o:\-\\))', '<img src="images/smileys/12.png">'], //incompatible avec :)
		colere:['(>:o|>:\-o|>o<)', '<img src="images/smileys/18.png">'], //incompatible avec :o
		requin:['(\\(\\^\\^\\^\\))', '<img src="images/smileys/22.png">'],//incompatible avec ^^
		putnam:['(:putnam:)', '<img src="images/smileys/24.png">'], //incompatible avec :p
		poop:['(:poop:)', '<img src="images/smileys/27.png">'],//incompatible avec :p
		content:['(:\\)|:\-\\))', '<img src="images/smileys/1.png">'],
		triste:['(:\\(|:\-\\()', '<img src="images/smileys/2.png">'],
		langue:['(:p|:\-p)', '<img src="images/smileys/3.png">'],
		clin:['(;\\)|;\-\\))', '<img src="images/smileys/4.png">'],
		sourire:['(:d|:\-d)', '<img src="images/smileys/5.png">'],
		etonne:['(:o|:\-o)', '<img src="images/smileys/6.png">'],
		lunettes:['(8\\)|8\-\\))', '<img src="images/smileys/7.png">'],
		lunettes2:['(8\\||8\-\\|)', '<img src="images/smileys/8.png">'],
		pleure:['(:\'\\()', '<img src="images/smileys/10.png">'],
		bisou:['(:\\*|:\-\\*)', '<img src="images/smileys/13.png">'],
		coeur:['(<3)', '<img src="images/smileys/14.png">'],
		amuse:['(\\^_\\^|\\^\\^)', '<img src="images/smileys/15.png">'],
		blase:['(\-_\-)', '<img src="images/smileys/16.png">'],
		surpris:['(o\\.O)', '<img src="images/smileys/17.png">'],
		pacman:['(:v)', '<img src="images/smileys/19.png">'],
		chat:['(:3|:\-3)', '<img src="images/smileys/20.png">'],
		robot:['(:\\|\])', '<img src="images/smileys/21.png">'],
		manchot:['(<\\("\\))', '<img src="images/smileys/23.png">'],
		quarantedeux:['(:42:)', '<img src="images/smileys/25.png">'],
		jaime:['(\\(y\\))', '<img src="images/smileys/26.png">'],
		script:['(<script>|</script>)','<scrupt>'],//antiscript js
		klouk:['<klouk>','<script>'],
		klouk2:['</klouk>','</script>'] //secret script
	};
	for(var k in smiley){
		var reg = new RegExp(smiley[k][0], 'gi')
		str=str.replace(reg,smiley[k][1]);
	}
	return str;
};




/*Nouvelle connexion*/
	console.log('Nouvel Utilisateur'.green);
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
		messagebotsolo("Je suis bohot, le bot, hot ! :)");
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
		
		console.log([message.user.username,message.message].toString().red);
		
		messages.push(message);
		message.message=message.message.smileys();
		
		io.sockets.emit('newmsg',message);
		
		if(messages.length>limitemessages){messages.shift();}
		
		
		
		
		
		//Partie réponse quizz
		String.prototype.simplifier=function(){
			var articles= new RegExp ("(le|la|les|l'|du|des|un|une|ce|ces|cet|cette|ça|sa|ses|se|leur|leurs|nos|vos|au|aux|en| )",'gi');
			return this.toLowerCase().replace(/[ùûü]/g,"u").replace(/[îï]/g,"i").replace(/[àâä]/g,"a").replace(/[ôö]/g,"o").replace(/[éèêë]/g,"e").replace(/ç/g,"c").replace(articles,"");
		}
		if(quizz==true && message.message.simplifier()==reponse.simplifier()){
			messagebot("Bravo "+message.user.username+" ! La réponse était bien : "+reponse+" <br> "+commentaire);
			quizz=false;
			clearInterval(decompte);
			console.log(('Fin du Quizz. Le gagnant est : '+message.user.username).cyan);
		}
	});

	
/*Lancement du quizz*/
	socket.on('quizz', function(){
		console.log('Debut du quizz :'.cyan);
		quizz=true;
		
		
		var parser= new xml2js.Parser();
		fs.readFile(__dirname + '/public/' + 'quizz.xml', function(err, data) {
			parser.parseString(data, function (err, result) {
			
			var n=result.xml.nombre[0];
			var rand=Math.floor(Math.random()*n);
			
			var tableau=result.xml.question[rand]._.split("/");
			question=tableau[0];
			reponse=tableau[1];
			commentaire=tableau[2];
			console.log((question+" Réponse: "+reponse).cyan);

			
			messagebot("Vous avez 20 secondes pour répondre à la question : <br>"+question);

			var i=20;
			decompte=setInterval(function(){
				i=i-1;
				if(i<4){
					messagebot(i.toString());
					console.log(i.toString().cyan);
				}
				if(i==0){
					messagebot("Temps écoulé ! La reponse était : "+reponse+" <br> "+commentaire);
					quizz=false;
					clearInterval(decompte);
					console.log('Fin du Quizz. Aucun gagnant'.cyan);
				}
			},1000);
			
			
			});
		});
	});
});
//souris

io.sockets.on('connection',function(socket){
	var sdata;
	console.log('Nouvelle souris'.magenta);
		    // Start listening for mouse move events
    socket.on('mousemove', function (data) {
        socket.broadcast.emit('moving', data);
		sdata=data;
    });
	
	socket.on('disconnect', function(){
		socket.broadcast.emit('suppression',sdata);
	});	
	
});

//Ajout de questions
io.sockets.on('connection',function(socket){

    socket.on('out', function (out) {
		
		var stream = fs.createWriteStream("./public/ajout.xml",{'flags': 'a'});
		stream.once('open', function(fd) {
		if(out.question!=''&& out.reponse!=''){
			stream.write('<question id="">'+out.question+'\n');
			stream.write('/'+out.reponse+'/\n');
			stream.write(out.commentaire+'\n');
			stream.write('</question>\n\n');
			stream.end();
		}
		});
    });
});
	

