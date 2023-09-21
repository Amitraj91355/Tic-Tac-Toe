// Welcome message
console.log("Welcome to Tic Tac Toe");

// Audio elements for game sounds
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

// Initial player turn
let turn = "X";

// Flag to track game over state
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let win of wins) {
        if (
            boxtext[win[0]].innerText === boxtext[win[1]].innerText &&
            boxtext[win[1]].innerText === boxtext[win[2]].innerText &&
            boxtext[win[0]].innerText !== ""
        ) {
            // Effect after a delay
            setTimeout(() => {
                gameover.play();

                // Change the background color of the winning cells
                for (let cell of win) {
                    document.getElementsByClassName("box")[cell].style.backgroundColor =
                        "rgb(112, 255, 112)";
                }

                // Display the winner in the info div
                document.querySelector(".info").innerText = boxtext[win[0]].innerText + " Won";
                document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            }, 250);

            // Set the game over flag
            isgameover = true;
        }
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (!isgameover && boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;

    // Reset the background color of all cells to white
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
    });

    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
