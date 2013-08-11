var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler());
});

app.get('/', function(req, res){
    res.render('index', {
	gettings : "Chat"
	});
});

server.listen(app.get('port'));

io.set('transports', ['websocket','xhr-polling']);

io.sockets.on('connection', function(client) {
    console.log('conect...');
    client.emit('message', { mensaje : 'Bienvenido!!' });
});
