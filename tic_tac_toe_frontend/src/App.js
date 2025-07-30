import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component for Tic Tac Toe.
 * Implements a minimalistic, responsive, two-player game with win/draw notifications and reset.
 */
function App() {
  // 'X' starts first
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const playerX = 'X';
  const playerO = 'O';

  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    /**
     * Checks for a winner in the given board state.
     * Returns 'X', 'O', or null.
     */
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],  // Rows
      [0,3,6],[1,4,7],[2,5,8],  // Columns
      [0,4,8],[2,4,6],          // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function getStatusText(winner, boardFilled) {
    /**
     * Returns game status string for the status bar.
     */
    if (winner) {
      return `🎉 Player ${winner} wins!`;
    } else if (boardFilled) {
      return "It's a draw!";
    } else {
      return `Next: Player ${isXNext ? playerX : playerO}`;
    }
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    /**
     * Handles a click on a board cell.
     */
    if (board[idx] || gameOver) return;

    const boardCopy = board.slice();
    boardCopy[idx] = isXNext ? playerX : playerO;
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /**
     * Resets the game to initial state.
     */
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setStatus(`Next: Player ${playerX}`);
  }

  // Effect to update status/win/draw after each move
  useEffect(() => {
    const winner = calculateWinner(board);
    const allFilled = board.every(square => square !== null);

    if (winner) {
      setStatus(getStatusText(winner, allFilled));
      setGameOver(true);
    } else if (allFilled) {
      setStatus(getStatusText(null, true));
      setGameOver(true);
    } else {
      setStatus(getStatusText(null, false));
    }
  }, [board, isXNext]);

  // Inline styles for board/cells using custom color scheme
  // Colors: primary #2c3e50, secondary #ecf0f1, accent #e74c3c
  // Minimal, modern, light-themed, responsive.
  return (
    <div className="ttt-app-bg">
      <div className="ttt-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status-bar" aria-live="polite">{status}</div>
        <Board 
          squares={board} 
          onCellClick={handleClick} 
          disabled={gameOver} 
        />
        <button 
          className="ttt-reset-btn"
          onClick={handleReset}
          disabled={!gameOver && board.every(cell => cell === null)}
          aria-label="Reset Game"
        >
          Reset
        </button>
        <footer className="ttt-footer">
          <span>
            <a className="ttt-footer-link" href="https://github.com/" target="_blank" rel="noopener noreferrer">by KAVIA</a>
          </span>
        </footer>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board component: 3x3 responsive grid of cells.
 */
function Board({ squares, onCellClick, disabled }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((value, i) => (
        <Cell 
          key={i} 
          value={value} 
          onClick={() => onCellClick(i)}
          disabled={!!value || disabled}
          aria-posinset={i+1}
          aria-setsize={9}
        />
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Cell component: individual square.
 */
function Cell({ value, onClick, disabled }) {
  return (
    <button 
      className="ttt-cell"
      onClick={onClick}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={value ? `Cell, ${value}` : "Empty cell"}
      type="button"
    >
      {value}
    </button>
  );
}

export default App;
