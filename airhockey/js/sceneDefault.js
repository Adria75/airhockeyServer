/**
 * @class DESCRIPCION
 * @type {import("../typings/phaser")}
 */
class Game extends Phaser.Scene {
    /**
     * @constructor Constructor de la escena Game
     */
    // constructor() {
    //     super(
    //         {
    //             key: 'Game',
    //         }
    //     )
    // }
    /**
     * @function init Init es la primera función que se llama cuando se
     * inicia su estado. Se llama antes de precargar, crear o cualquier
     * otra cosa. Si necesita enrutar el juego a otro estado, puede
     * hacerlo aquí, o si necesita preparar un conjunto de variables u
     * objetos antes de que comience la precarga.
     */
    init() {

    }

    /**
     * @function preload Preload se llama primero. Normalmente usaría
     * esto para cargar sus activos de juego (o los necesarios para el
     * Estado actual). No debe crear ningún objeto en este método que
     * requiera activos que también esté cargando en este método, ya
     * que aún no serán disponible.
     */
    preload() {

		this.load.image('puck', 'assets/rubber_puck3.png');
		this.load.image('paddle', 'assets/rubber_paddle.png');
		this.load.image('goalRight', 'assets/blueGoal.png');
		this.load.image('goalLeft', 'assets/redGoal.png');
		this.load.image('airhole', 'assets/hole4.png');
		this.load.image('players', 'assets/players.png');
		this.load.image('button1', 'assets/button1.png');
		this.load.image('button2', 'assets/button2.png');
		this.load.image('button3', 'assets/button3.png');
		this.load.image('button4', 'assets/button4.png');
		this.load.image('mainMenu', 'assets/buttons.png');
		this.load.image('background', 'assets/background.png');		

    }

    /**
     * @function create Create sellama una vez que se ha completado la
     * precarga. Si no tiene un método de precarga, crear es el primer
     * método llamado en su estado.
     */
    create() {

        
        //Crear Background
        this.background = this.physics.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');
        this.background.displayWidth = this.cameras.main.width;
        this.background.displayHeigth = this.cameras.main.heigth;
        this.background.setOrigin(0.5);
        this.test = this.physics.add.image(' ', this.scene.inputY,this.scene.inputY);

        // this.physics.world.enableBody(this.background);

        // set up goals
        this.paddle = this.physics.add.sprite(30, 30, 'paddle');
        this.goals = this.add.group();

        // Creacio de player
        var self = this;
        this.socket = io();
        this.otherPlayers = this.physics.add.group();

        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    addPlayer(self, players[id]);
                } else {
                    addOtherPlayers(self, players[id]);
                }
            });
        });

        this.goalLeft = this.add.sprite(6, this.cameras.main.centerY, 'goalLeft');
        this.goalLeft.left = true;

        this.goalRight = this.add.sprite(this.cameras.main.width - 12, this.cameras.main.centerY, 'goalRight');
        this.goalRight.left = false;
        this.puck = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'puck');

        this.goals.add(this.goalLeft);
        this.goals.add(this.goalRight);

        this.physics.world.enableBody(this.goalLeft);
        this.physics.world.enableBody(this.goalRight);
        this.physics.world.enableBody(this.puck);
        this.puck.setCollideWorldBounds(true);
        this.puck.setBounce(0.8, 0.8);

        this.paddle.setCircle(27);
        this.puck.setCircle(21);

        this.physics.add.overlap(this.paddle, this.test, this.collidePuck, null, this);
        this.physics.add.overlap(this.puck, this.goals, this.overlapGoals, null, this);

        this.physics.add.collider(this.puck, this.paddle);

        //this.paddle.setCollideWorldBounds(true);
        
        //Puntuacio
        this.player1Score;
        this.player2Score;
        this.player1ScoreText;
        this.player2ScoreText;
        //this.physics.world.enableBody(this.paddle);

        this.input.on('pointermove', function (pointer) {
            this.test.setPosition(pointer.x, pointer.y);
            this.physics.moveToObject(this.paddle, pointer, 1000);
        }, this);    

        this.crearPuntuacio();

    }

    /**
     * @function update Update se llama una vez finalizado la carga de los 
     * archivos para poder jugar
     */
    update() {
        this.puck.body.useDamping = true;
        this.puck.setDrag(0.99999)
    }

    collidePuck() {
        this.paddle.body.stop();     
    }

    overlapGoals(puck, goal){
        this.puck.body.stop();
        this.puck.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        console.log(goal);
        
        if(goal.left == true){
            this.player2Score++;
            this.player2ScoreText.text = 'Jugador 2: ' + this.player2Score;
            
        }
        else{
            this.player1Score++;
            this.player1ScoreText.text = 'Jugador 1: ' + this.player1Score;
        }
    }

    crearPuntuacio() {
        this.player1Score = 0;
        this.player2Score = 0;
        //Revisar posicions
        this.player1ScoreText = this.add.text(20, 16, 'Jugador 1: 0', { fontSize: '32px', fill: '#000' });
        this.player2ScoreText = this.add.text(config.width-300, 16, 'Jugador 2: 0', { fontSize: '32px', fill: '#000' });

    }


    addPlayer(self, playerInfo) {
        self.paddle = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'paddle');
        self.paddle.setCircle(27);
        self.paddle.setCollideWorldBounds(true);
    }

    addOtherPlayers(self, playerInfo) {
        const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'paddle');
        otherPlayer.playerId = playerInfo.playerId;
        self.otherPlayers.add(otherPlayer);
    }



}