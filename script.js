const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function intilizeGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameInfo.innerText = `Current Player : ${currentPlayer}`;
    boxes.forEach((box, index) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove('active'); // Hide the button after initialization
}

function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player : ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkWinner();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener('click', intilizeGame);

function checkWinner() {
    let winner = "";
    winningPositions.forEach((position) => {
        if (gameGrid[position[0]] !== "" && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) {
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
        
            winner = gameGrid[position[0]];
        
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.textContent = `Winner is - ${winner}`; // Display winner info
        newGameBtn.classList.add('active'); // Show the New Game button
        return;
    }

    let fillCount = gameGrid.filter(box => box !== "").length;

    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add('active'); // Show the New Game button
    }
}

intilizeGame();