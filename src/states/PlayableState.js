class PlayableState extends Phaser.State {

    init() {

    }

    preload(){

    }

    create() {

        this.game.add.sprite(0, 0, 'playable-bg');

    }


}

export default PlayableState;
