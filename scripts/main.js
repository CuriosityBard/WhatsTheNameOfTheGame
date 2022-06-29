// object to hold the DOM elements we'll be manipulating
const dom = {
    startGameButton: document.querySelector('#start'),
    restartGameButton: document.querySelector('#restart'),

    introContainer: document.querySelector('#intro'),

    questionContainer: document.querySelector('#question'),
    questionAsk: document.querySelector('#ask'),
    answerA: document.querySelector('#answer-a'),
    answerB: document.querySelector('#answer-b'),
    answerC: document.querySelector('#answer-c'),
    answerD: document.querySelector('#answer-d'),
    answerE: document.querySelector('#answer-e'),

    sos: document.querySelector('#sos'),

    possibleAnswers: [document.querySelector('#a'), document.querySelector('#b'), document.querySelector('#c'), document.querySelector('#d'), document.querySelector('#e')] // for loops later
}
// object to hold gameplay data
const game = {
    score: 0,
    sosUsed: false, // this will change to true when used
    win: true,      // this will change to false on a loss
    usedQuestionIndices: []    // this will hold an array of the indices of used questions so questions aren't repeated
}

// before anything else runs, get the data.
// once the data is retrieved, the player may begin the game.
let questions;
function prepGame() {
    fetch('https://curiositybard.github.io/WhatsTheNameOfTheGame/data.json')
        .then(res => res.json())
        .then(data => {
            questions = data.questions;
        })
        .then(() => {
            dom.startGameButton.disabled = false;
            // add event listeners to the buttons 
            dom.startGameButton.addEventListener('click', playGame);
            dom.restartGameButton.addEventListener('click', restartGame);
            dom.sos.addEventListener('click', runSos);
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

function playRound() {
    // first, clear previous event listeners 
    for (let i = 0; i < 5; i++) {
        dom.possibleAnswers[i].removeEventListener('click', winRound);
        dom.possibleAnswers[i].removeEventListener('click', loseRound);
    }

    let questionNum;

    if (game.usedQuestionIndices.length === questions.length) {
        // if all the questions have been played, end the game 
        gameOver();
    }

    do {
        // generate a random question number until a new question is found
        questionNum = Math.floor(Math.random() * questions.length);
    } while (game.usedQuestionIndices.includes(questionNum));

    // show user the question and answers 
    dom.questionAsk.innerText = questions[questionNum].question;
    dom.answerA.innerText = questions[questionNum].answers[0];
    dom.answerB.innerText = questions[questionNum].answers[1];
    dom.answerC.innerText = questions[questionNum].answers[2];
    dom.answerD.innerText = questions[questionNum].answers[3];
    dom.answerE.innerText = questions[questionNum].answers[4];

    // add appropriate event listeners 
    for (let i = 0; i < 5; i++) {
        if (i === questions[questionNum].correct) {
            dom.possibleAnswers[i].addEventListener('click', winRound)
        } else {
            dom.possibleAnswers[i].addEventListener('click', loseRound)
        }
    }

    // update used questions 
    game.usedQuestionIndices.push(questionNum);
}

function winRound() {
    game.score++;
    playRound();
}

function loseRound() {
    game.win = false;
    gameOver();
}

function runSos() {
    game.sosUsed = true;
    playRound();
}

function gameOver() {
    toggleGameElements();
    console.log("end");
}

function playGame() {
    toggleGameElements();
    playRound();
}

function restartGame() {
    toggleGameElements();
}