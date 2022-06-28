// object to hold the DOM elements we'll be manipulating
const dom = {
    startGameButton: document.querySelector('#start'),
    restartGameButton: document.querySelector('#restart'),
    introContainer: document.querySelector('#intro'),
    questionContainer: document.querySelector('#question')
}

// before anything else runs, get the data.
// once the data is retrieved, the player may begin the game.
let questions;
function prepGame() {
    fetch('http://localhost:3000/data')
        .then(res => res.json())
        .then(data => {
            questions = data.questions;
        })
        .then(() => {
            dom.startGameButton.disabled = false;
            dom.startGameButton.addEventListener('click', playGame);
            dom.restartGameButton.addEventListener('click', restartGame);
        });
}
prepGame();

// gameplay functions 
function toggleGameElements() {
    dom.startGameButton.classList.toggle('hidden');
    dom.restartGameButton.classList.toggle('hidden');
    dom.introContainer.classList.toggle('hidden');
    dom.questionContainer.classList.toggle('hidden');
}

function playGame() {
    toggleGameElements();
}

function restartGame() {
    toggleGameElements();
}