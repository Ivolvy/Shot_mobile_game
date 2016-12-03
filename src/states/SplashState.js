import Utils from 'libs/Utils';
import LeaderBoard from "./LeaderBoard";
import GameMenu from "./GameMenu";

class SplashState extends Phaser.State {

    loadScripts() {
        this.game.load.script('WebFont', '../vendor/webfontloader.js');
    }

    loadBgm() {
        this.game.load.audio('dangerous', 'assets/bgm/jauny_kray_remix.mp3');
    }

    loadImages() {
        this.game.load.image('menu-bg', 'assets/images/splash_screen.png');
    }

    loadFonts() {
        this.WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['styles/theminion.css']
            }
        }
    }

    init(){
        // Add the loadingBar to the scene:
        this.loadingBar = this.game.make.sprite(this.game.world.centerX-(387/2), 400, "loading");
        this.status = this.game.make.text(this.game.world.centerX, 380, 'Loading...', {fill: 'white'});
        Utils.centerGameObjects([this.status]);

    }

    preload() {

        this.game.add.existing(this.loadingBar);
        this.game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);


        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    }

    addGameStates() {
        this.game.state.add("GameMenu", GameMenu);
        this.game.state.add("LeaderBoard", LeaderBoard);
    }

    addGameMusic() {
       /* this.music = this.game.add.audio('dangerous');
        this.music.loop = true;
        this.music.play();*/
    }

    create() {
        var that = this;

        this.status.setText('Ready!');
        this.addGameStates();
        this.addGameMusic();

        setTimeout(function () {
            that.game.state.start("GameMenu");
        }, 3000);
    }

}

export default SplashState;
