const board = document.getElementById("board");
const status = document.getElementById("status");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let gameOver = false;
let scores = { X: 0, O: 0 };
let gameMode = "player"; // 'player' or 'computer'

function setMode(mode) {
    gameMode = mode;
    resetGame();
    status.textContent = `Mode: Player vs ${mode === "player" ? "Player" : "Computer"} | Player X's turn`;
}

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.index = index;
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", handleClick);
        board.appendChild(cellDiv);
    });
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] || gameOver) return;

    makeMove(index, currentPlayer);
    if (gameOver || gameMode === "player") return;

    setTimeout(() => {
        const aiMove = getBestMove();
        makeMove(aiMove, "O");
    }, 300);
}

function makeMove(index, player) {
    gameBoard[index] = player;
    const cell = board.children[index];
    cell.textContent = player;

    const winnerCombo = checkWinner();
    if (winnerCombo) {
        status.textContent = `Player ${player} wins!`;
        highlightWinner(winnerCombo);
        scores[player]++;
        updateScores();
        gameOver = true;
    } else if (gameBoard.every(cell => cell)) {
        status.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameMode === "player" || (gameMode === "computer" && currentPlayer === "X")) {
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (!gameBoard[i]) {
            gameBoard[i] = "O";
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(boardState, depth, isMaximizing) {
    const winner = checkWinner(boardState);
    if (winner) return winner[0] === "O" ? 10 - depth : -10 + depth;
    if (boardState.every(cell => cell)) return 0;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!boardState[i]) {
                boardState[i] = "O";
                let eval = minimax(boardState, depth + 1, false);
                boardState[i] = "";
                maxEval = Math.max(maxEval, eval);
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!boardState[i]) {
                boardState[i] = "X";
                let eval = minimax(boardState, depth + 1, true);
                boardState[i] = "";
                minEval = Math.min(minEval, eval);
            }
        }
        return minEval;
    }
}

function checkWinner(customBoard = gameBoard) {
    const combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of combos) {
        const [a, b, c] = combo;
        if (customBoard[a] && customBoard[a] === customBoard[b] && customBoard[a] === customBoard[c]) {
            return combo;
        }
    }
    return null;
}

function highlightWinner(combo) {
    combo.forEach(i => {
        board.children[i].classList.add("winner");
    });
}

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function resetGame() {
    gameBoard = Array(9).fill("");
    currentPlayer = "X";
    gameOver = false;
    createBoard();
    status.textContent = `Mode: Player vs ${gameMode === "player" ? "Player" : "Computer"} | Player X's turn`;
}

function resetScores() {
    scores = { X: 0, O: 0 };
    updateScores();
    resetGame();
}

createBoard();