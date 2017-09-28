//Se queda esperando hasta que llegue el mensaje
var socket = io.connect();

socket.on('bienvenido', function(data) {
    addMessage(data.message);

    // Respond with a message including this clients' id sent from the server
    socket.emit('yo soy el cliente', {data: 'foo2!', id: data.id});
});
socket.on('hora', function(data) {
    addMessage(data.time);
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

function addMessage(message) {
    var text = document.createTextNode(message),
        el = document.createElement('li'),
        messages = document.getElementById('messages');

    el.appendChild(text);
    messages.appendChild(el);
}