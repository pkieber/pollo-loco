let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let background_sound = new Audio('audio/background.mp3');


/**
 * Starts the game.
 * Hides the startscreen and shows the canvas.
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
    background_sound.play();
    // console.log('My Character is', world.character);}
}


/**
 * Reloads the page.
 */
function restart() {
    location.reload();
}


/**
 * Stops all intervals.
 * @param {*} fn 
 * @param {*} time 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


/**
 * Stops the game and clears the interval ids.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    background_sound.pause();
    background_sound.currentTime = 0;
}


/**
 * Shows the "Winner"-endscreen.
 * Icons or titles are replaced on-click.
 */
function showEndscreenWin() {
    document.getElementById('endscreen').classList.remove('d-none');
    document.getElementById('endscreenWin').classList.remove('d-none');
    document.getElementById('screenBtn').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startBtn').classList.remove('d-none');
    document.querySelector('#startBtn img').src = './img/repeat.svg';
    document.getElementById('startBtn').setAttribute('title', 'Play again');
    document.getElementById('startBtn').setAttribute('onclick', 'restart()');
}


/**
 * Shows the "Loser"-endscreen when the player loses.
 * Icons or titles are replaced on-click.
 */
function showEndscreenLost() {
    document.getElementById('endscreen').classList.remove('d-none');
    document.getElementById('endscreenLost').classList.remove('d-none');
    document.getElementById('screenBtn').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startBtn').classList.remove('d-none');
    document.querySelector('#startBtn img').src = './img/repeat.svg';
    document.getElementById('startBtn').setAttribute('title', 'Play again');
    document.getElementById('startBtn').setAttribute('onclick', 'restart()');
}


/**
 * Shows the instructions.
 */
function showInstructions() {
    document.getElementById("overlayInstruction").style.display = "block";
}


/**
 * Hides the instructions.
 */
function hideInstructions() {
    document.getElementById("overlayInstruction").style.display = "none";
}


/**
 * Shows the intro story of the game.
 */
function showStory() {
    document.getElementById("overlayStory").style.display = "block";
}


/**
 * Hides the intro story of the game.
 */
function hideStory() {
    document.getElementById("overlayStory").style.display = "none";
}


/**
 * Makes the instructions overlay disappear when clicking outside of it.
 */
window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("overlayInstruction")) {
        hideInstructions();
    }
    if (event.target == document.getElementById("overlayStory")) {
        hideStory();
    }
    if (event.target == document.getElementById("landscapeMessage")) {
        hideMessage();
    }
});


/**
 * Mutes the sound.
 */
function soundOff() {
    if (!world.character.mute) {
        document.getElementById("mute").classList.add('d-none');
        document.getElementById("unmute").classList.remove('d-none');
        world.character.mute = true;
        background_sound.muted = true; // mute background_sound
        background_sound.currentTime = 0; // reset background_sound
    } 
}


/**
 * Unmutes the sound.
 */
function soundOn() {
    if (world.character.mute) {
        document.getElementById("mute").classList.remove('d-none');
        document.getElementById("unmute").classList.add('d-none');
        world.character.mute = false;
        background_sound.muted = false; // unmute background_sound
    }   
} 


/**
 * Opens the game in fullscreen mode.
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
    
    // Switch to fullscreen when mobile phone is held in landscape.
    window.addEventListener('orientationchange', function() {
        if (screen.orientation.type === 'landscape-primary') {
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
    });
}


/**
 * Closes the game from fullscreen mode.
 */
function closeFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}


/**
 * Shows a spinning wheel when page is loading. 
 */
window.addEventListener('load', function() {
    var loader = document.getElementById('loading-overlay');
    loader.style.display = 'none';
});


/**
 * Sets the event listeners (keydown) for the buttons in the panel.
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
 * Sets the event listeners (keyup) for the buttons in the panel.
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
 * Sets the event listeners (touchstart/touchend) for the mobile control panel.
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