
/**
 * @type {import("../../../typings/phaser")}
 */

/**
 * Configuracion de la escena de Phaser
 */
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 20,
    height: window.innerHeight - 20,
    backgroundColor: 0xffffff,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: { pixelArt: true, antialias: false, autoResize: false },
    scene: [
        Game,       
    ],

};

var game = new Phaser.Game(config);
// window.onload = function () {
//     var game = new Phaser.Game(config);
// }

/**
 * Inicializamos Phaser en una variable
 */

