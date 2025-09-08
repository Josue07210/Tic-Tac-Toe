class TicTacToe {
    constructor() {
        this.board = Array(9).fill("");
        this.currentPlayer = "X";
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
        };
        // La inicialización del juego debe ir en un método separado y llamarse fuera del constructor
        // para asegurar que el DOM (document.querySelectorAll) esté cargado.
        this.winningConditions = [
            [0, 1, 2], [0, 4, 8], [3, 4, 5],
            [6, 7, 8], [0, 3, 6], [1, 4, 7],
            [2, 5, 8], [2, 4, 6],
        ];
    }

    initializeGame() {
        this.cells = document.querySelectorAll(".cell");
        this.currentPlayerDisplay = document.getElementById("current-player");
        this.gameStatus = document.getElementById("game-status");
        this.resetBtn = document.getElementById("reset-btn");
        this.newGameBtn = document.getElementById("new-game-btn");
        this.scoreX = document.getElementById("score-x");
        this.scoreO = document.getElementById("score-o");

        this.agregarEventos();
        this.updateDisplay();
    }

    agregarEventos() {
        this.cells.forEach(cell => {
            cell.addEventListener("click", this.handleClickCell.bind(this));
        });
        this.resetBtn.addEventListener("click", this.handleResetGame.bind(this));
        this.newGameBtn.addEventListener("click", this.handleNewGame.bind(this));
    } 

    handleClickCell(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute("data-index"));

        // Se corrigió la lógica para que el return detenga la función si la celda ya está llena o el juego no está activo
        if (this.board[index] !== "" || !this.gameActive) {
            return;
        }

        this.makeMove(index, cell);
    }

    makeMove(index, cell) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());

        if (this.checkWinner()) {
            this.handleGameEnd('win');
        } else if (this.checkDraw()) {
            this.handleGameEnd('draw');
        } else {
            this.switchPlayer();
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }

    checkWinner() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                this.highlightWinningCells(condition);
                return true;
            }
        }
        return false;
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    highlightWinningCells(winningCondition) {
        winningCondition.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }

    handleGameEnd(result) {
        this.gameActive = false;
        if (result === 'win') {
            this.gameStatus.textContent = `${this.currentPlayer} ha ganado!`;
            this.scores[this.currentPlayer]++;
        } else {
            this.gameStatus.textContent = 'Empate!';
        }
        this.updateDisplay();
    }

    handleResetGame() {
        this.gameActive = true;
        this.board = Array(9).fill("");
        this.currentPlayer = "X";
        this.cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o', 'winning');
        });
        this.updateDisplay();
        this.gameStatus.textContent = "Juego en curso.";
    }

    handleNewGame() {
        this.scores = { X: 0, O: 0 };
        this.handleResetGame();
    }

   updateDisplay() {
    // Only update the current player's letter, not the word "Turno:"
    this.currentPlayerDisplay.textContent = `${this.currentPlayer}`;

    // Only update the scores, not the labels "X:" and "O:"
    this.scoreX.textContent = `${this.scores.X}`;
    this.scoreO.textContent = `${this.scores.O}`;
}
}

document.addEventListener("DOMContentLoaded", function() {
    const game = new TicTacToe();
    game.initializeGame();
});