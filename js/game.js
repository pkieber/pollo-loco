let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

/**
 * This function starts the game.
 * It hides the startscreen and shows the canvas.
 */
function startGame() {
    initLevel();
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startBtn').classList.add('d-none');
    document.getElementById('screenBtn').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    btnPanelPressEvents();
    // console.log('My Character is', world.character);}
}


/**
 * This function reloads the page.
 */
function restart() {
    location.reload();
}


/**
 * This function stops all intervals.
 * @param {*} fn 
 * @param {*} time 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


/**
 * This function stops the game and clears the interval ids.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    document.getElementById('screenBtn').classList.add('d-none');
}


/**
 * This function shows the "Winner"-endscreen.
 */
function showEndscreenWin() {
    document.getElementById('endscreen').classList.remove('d-none');
    document.getElementById('endscreenWin').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startBtn').classList.remove('d-none');
    document.querySelector('#startBtn img').src = './img/repeat.svg'; // Replaces button 'start' icon with 'repeat' icon
    document.getElementById('startBtn').setAttribute('title', 'Play again'); // Change button title from 'Start Game' to 'Play again'
    document.getElementById('startBtn').setAttribute('onclick', 'restart()');
    document.getElementById('endscreenBossDead').classList.remove('d-none');
}


/**
 * This function shows the "Loser"-endscreen when the player loses.
 */
function showEndscreenLost() {
    document.getElementById('endscreen').classList.remove('d-none');
    document.getElementById('endscreenLost').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startBtn').classList.remove('d-none');
    document.querySelector('#startBtn img').src = './img/repeat.svg'; // Replaces button 'start' icon with 'repeat' icon
    document.getElementById('startBtn').setAttribute('title', 'Play again'); // Change button title from 'Start Game' to 'Play again'
    document.getElementById('startBtn').setAttribute('onclick', 'restart()');
}


/**
 * This function shows the instructions.
 */
function showInstructions() {
    document.getElementById("overlayInstruction").style.display = "block";
}


/**
 * This function hides the instructions.
 */
function hideInstructions() {
    document.getElementById("overlayInstruction").style.display = "none";
}


/**
 * This function makes the instructions overlay disappear when clicking outside of it.
 */
window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("overlayInstruction")) {
        hideInstructions();
    }
    if (event.target == document.getElementById("overlayStory")) {
        hideStory();
    }   
});


/**
 * This function shows the intro story of the game.
 */
function showStory() {
    document.getElementById("overlayStory").style.display = "block";
}


/**
 * This function hides the intro story of the game.
 */
function hideStory() {
    document.getElementById("overlayStory").style.display = "none";
}


/**
 * This function mutes the sound.
 */
function soundOff() {
    if (!world.character.mute) {
    document.getElementById("mute").classList.add('d-none');
    document.getElementById("unmute").classList.remove('d-none');
    world.character.mute = true;
    } 
}


/**
 * This function unmutes the sound.
 */
function soundOn() {
    if (world.character.mute) {
    document.getElementById("mute").classList.remove('d-none');
    document.getElementById("unmute").classList.add('d-none');
    world.character.mute = false;
    }   
} 


/**
 * This function opens the game in fullscreen mode.
 */
function openFullscreen() {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { /* Firefox */
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE/Edge */
        canvas.msRequestFullscreen();
    }
}    


/**
 * This function sets the event listeners (keydown) for the buttons in the panel.
 */
window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }
    // console.log(e);
});


/**
 * This function sets the event listeners (keyup) for the buttons in the panel.
 */
window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68){
        keyboard.D = false;
    }
    // console.log(e);
});


/**
 * This function sets the event listeners (touchstart/touchend) for the mobile control panel.
 */
function btnPanelPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }); 

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}