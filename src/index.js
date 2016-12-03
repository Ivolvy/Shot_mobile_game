import GameState from 'states/GameState';
import Utils from 'libs/Utils';

class Game extends Phaser.Game {

	constructor() {
		//super call the parent constructor - here Phaser.Game
		//As we do new Phaser.Game(..,..)
        //window.innerWidth - window.innerHeight
		super(480, 800, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');

		//Init params to play sound and music
		Utils.initMusic();
	}

}

new Game();
