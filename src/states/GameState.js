import SplashState from 'states/SplashState';

class GameState extends Phaser.State {

	preload(){
		//this.add.plugin(Phaser.Plugin.Debug); //Add this to enable debug mode

		//this refers to Phaser.Game instance
		this.load.image('splash', 'assets/images/splash_screen.png');
		this.load.image('loading', 'assets/images/loading.png');
	}

	create(){
		 this.state.add('Splash', SplashState);
		 this.state.start('Splash');
	}

}

export default GameState;
