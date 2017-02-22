class PlayableState extends Phaser.State {

    init() {
        this.itemsTab = [];
        this.counter = 30; //The time before the game end
        this.gameIsPaused = false;

        this.optionCount = 1;

    }

    preload(){
        var that = this;

        this.game.add.sprite(0, 0, 'playable-bg');

        //Add the back image of the timer
        this.timerBack = this.game.add.sprite(10, 75, 'timer-back');
        this.counterText = this.game.add.text(30, 80, this.counter, { font: "64px Arial", fill: "#ffffff", align: "center" });
        //this.counterText.anchor.setTo(0.5, 0.5);
        this.pauseButton = this.game.add.sprite(this.game.world.width-100, 80, 'pause-button');
        this.pauseButton.inputEnabled = true;
        this.pauseButton.events.onInputUp.add(this.pauseGame, this);


        //Create clickable areas
        this.leftInput = new Phaser.Rectangle(0,this.game.height-200,160,this.game.height);
        this.centerInput = new Phaser.Rectangle(170,this.game.height-200,150,this.game.height);
        this.rightInput = new Phaser.Rectangle(330,this.game.height-200,160,this.game.height);

        this.drawRectangles(this.leftInput);
        this.drawRectangles(this.centerInput);
        this.drawRectangles(this.rightInput);

        //test if we click on part left, center or right
        this.game.input.onDown.add(function(pointer){
            //Fire events only when the game is not paused
            if(!that.gameIsPaused){
                if(that.leftInput.contains(pointer.x,pointer.y)){
                    console.log('left input');
                    that.destroyObject('left');
                } else if(that.centerInput.contains(pointer.x,pointer.y)){
                    console.log('center input');
                    that.destroyObject('center');
                } else if(that.rightInput.contains(pointer.x,pointer.y)){
                    console.log('right input');
                    that.destroyObject('right');
                }
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

        this.launchTimer();
        //this.populateTab();
    }

    //Launch a timer before the game start
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
                    that.counterBeforeEnd();
                    that.populateTab();
                    break;
            }

            that.timerCount+=1;
        }, 1000);
    }

    /**
     * Counter before the game end
     */
    counterBeforeEnd(){
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    }

    /**
     * Update the counter
     */
    updateCounter() {
        this.counter--;
        this.counterText.setText(this.counter);
        if(this.counter == 0){
            this.game.time.events.stop();
            
            //STOP THE GAME HERE
        }
    }


    pauseGame(){
        var that = this;

        //We pause the game
        this.gameIsPaused = true;
        //We stop the counter
        this.game.time.events.pause();

        //Add pause menu
        this.pauseMenu = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pause-menu');
        this.pauseMenu.anchor.setTo(0.5, 0.5);
        this.pauseMenu.inputEnabled = true;
        //this.pauseMenu.events.onInputUp.add(this.resumeGame, this);

        //Group fo texts in pause menu
        this.textGroup = this.game.add.group();

        this.addPauseOption('Resume', function (target) {
            that.resumeGame();
        });
        this.addPauseOption('Restart', function (target) {
            that.game.state.start("Playable");
        });
        this.addPauseOption('Quit to menu', function (target) {
            that.game.state.start("GameMenu");
        });

    }

    //All text for pause menu
    addPauseOption(text, callback) {
        var optionStyle = {
            font: '30pt TheMinion',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            srokeThickness: 4
        };

        var txt = this.game.add.text(100, (this.optionCount * 80) + 200, text, optionStyle, this.textGroup);

        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback);

        this.optionCount++;
    }

    resumeGame(){
        // Remove the menu and the labels
        this.pauseMenu.destroy();

        //Remove all texts in pause menu
        this.textGroup.destroy();

        //Reset optionCount for text position in pause menu
        this.optionCount = 1;

        //We resume the counter
        this.game.time.events.resume();

        //Resume the game
        this.gameIsPaused = false;
    }

    //Create the first indexes with random position (left, center or right)
    populateTab(){
        var newObjectPosition;
        var randomPosition;

        for(var fill = 0; fill < 200; fill++){
            randomPosition = Math.floor(Math.random() * 3) + 1; //Range between 1 and 3 - 1: left - 2:center - 3:right

            if(randomPosition == 1){
                newObjectPosition = [1,0,0];
            } else if(randomPosition == 2){
                newObjectPosition = [0,1,0];
            } else if(randomPosition == 3){
                newObjectPosition = [0,0,1];
            }

            this.itemsTab.push(newObjectPosition);
        }

        console.log(this.itemsTab);

        this.launchParty();
    }

    launchParty(){
        var that = this;

        //Y position for created elements
        that.yPosition = 0;
        //All previous created objects
        that.previousObjects = [];

        //group for all pandas sprites
        that.pandas = this.game.add.group();
        this.lastPopulate = 20; //Populate tab objects with 20 entries

        //Create 20 entries
        for(var run = 0; run < this.lastPopulate; run++){
            this.itemsTab[run].forEach(function(element, index){

                //If the left position is set to 1 - [1,0,0]
                if(index == 0 && element == 1){
                    that.previousObjects[run] = that.pandas.create(that.game.world.centerX-220, that.game.world.height-240-that.yPosition, 'panda-image');
                    that.yPosition+=90; //Create elements at top of the others
                } else if(index == 1 && element == 1){ //Center position
                    that.previousObjects[run] = that.pandas.create(that.game.world.centerX-60, that.game.world.height-240-that.yPosition, 'panda-image');
                    that.yPosition+=90;
                } else if(index == 2 && element == 1){ //Right position
                    that.previousObjects[run] = that.pandas.create(that.game.world.centerX+100, that.game.world.height-240-that.yPosition, 'panda-image');
                    that.yPosition+=90;
                }


                //To pass above all previousObjects elements in the right order (most old to most recent)
                if(run == that.lastPopulate-1){ //If we added all elements
                    that.pandas.sort('y', Phaser.Group.SORT_ASCENDING);
                }

            });

        }

        //Bring to top this elements - to be above the objects
        this.timerBack.bringToTop();
        this.counterText.bringToTop();
        this.pauseButton.bringToTop();
        console.log(this.itemsTab);

    }

    createElementToEnd(){

        //Move all the sprite group to bottom
        this.pandas.y+=90;

        //If there is more index elements to load
        if(this.itemsTab[this.lastPopulate]){
            //To enable if we want to crete object dynamically
            if (this.itemsTab[this.lastPopulate][0] == 1) {
                this.previousObjects.push(this.pandas.create(this.game.world.centerX - 220, this.game.world.height - 240 - this.yPosition, 'panda-image'));
            } else if (this.itemsTab[this.lastPopulate][1] == 1) {
                this.previousObjects.push(this.pandas.create(this.game.world.centerX - 60, this.game.world.height - 240 - this.yPosition, 'panda-image'));
            } else if (this.itemsTab[this.lastPopulate][2] == 1) {
                this.previousObjects.push(this.pandas.create(this.game.world.centerX + 100, this.game.world.height - 240 - this.yPosition, 'panda-image'));
            }
        }

        this.deleteElements();

        //Re-sort z-index for entire group with newly created objects
        this.pandas.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    //Delete elements we tap on
    deleteElements(){
        this.itemsTab.shift(); //delete first element
        this.previousObjects[0].destroy(); //delete sprite
        this.previousObjects.shift();

        this.yPosition+=90;
    }



    //On position object click
    destroyObject(part){
        if(part == 'left' && this.itemsTab[0][0] == 1){
            console.log('destroy left');
            this.createElementToEnd();
        } else if(part == 'center' && this.itemsTab[0][1] == 1){
            console.log('destroy center');
            this.createElementToEnd();
        } else if(part == 'right' && this.itemsTab[0][2] == 1){
            console.log('destroy right');
            this.createElementToEnd();
        }
    }


}

export default PlayableState;
