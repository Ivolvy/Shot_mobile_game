class PlayableState extends Phaser.State {

    init() {
        this.itemsTab = [
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [0, 0, 1],
            [1, 0, 0],
            [1, 0, 0]
        ];
    }

    preload(){
      //  this.game.add.sprite(0, 0, 'playable-bg');
    }

    create() {
        this.timer1 = this.game.make.sprite(this.game.world.centerX, 200, 'timer-image-1');
        this.timer2 = this.game.make.sprite(this.game.world.centerX, 200, 'timer-image-2');
        this.timer3 = this.game.make.sprite(this.game.world.centerX, 200, 'timer-image-3');

       // this.launchTimer();
        this.launchParty();
    }

    launchTimer(){
        var that = this;

        this.timerCount = 0;
        this.startTimer = setInterval(function(){

            switch(that.timerCount){
                case 1:
                    that.game.add.existing(that.timer3).scale.setTo(0.5);
                    break;
                case 2:
                    that.game.add.existing(that.timer2).scale.setTo(0.5);
                    that.timer3.destroy();
                    break;
                case 3:
                    that.game.add.existing(that.timer1).scale.setTo(0.5);
                    that.timer2.destroy();
                    break;
                case 4:
                    that.timer1.destroy();
                    clearInterval(that.startTimer);
                    that.launchParty();
                    break;
            }

            that.timerCount+=1;
        }, 1000);
    }

    launchParty(){
        var that = this;

        var ySize = 0;
        var previous = [];


        var pandas = this.game.add.group();

        this.itemsTab.forEach(function(element, index1){
           element.forEach(function(element, index){



               if(index == 0 && element == 1){
                   console.log("gauche");
                   console.log(element);
                   previous[index1] = pandas.create(that.game.world.centerX-220, that.game.world.height-240-ySize, 'panda-image');
                   ySize+=90;
               } else if(index == 1 && element == 1){
                   console.log("centre");
                   console.log(element);
                   previous[index1] = pandas.create(that.game.world.centerX-60, that.game.world.height-240-ySize, 'panda-image');
                   ySize+=90;
               } else if(index == 2 && element == 1){
                   console.log("droite");
                   console.log(element);
                   previous[index1] = pandas.create(that.game.world.centerX+100, that.game.world.height-240-ySize, 'panda-image');
                   ySize+=90;
               }

               if(index1 > 1 && element == 1){
                   //To pass above all previous elements in the right order (most old to most recent)
                   for(var i = index1; i >= 0; i--){
                       pandas.bringToTop(previous[i]);
                   }
               }

           });
        });
    }


}

export default PlayableState;
