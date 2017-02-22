import Utils from 'libs/Utils';

class OptionsState extends Phaser.State {

    init() {
        this.titleText = this.game.make.text(this.game.world.centerX, 100, "Options", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    }

    preload(){
        //If music is'nt instantiate - we instantiate it
        if(!Utils.getMusicPlayer()){
            Utils.playMusic(this.game);
        }
        this.playSound = Utils.getPlaySound();
        this.playMusic =  Utils.getPlayMusic();
    }


    create(){
        var that = this;

        this.game.add.sprite(0, 0, 'options-bg');
        this.game.add.existing(this.titleText);


        this.addMenuOption(this.playMusic ? 'Mute Music' : 'Play Music', function (target) {
            that.playMusic = !that.playMusic;
            target.text = that.playMusic ? 'Mute Music' : 'Play Music';
            Utils.setMusicPlayerVolume(that.playMusic); //Save the volume parameters globally
        });
        this.addMenuOption(this.playSound ? 'Mute Sound' : 'Play Sound', function (target) {
            that.playSound = !that.playSound;
            target.text = that.playSound ? 'Mute Sound' : 'Play Sound';
            Utils.setPlaySound(that.playSound);
        });

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

export default OptionsState;
