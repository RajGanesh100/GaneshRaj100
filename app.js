const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function getBoardCells() {
  return Array.from(document.querySelectorAll('.cell'));
}

function setStatus(message) {
  statusElement.textContent = message;
}

function checkWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }

  if (boardState.every(cell => cell !== '')) {
    return 'draw';
  }

  return null;
}

function handleCellClick(event) {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  if (gameOver || boardState[index]) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    if (winner === 'draw') {
      setStatus('It is a draw. Nice game!');
    } else {
      setStatus(`Player ${winner} wins! 🎉`);
      highlightWinningCells(winner);
    }
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`Player ${currentPlayer}'s turn.`);
}

function highlightWinningCells(winner) {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] === winner &&
      boardState[b] === winner &&
      boardState[c] === winner
    ) {
      [a, b, c].forEach(index => {
        const cell = boardElement.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('winner');
      });
      return;
    }
  }
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  getBoardCells().forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  setStatus(`Player ${currentPlayer}'s turn.`);
}

function attachListeners() {
  getBoardCells().forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);
}

function initializeGame() {
  attachListeners();
  setStatus(`Player ${currentPlayer}'s turn.`);
}

initializeGame();
