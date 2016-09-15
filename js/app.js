;(function () {
    'use strict';
    //init game sounds
    function initSounds() {
        gameBoard.gameSounds[0] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
        gameBoard.gameSounds[1] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
        gameBoard.gameSounds[2] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
        gameBoard.gameSounds[3] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
        gameBoard.gameSounds[4] = new Audio('https://clyp.it/nmkpok4u.mp3');
        gameBoard.gameSounds[5] = new Audio('https://clyp.it/t2mupfhs.mp3');
    }
    //init buttons, binding them to functions
    function initButtons() {
        gameBoard.redButton.on('click',() => {
            gameBoard.playerStep(gameBoard.redButton);

        });
        gameBoard.greenButton.on('click',() => {
            gameBoard.playerStep(gameBoard.greenButton);

        });
        gameBoard.yellowButton.on('click',() => {
            gameBoard.playerStep(gameBoard.yellowButton);

        });
        gameBoard.blueButton.on('click',() => {
            gameBoard.playerStep(gameBoard.blueButton);
        });
    }
    function offGame() {
        gameBoard.redButton.off('click');
        gameBoard.greenButton.off('click');
        gameBoard.yellowButton.off('click');
        gameBoard.blueButton.off('click');
    }

    $('.switch').on('click', function(){
        $('.toggle').toggleClass('off');
        gameBoard.switchGame();
        if (gameBoard.powerSwitch) {
            initSounds();
            initButtons();
            gameBoard.displayLevel(0)
        } else {
            offGame();
            gameBoard.displayLevel('')
        }
    });
    $('#start').on('click', () => {
        if(gameBoard.powerSwitch){
            gameBoard.resetGame();
        }
    });
    $('#strict').on('click', () => {
        if(gameBoard.powerSwitch) {
            gameBoard.strict = !gameBoard.strict;
            $('.strict-indication').toggleClass('strict-indication-active')
        }
    });
})();

