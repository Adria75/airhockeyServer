/**
 * @class DESCRIPCION
 * @type {import("../typings/phaser")}
 */
class Game extends Phaser.Scene{
    constructor() {
        super(
            {
                key: 'Game',
            }
        )
    }

    preload(){
        this.load.image('background', 'public/assets/background.png');	
        this.load.image('puck', 'public/assets/rubber_puck3.png');
		this.load.image('paddle', 'public/assets/rubber_paddle.png');
		this.load.image('goalRight', 'public/assets/blueGoal.png');
		this.load.image('goalLeft', 'public/assets/redGoal.png');
    }

    create(){

        this.playerMap = {};
        //Creem background
        this.background = this.physics.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');


        //Creem goals
        this.goalLeft = this.add.sprite(6, this.cameras.main.centerY, 'goalLeft');
        this.goalLeft.left = true;

        this.goalRight = this.add.sprite(this.cameras.main.width, this.cameras.main.centerY, 'goalRight');
        this.goalRight.left = false;

        this.goals = this.add.group();

        this.goals.add(this.goalLeft);
        this.goals.add(this.goalRight);
        
        this.physics.world.enableBody(this.goalLeft);
        this.physics.world.enableBody(this.goalRight);

        this.puck = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'puck');

        this.keys = {
            R: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
        };

        cliente.askNewPlayer();


        this.input.on('pointermove', function (pointer) {

            cliente.movePlayer(pointer.x, pointer.y);

            // this.test.setPosition(pointer.x, pointer.y);
            // this.physics.moveToObject(this.paddle, pointer, 1000);
        }, this);
    }

    update(){
        if (this.keys.R.isDown) {
            console.log('ola');

            cliente.sendTest();
            
        }
       
    }

    addNewPlayer = function(id,x,y){
        if (id >= 1) {
            this.playerMap[id] = this.add.image(50,50,'paddle');
        }
        else{
            this.playerMap[id] = this.add.image(x,y,'paddle');
            console.log(this.playerMap[id]);
            
        }
    };
    
    movePlayer = function(id,x,y){
        var player = this.playerMap[id];
        var distance = Phaser.Math.distance(player.x,player.y,x,y);
        var tween = game.add.tween(player);
        var duration = distance;
        tween.to({x:x,y:y}, duration);
        tween.start();
        // this.physics.moveToObject(this.paddle, pointer, 1000);

    };
}


