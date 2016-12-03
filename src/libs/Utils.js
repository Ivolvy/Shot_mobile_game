class Utils {

    static initMusic(){
        //Global Variables
        this.gameOptions = {
            playSound: true,
            playMusic: true
        };
    }

    static playMusic(game){
        this.musicPlayer = game.add.audio('dangerous');
        this.musicPlayer.loop = true;
        this.musicPlayer.play();
    }


    static getPlaySound(){
        return this.gameOptions.playSound;
    }
    static setPlaySound(param){
        this.gameOptions.playSound = param;
    }

    static getPlayMusic(){
        return this.gameOptions.playMusic;
    }
    static setPlayMusic(param){
        this.gameOptions.playMusic = param;
    }

    static getMusicPlayer(){
        return this.musicPlayer;
    }

    static setMusicPlayerVolume(playMusic){
        this.musicPlayer.volume = playMusic ? 1 : 0;
        this.gameOptions.playMusic = playMusic;
    }

    static centerGameObjects(objects) {
        objects.forEach(function (object) {
            object.anchor.setTo(0.5);
        })
    }
}

export default Utils;
