import SplashState from 'states/SplashState';

class GameState extends Phaser.State {


	init(){
		// set up input max pointers
		this.game.input.maxPointers = 1;

		this.game.stage.disableVisibilityChange = true; //don't pause the game on focus out

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		/*this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;*/
		this.game.scale.refresh();

	}

	preload(){
		//this.add.plugin(Phaser.Plugin.Debug); //Add this to enable debug mode

		//this refers to Phaser.Game instance
		this.load.image('splash-screen-bg', 'assets/images/splash_screen.png');
		this.load.image('loading', 'assets/images/loading.png');
	}

	create(){
		 this.state.add('Splash', SplashState);
		 this.state.start('Splash');
	}

}

export default GameState;
