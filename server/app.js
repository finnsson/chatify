var app = require('express').createServer()
    , io = require('socket.io').listen(app);

app.listen(8090);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('textToSay', function(data) {
        console.log("textToSay:");
        console.log(data);
        io.sockets.emit('newText', data);
    });
});
