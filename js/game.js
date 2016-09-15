 'use strict';
//game object
    var gameBoard = {
        gameSounds: [],//i=0 - redButton, i=1 greenButton, i=2 yellowButton, i=3 blueButton, i=4 - lose, i=5- win
        redButton: $('#redButton'),
        greenButton: $('#greenButton'),
        yellowButton: $('#yellowButton'),
        blueButton: $('#blueButton'),
        memorySequence: [],//if value 1 - red, 2 - green, 3- yellow, 4 - blue
        currentLevel: 0,
        steps: 0,
        level: 0,
        strict: false,
        powerSwitch: false,
        playerMove: false,

        //method for power switching
        switchGame() {
            this.powerSwitch = !this.powerSwitch;
            this.playSequence([1,3,0,2], 250);
        },
        //start new game
        startGame() {
            this.newLevel();
        },

        //add new random level, if level = 20 notification of win, then reset to new game
        newLevel(){
            if(this.level == 20) {
                this.gameSounds[5].play();
                this.displayLevel('win!');
                setTimeout(() => {
                    this.resetGame();
                }, 5000);
                return;
            }
            ++this.level;
            this.displayLevel(this.level);
            this.currentLevel = Math.floor(Math.random() * (4));
            this.memorySequence.push(this.currentLevel);
            this.playSequence(this.memorySequence);
        },
        //notification of wrong step, then repeat the sequence
        wrongStep() {
            this.gameSounds[4].play();
            this.steps = 0;
            setTimeout(() => {
                this.playSequence(this.memorySequence);
            }, 1000);
        },
        /*if is not playerMove that return
         *if current step is correct go to next step
         * if all steps correct go to next level
         * when current step wrong that notification of wrong or if strict mode reset to new game*/
        playerStep(button) {
            if(!this.playerMove){
                return;
            }
            let num = button.attr('data-num');
            this.activeButton(button);
            if (num == this.memorySequence[this.steps]){
                ++this.steps;
            } else {
                if(this.strict) {
                    this.gameSounds[4].play();
                    this.displayLevel('!!');
                    this.resetGame();
                    return;
                }
                this.wrongStep();
            }
            if(this.steps == this.memorySequence.length) {
                setTimeout(() => {
                    this.newLevel();
                    this.steps = 0;
                }, 1000);
            }
        },
        //display current game level
        displayLevel(data) {
            $('#display').text(data);
        },
        //display current memory sequence
        playSequence(sequence, timeInterval) {
            this.playerMove = false;
            timeInterval = timeInterval || 700;
            console.log($('[data-num = 2]'));
            let i = 1;
            let interval = setInterval(() => {
                this.activeButton($('[data-num = '+ sequence[i-1] +']'));
                if (i == sequence.length) {
                    clearInterval(interval);
                    this.playerMove = true;
                }
                ++i;
            }, timeInterval);
        },
        //reset to new game
        resetGame() {
            this.memorySequence = [];
            this.level = 0;
            this.steps = 0;
            this.currentLevel = 0;
            this.playerMove = false;
            setTimeout(() => {
                this.startGame();
            }, 1000)
        },

        //when button pressed, add active class and playing corresponding sound
        activeButton(button){
            button.addClass(button.attr('data-active-class'));
            this.gameSounds[button.attr('data-num')].play();
            console.log('active ' + button.attr('data-num'));
            setTimeout(() => {
                button.removeClass(button.attr('data-active-class'));
            }, 300);
        }
};