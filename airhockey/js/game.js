/**
 * @class DESCRIPCION
 * @type {import("../typings/phaser")}
 */
class Game extends Phaser.Scene {
    constructor() {
        super(
            {
                key: 'Game',
            }
        )
    }

    /**
     * Carreguem tots els assets necessàris per l'escena
     */
    preload() {
        this.load.image('background', 'public/assets/background.png');
        this.load.image('puck', 'public/assets/rubber_puck3.png');
        this.load.image('paddle', 'public/assets/rubber_paddle.png');
        this.load.image('goalRight', 'public/assets/blueGoal.png');
        this.load.image('goalLeft', 'public/assets/redGoal.png');
    }

    create() {

        /**
         * Variables necessàries
         */
        this.player;
        this.pointer;
        this.playerMap = {};

        /**
         * Creem background
         */
        this.background = this.physics.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');


        /**
         * Creem goals, el grup de goals i els afegim física
         */
        this.goalLeft = this.add.sprite(6, this.cameras.main.centerY, 'goalLeft');
        this.goalLeft.left = true;
        this.goalRight = this.add.sprite(this.cameras.main.width, this.cameras.main.centerY, 'goalRight');
        this.goalRight.left = false;
        this.goals = this.add.group();
        this.goals.add(this.goalLeft);
        this.goals.add(this.goalRight);
        this.physics.world.enableBody(this.goalLeft);
        this.physics.world.enableBody(this.goalRight);
        // this.puck.setBounce(0.8, 0.8);

        /**
         * Afegim la "pilota"
         */
        this.puck = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'puck');

        this.keys = {
            R: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
        };

        /**
         * Afegim l'objecte de refenència per a les "pales"
         */
        this.test = this.physics.add.image(' ', this.scene.inputY, this.scene.inputY);


        cliente.askNewPlayer();


        this.input.on('pointermove', function (pointer) {


            this.pointer = pointer;


            this.test.setPosition(pointer.x, pointer.y);
            if (this.player != null) {
                // console.log(this.player.x);

                this.physics.moveToObject(this.player, pointer, 1000);

                // cliente.movePlayer(this.pointer.x, this.pointer.y);
            }


        }, this);
    }

    update() {
        if (this.keys.R.isDown) {
            console.log('ola');

            cliente.sendTest();

        }



    }

    /**
     * Mètode que afegeix l'enemic al entrar a la sala
     */
    addNewPlayer = function (id, x, y) {

        this.playerMap[id] = this.physics.add.sprite(50, 50, 'paddle');

        this.player = this.playerMap[id];

        this.player.setCollideWorldBounds(true);
    };

    /**
     * Mètode que 
     */
    movePlayer = function (id, x, y) {

        var player = this.playerMap[id];
        var destination = { x: 0, y: 0 };
        destination.x = x;
        destination.y = y;
        // var distance = Phaser.Math.distance(player.x,player.y,x,y);
        // var tween = game.add.tween(player);
        // var duration = distance;
        // tween.to({x:x,y:y}, duration);
        // tween.start();
        // console.log(player);

        this.physics.moveToObject(this.playerMap[id], destination, 1000);

    };
}


