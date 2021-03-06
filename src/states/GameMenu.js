import Utils from 'libs/Utils';

class GameMenuState extends Phaser.State {

    init() {
        this.titleText = this.game.make.text(this.game.world.centerX, 100, "Game Title", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    }

    preload(){
        this.optionCount = 1;
    }

    create(){
        var that = this;

        this.game.add.sprite(0, 0, 'menu-bg');
        this.game.add.existing(this.titleText);

        this.game.stage.disableVisibilityChange = true; //don't pause the game on focus out


        this.addMenuOption('Start', function (target) {
            that.game.state.start("Playable");
        });
        this.addMenuOption('Options', function (target) {
            that.game.state.start("Options");
        });
        this.addMenuOption('LeaderBoard', function (target) {
            that.game.state.start("LeaderBoard");
        });
    }

    addMenuOption(text, callback) {
        var optionStyle = {
            font: '30pt TheMinion',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            srokeThickness: 4
        };
        var txt = this.game.add.text(30, (this.optionCount * 80) + 200, text, optionStyle);

        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback);

        this.optionCount++;
    }

}

export default GameMenuState;
