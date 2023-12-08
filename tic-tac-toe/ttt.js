document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", i);
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }

    // Handle cell click event
    function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");
        if (gameBoard[index] === "") {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            checkWinner();
            switchPlayer();
        }
    }

    // Switch player turns
    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Check for a winner
   // Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            const winner = currentPlayer;
            status.textContent = `Player ${winner} wins!`;
            disableCells();
            alert(`Player ${winner} wins!`);
            resetGame();
            return;
        }
    }

    if (gameBoard.every(cell => cell !== "")) {
        status.textContent = "It's a draw!";
        alert("It's a draw!");
    }
}


    // Disable all cells after the game ends
    function disableCells() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
    }

    // Reset the game
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.addEventListener("click", handleCellClick);
        });

        status.textContent = "Player X's turn";
    }

    initializeBoard();
    resetBtn.addEventListener("click", resetGame);
});
