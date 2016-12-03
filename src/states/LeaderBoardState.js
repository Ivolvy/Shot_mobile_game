
class LeaderBoardState extends Phaser.State {

    init() {
        this.titleText = this.game.make.text(this.game.world.centerX, 100, "LeaderBoard", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    }

    preload(){

    }


    create(){
        var that = this;


        this.game.add.sprite(0, 0, 'leaderBoard-bg');
        this.game.add.existing(this.titleText);

        this.addMenuOption('<- Back', function (target) {
            that.game.state.start("GameMenu");
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

export default LeaderBoardState;
