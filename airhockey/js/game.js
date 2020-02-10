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
        this.isDown;

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



        /**
         * Afegim la "pilota"
         */

        /**
         * Interaccions entre elements
         */
        // this.physics.add.overlap(this.paddle, this.test, this.collidePuck, null, this);


        this.puck = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'puck');
        this.physics.world.enableBody(this.puck);
        this.puck.setCircle(21);
        this.puck.setBounce(0.8, 0.8);
        this.puck.setCollideWorldBounds(true);

        this.keys = {
            R: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
        };

        /**
         * Afegim l'objecte de refenència per a les "pales"
         */
        this.test = this.physics.add.image(' ', this.scene.inputY, this.scene.inputY);


        cliente.askNewPlayer();

        this.physics.add.overlap(this.puck, this.goals, this.overlapGoals, null, this);



        this.input.on('pointermove', function (pointer) {


            this.pointer = pointer;


            this.test.setPosition(pointer.x, pointer.y);
            if (this.player != null) {
                if (this.isDown) {
                    this.physics.moveToObject(this.player, pointer, 1000);

                }
                else {
                    this.player.body.stop();
                }

            }
            



        }, this);

        this.input.on('pointerdown', function () {
            this.isDown = true;
        }, this);
        this.input.on('pointerup', function () {
            this.isDown = false;
        }, this);
    }

    update() {
        if (this.keys.R.isDown) {
            

            

        }
        // console.log(this.player);

        if (this.player != null) {
            cliente.movePlayer(this.player.x,this.player.y)
        }

 
    }

    /**
     * Mètode que afegeix l'enemic al entrar a la sala
     */
    addNewPlayer(id, x, y) {

        this.playerMap[id] = this.physics.add.sprite(50, 50, 'paddle');

        this.player = this.playerMap[id];

        this.physics.world.enableBody(this.player);

        this.player.setCollideWorldBounds(true);

        this.player.setCircle(27);
        console.log(this.puck);

        this.physics.add.collider(this.player, this.puck);
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

        this.physics.moveToObject(player, destination, 1000);

    };

    overlapGoals(puck, goal) {
        this.puck.body.stop();
        this.puck.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        console.log(goal);

        // if (goal.left == true) {
        //     this.player2Score++;
        //     this.player2ScoreText.text = 'Jugador 2: ' + this.player2Score;

        // }
        // else {
        //     this.player1Score++;
        //     this.player1ScoreText.text = 'Jugador 1: ' + this.player1Score;
        // }
    }
}


