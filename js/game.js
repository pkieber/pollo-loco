let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
// audio files


function startGame() {
    initLevel();
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startBtn').classList.add('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    btnPanelPressEvents();
    // console.log('My Character is', world.character);}
}


function restart() {
    location.reload();
}


// Function to stop all intervals
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function stopGame() {
    intervalIds.forEach(clearInterval);
}


/* Alternative (quick and dirty), um alle Intervalle zu beenden. */
/*
clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
*/


function showEndscreenWin() {
    document.getElementById('endscreenWin').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startBtn').classList.remove('d-none');
    document.querySelector('#startBtn img').src = './img/repeat.svg'; // Replaces button 'start' icon with 'repeat' icon
    document.getElementById('startBtn').setAttribute('title', 'Play again'); // Change button title from 'Start Game' to 'Play again'
    document.getElementById('startBtn').setAttribute('onclick', 'restart()');
}

function showEndscreenLost() {
    document.getElementById('endscreenLost').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startBtn').classList.remove('d-none');
    document.querySelector('#startBtn img').src = './img/repeat.svg'; // Replaces button 'start' icon with 'repeat' icon
    document.getElementById('startBtn').setAttribute('title', 'Play again'); // Change button title from 'Start Game' to 'Play again'
    document.getElementById('startBtn').setAttribute('onclick', 'restart()');
}


// Show and hide instructions
function showInstructions() {
    document.getElementById("overlayInstruction").style.display = "block";
}

function hideInstructions() {
    document.getElementById("overlayInstruction").style.display = "none";
}

window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("overlayInstruction")) {
    hideInstructions();
    }
});


// Mute and unmute background sound
function soundOff() {
    if (!world.character.mute) {
    document.getElementById("mute").classList.add('d-none');
    document.getElementById("unmute").classList.remove('d-none');
    world.character.mute = true;
    } 
}

function soundOn() {
    if (world.character.mute) {
    document.getElementById("mute").classList.remove('d-none');
    document.getElementById("unmute").classList.add('d-none');
    world.character.mute = false;
    }   
} 


// Fullscreen Mode
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


// Taste drücken
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

// Taste loslassen
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


// Mobile control panel
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
