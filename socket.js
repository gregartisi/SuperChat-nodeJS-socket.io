var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./test.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    
	//lors de la conexion, on demande le pseudo.   
    socket.on('nom', function (nom) {
       console.log(nom);
		socket.nom = nom;
		socket.emit('nom',nom); // Send message to sender
		socket.broadcast.emit('nom',nom); // Send message to everyone BUT sender
    });	
	socket.on('message', function (message) {
       console.log(message);
	    socket.emit('message',{'nom':socket.nom,'message':message});
		socket.broadcast.emit('message',{'nom':socket.nom,'message':message}); // Send message to everyone BUT sender
		
    });	
});



server.listen(8080);