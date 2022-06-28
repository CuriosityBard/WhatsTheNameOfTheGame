// before anything else, get the data.
// once the data is retrieved, the player may begin the game.
async function getData() {
    let questions;
    res = await fetch('http://localhost:3000/data');

    if (res.ok) {
        questions = await res.json();
        document.querySelector('#start').disabled = false;
    } else {
        alert("Data unreachable! HTTP-Error: " + res.status)
    }

    return questions;
}

const questions = getData();