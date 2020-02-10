/**
 * @class DESCRIPCION
 * @type {import("../typings/phaser")}
 */

class Client {
    constructor() {
        // this.init();


        // Inicializo la variable
        this.socket = io.connect();
        this.serverInfo();
        this.startInfo();
    }

    /**
     * Hola
     */
    sendTest() {
        console.log("sent test");
        this.socket.emit('test');
    }

    serverInfo() {
        this.socket.on('testOk', function (data) {
            console.log(data);
        });
    }

    askNewPlayer = function () {
        this.socket.emit('newplayer');
    };

    movePlayer = function (x, y) {
        this.socket.emit('pointermove', { x: x, y: y});
    };


    startInfo = function () {
        this.socket.on('newplayer', function (data) {
            game.scene.getScene('Game').addNewPlayer(data.id, data.x, data.y);
        });
        this.socket.on('allplayers', function (data) {
            for (var i = 0; i < data.length; i++) {
                game.scene.getScene('Game').addNewPlayer(data[i].id, data[i].x, data[i].y);
            }


            

            // game.scene.getScene('Game').movePlayer(data.id,data.x,data.y);
            // Client.socket.on('remove',function(id){
            //     game.removePlayer(id);
            // });
        });

        this.socket.on('move', function (data,pointer) {
            game.scene.getScene('Game').movePlayer(data.id, data.x, data.y);
        });
    }
}

const cliente = new Client();
