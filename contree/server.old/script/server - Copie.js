var sys = require('util');
var net = require('net');

Array.prototype.remove = function(e) {
    for (var i = 0; i < this.length; i++) {
        if (e == this[i]) { return this.splice(i, 1); }
    }
};
Array.prototype.find = function(e) {
    for (var i = 0; i < this.length; i++) {
        if (e == this[i].nom) { return this[i]; }
    }
};

var clients = [];

function Client(socket) {
    this.socket = socket;
	this.socket.setNoDelay(false);
	this.socket.setEncoding('utf8');
	this.nom="";
	
}
var users=[];
function temps(){
var date=new Date();
return (date.getHours()+2)+"h"+date.getMinutes()+":"+date.getSeconds()+"::"+date.getMilliseconds();
}
function toAll(txt){
	clients.forEach(function(c) {
       c.socket.write(txt+"\0");
	});
}
var server = net.createServer(function (socket) {
    var client = new Client(socket);
	client.validUser=true;
	client.nom="nouveau participant sans nom";
    clients.push(client);
	console.log("nouveau participant "+client.nom+" se connecte");

    client.socket.addListener("connect", function () {
	client.socket.write("[connexion]*ok\0");
        clients.forEach(function(c) {
		
		console.log(clients.length + " connected.");
            c.socket.write("[broadcast]*SERVERBOT*nouvelle souris venant de "+socket.remoteAddress+" se connecte\r\n\0");
       
		});
		toAll("[broadcast]*TO-ALL*nouvelle souris venant de "+socket.remoteAddress+" se connecte\r\n\0");
    });

	client.socket.addListener("error", function (exception) {client.socket.end("salut\r\n\0");});
	client.socket.addListener("timeout", function () {client.socket.end("salut!!\r\n\0");});
	client.socket.addListener("close", function () {client.socket.end("salut!!\r\n\0");});
    client.socket.addListener("data", function(data) { 
	var daMode=[];
	/* on parse le type de message*/
	daMode=data.toString().split("*");
		if(daMode[0]=="[hello]"){
			if(daMode[1]!==""){
			client.nom=daMode[1];
				users.push(client.nom);
				clients.find(daMode[1]).socket.write("[private]*"+daMode[1]+"*ce message est pour toi");
				client.socket.write("[wellcome]*"+client.nom+"\0");
				toAll("[broadcast]*SERVERBOT*BIENVENUE A "+daMode[1]+" !!");
			}
		}
		
		/* ici on gere le dispatching des messages privés*/
		if(daMode[0]=="[message]"){
			clients.find(daMode[2]).socket.write("[private]*"+daMode[2]+"*ce message est pour toi");
			clients.forEach(function(c) {
            c.socket.write("[perso]*"+daMode[1]+"*"+daMode[2]+"*"+daMode[3]+"\0");
        });
		
		}
		
		/* sortie debug du data received*/
	clients.forEach(function(c) {
       //c.socket.write(data+"\0");
	   console.log(c.nom+" :"+" dit ("+temps()+") : "+data);
	   });
    });


    client.socket.addListener("end", function () {
        
        clients.forEach(function(c) {
            c.socket.write("We now are one less\n"+"\0");
        });
        client.socket.end("Bye Bye"+"\0");
		clients.remove(client);
    });
});
var userliste="";
setInterval(function(){
people();
	console.log("il est "+temps()+" vous etes "+clients.length +" connectes.("+userliste+")\0");
	
},3000);
function people(){

userliste=[];
			for(var i=0;i<clients.length;i++){
			userliste.push(clients[i].nom);
			}
	clients.forEach(function(c) {
		var date=new Date();
            //c.socket.write("il est "+temps()+" vous etes "+clients.length+" connectes\0");
			
			c.socket.write("[users]*"+userliste.toString()+"\r\n\0",function(e){console.log("drained");});
			//c.socket.pipe(c.socket);
    });
};
/*spawner de monstre
setInterval(function(){
		var x=1080*Math.random();
		var y=900*Math.random();
		var clip=Math.round(clients.length*Math.random());
		clients.forEach(function(c) {
		//console.log("spawning monster\0");
		c.socket.write("[broadcast]*SERVERBOT*LISTE DES UTILISATEURS : "+c.nom+"\0");
            c.socket.write("[bot]*[move]*monstre vert_"+clip+"*"+x+"*"+y+"*\0");
        });

},1000);*/
server.listen(process.env['app_port'] || 3000)