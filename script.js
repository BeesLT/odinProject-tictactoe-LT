const cellElement = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const playerXInput = document.getElementById('playerXName');
const playerOInput = document.getElementById('playerOName');
const resetButton = document.getElementById('reset');

const gameBoard = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

let playerXName = "Player X";
let playerOName = "Player O";

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cellElement.forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index));
});

function setPlayerNames() {
    playerXName = playerXInput.value.trim() || "Player X";
    playerOName = playerOInput.value.trim() || "Player O";
}

function handleMove(index) {
    if (!gameBoard[index] && gameActive) {
        setPlayerNames();
        gameBoard[index] = currentPlayer;
        cellElement[index].textContent = currentPlayer;

        if (checkWinner()) {
            const winnerPlayer = currentPlayer === 'X' ? playerXName : playerOName;
            messageElement.textContent = `${winnerPlayer} wins`;

            gameActive = false;
            disableBoard();

        } else if (gameBoard.every(cell => cell)) {
            messageElement.textContent = 'It\'s a draw';
            gameActive = false;

        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    return winConditions.some(combination =>
        combination.every(index => gameBoard[index] === currentPlayer)
    );
}

function disableBoard() {
    cellElement.forEach(cell => {
        cell.computedStyleMap.pointerEvents = "none";
    }

    );
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoard.fill(null);
    cellElement.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
    });
    messageElement.textCOnent = '';
    currentPlayer = 'X';
    gameActive = true;
}