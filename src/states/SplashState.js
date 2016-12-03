import Utils from 'libs/Utils';
import LeaderBoard from "./LeaderBoardState";
import GameMenu from "./GameMenu";
import OptionsState from "./OptionsState";
import PlayableState from "./PlayableState";

class SplashState extends Phaser.State {

    loadScripts() {
        this.game.load.script('WebFont', '../vendor/webfontloader.js');
    }

    loadBgm() {
        this.game.load.audio('dangerous', 'assets/bgm/jauny_kray_remix.mp3');
    }

    loadImages() {
        this.game.load.image('menu-bg', 'assets/images/back-menu.png');
        this.game.load.image('options-bg', 'assets/images/options-screen.png');
        this.game.load.image('leaderBoard-bg', 'assets/images/leaderBoard-screen.png');
        this.game.load.image('playable-bg', 'assets/images/playable-screen.png');
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
        this.game.add.sprite(0, 0, 'splash-screen-bg');
        // Add the loadingBar to the scene:
        this.loadingBar = this.game.make.sprite(this.game.world.centerX-(387/2), 400, "loading");
        this.status = this.game.make.text(this.game.world.centerX, 380, 'Loading...', {fill: 'white'});
        Utils.centerGameObjects([this.status]);

    }

    preload() {
        this.game.add.sprite(0, 0, 'splash-screen-bg');
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
        this.game.state.add("Options", OptionsState);
        this.game.state.add("Playable", PlayableState);
    }

    create() {
        var that = this;

        this.status.setText('Ready!');
        this.addGameStates();

        setTimeout(function () {
            that.game.state.start("GameMenu");
        }, 3000);
    }

}

export default SplashState;
