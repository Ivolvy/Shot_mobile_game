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
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0]
        ];
    }

    preload(){
        var that = this;

        this.game.add.sprite(0, 0, 'playable-bg');


        this.leftInput = new Phaser.Rectangle(0,this.game.height-200,160,this.game.height);
        this.centerInput = new Phaser.Rectangle(170,this.game.height-200,150,this.game.height);
        this.rightInput = new Phaser.Rectangle(330,this.game.height-200,160,this.game.height);

        this.drawRectangles(this.leftInput);
        this.drawRectangles(this.centerInput);
        this.drawRectangles(this.rightInput);

        this.game.input.onDown.add(function(pointer){


            if(that.leftInput.contains(pointer.x,pointer.y)){
                console.log('left input');
                that.testDestroyObject('left');
            } else if(that.centerInput.contains(pointer.x,pointer.y)){
                console.log('center input');
                that.testDestroyObject('center');
            } else if(that.rightInput.contains(pointer.x,pointer.y)){
                console.log('right input');
                that.testDestroyObject('right');
            }
        });
    }

    //For debug, just to see the clickable zones
    drawRectangles(rectangle){
        //  Create a graphic so we can see the bounds
        var graphics = this.game.add.graphics(rectangle.x, rectangle.y);
        graphics.beginFill(0x000077);
        graphics.drawRect(0, 0, rectangle.width, rectangle.height);
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

        that.ySize = 0;
        that.previous = [];


        that.pandas = this.game.add.group();

        this.itemsTab.forEach(function(element, index1){
           element.forEach(function(element, index){

               if(index == 0 && element == 1){
                   console.log("gauche");
                   console.log(element);
                   that.previous[index1] = that.pandas.create(that.game.world.centerX-220, that.game.world.height-240-that.ySize, 'panda-image');
                   that.ySize+=90;
               } else if(index == 1 && element == 1){
                   console.log("centre");
                   console.log(element);
                   that.previous[index1] = that.pandas.create(that.game.world.centerX-60, that.game.world.height-240-that.ySize, 'panda-image');
                   that.ySize+=90;
               } else if(index == 2 && element == 1){
                   console.log("droite");
                   console.log(element);
                   that.previous[index1] = that.pandas.create(that.game.world.centerX+100, that.game.world.height-240-that.ySize, 'panda-image');
                   that.ySize+=90;
               }

               if(index1 > 1 && element == 1){
                   //To pass above all previous elements in the right order (most old to most recent)
                   for(var i = index1; i >= 0; i--){
                       that.pandas.bringToTop(that.previous[i]);
                   }
               }

           });
        });
    }


    createElementToEnd(part){
        console.log(this.itemsTab);
        this.pandas.y+=90;

     /*   if(part == 'left' && this.itemsTab[0][0] == 1){
            var endElement = [1,0,0];
            this.itemsTab.push(endElement);
            this.previous.push(this.pandas.create(this.game.world.centerX-220, this.game.world.height-240-this.ySize, 'panda-image'));
        } else if(part == 'center' && this.itemsTab[0][1] == 1){
            var endElement = [0,1,0];
            this.itemsTab.push(endElement);
            this.previous.push(this.pandas.create(this.game.world.centerX-60, this.game.world.height-240-this.ySize, 'panda-image'));
        } else if(part == 'right' && this.itemsTab[0][2] == 1){
            var endElement = [0,0,1];
            this.itemsTab.push(endElement);
            this.previous.push(this.pandas.create(this.game.world.centerX+100, this.game.world.height-240-this.ySize, 'panda-image'));
        }*/

        this.ySize+=90;


        this.itemsTab.shift();
        this.previous[0].destroy();
        this.previous.shift();

        console.log(this.itemsTab);
    }

    testDestroyObject(part){
        var that = this;

        if(part == 'left' && this.itemsTab[0][0] == 1){
            console.log('destroy left');
            this.createElementToEnd('left');


        } else if(part == 'center' && this.itemsTab[0][1] == 1){
            console.log('destroy center');
            this.createElementToEnd('center');

        } else if(part == 'right' && this.itemsTab[0][2] == 1){
            console.log('destroy right');


            this.createElementToEnd('right');

        }
    }


}

export default PlayableState;
