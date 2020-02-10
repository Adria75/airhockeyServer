var express = require('express')
  , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


app.use('/css', express.static(__dirname + '/css'));
// app.use('/public/js', express.static(__dirname + '/js'));
app.use('/public/assets', express.static(__dirname + '/public/assets'));
app.use('/js', express.static(__dirname + '/js'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8080, function () {
    console.log();
    console.log('CADA VEZ QUE EDITES ESTE FICHERO, HAS DE VOLVER A HACER: NPM START!!!!');
    console.log();

    console.log('Listening on http://localhost:' + server.address().port + '/');
});

server.lastPlayderID = 0;

io.on('connection', function (socket) {

    socket.on('test', function () {
        io.emit('testOk', 'Test Ok');

    });


    socket.on('newplayer',function(){

        socket.player = {
            
            id: server.lastPlayderID++,
            x: 30,
            y: 30
        };

        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);
        // getAllEnemies();

        socket.on('pointermove',function(data){
            // console.log('click to '+data.x+', '+data.y);
            // console.log(socket.player.id);
            
            socket.player.x = data.x;
            socket.player.y = data.y;
            socket.broadcast.emit('move',socket.player);
        });

        // socket.on('click',function(data){
        //     console.log('click to '+data.x+', '+data.y);
        //     socket.player.x = data.x;
        //     socket.player.y = data.y;
        //     io.emit('move',socket.player);
        // });

        // socket.on('disconnect',function(){
        //     io.emit('remove',socket.player.id);
        // });
    });

    

});

function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) players.push(player);
    });
    return players;
}

function getAllEnemies() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) {
            players.push(player);
        };
    });
    return players;
}



    // socket.on('newplayer', function () {
    //     socket.player = {
    //         id: server.lastPlayderID++,
    //         x: randomInt(30, 30),
    //         y: randomInt(30, 30)
    //     };
    //     socket.emit('allplayers', getAllPlayers());
    //     socket.broadcast.emit('newplayer', socket.player);

    //     socket.on('click', function (data) {
    //         console.log('click to ' + data.x + ', ' + data.y);
    //         socket.player.x = data.x;
    //         socket.player.y = data.y;
    //         io.emit('move', socket.player);
    //     });

    //     socket.on('disconnect', function () {
    //         io.emit('remove', socket.player.id);
    //     });
    // });




// //Obtenir ip LAN del servidor i definir port

// const port = 8080;

// //Variables per crear servidor
// const path = require("path");
// const express = require("express");
// const app = express();

// //Configuració del Servidor
// app.set("port", process.env.PORT || port);

// //Definir el directori que servirà el Servidor al Client.
// app.use(express.static(path.join(__dirname, "public")));

// var players = {};

// //Iniciar el servidor:
// const server = app.listen(port, "192.168.172.175", () => {
//     console.log("servidor disponible a: http://192.168.172.175:" + port);
// });




// //Iniciar Websocket
// const SocketIO = require("socket.io");
// const io = SocketIO(server);

// /**
//  * Farem servir "io.engine.clientsCount" per saber
//  * quants clients tenim connectats!
//  */


// //Gestió events
// io.on('connection', function (socket) {

//     players[socket.id] = {
//         x: 100,
//         y: 100,
//         playerId: socket.id,
//     };

//     // send the players object to the new player
//     socket.emit('currentPlayers', players);

//     // update all other players of the new player
//     socket.broadcast.emit('newPlayer', players[socket.id]);

//     socket.on('disconnect', function() {

//     });

// });

