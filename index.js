var fs=require("fs");
//var config=JSON.parse(fs.readFileSync("config.json"));
//var host=config.host;
//var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()
var http = require('http').Server(app);
var io = require('socket.io').listen(http); // Socket.io server listens to our app

//app.use(app.router);

app.use(exp.static(__dirname + "/client"));

//El get() que hace el navegador al servidor
app.get("/",function(request,response){
	var contenido = fs.readFileSync("./client/index.html");
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.send(contenido);
});

// Send current time to all connected clients
function sendTime() {
    io.emit('hora', { time: new Date().toJSON() });
}

// Cada 10s se ejecuta
setInterval(sendTime, 10000);

// Enviaje el mensaje connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('bienvenido', { message: '!Bienvenido!', id: socket.id });

    socket.on('yo soy el cliente', console.log);
});

http.listen(3000);