import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the Tic Tac Toe title and status bar', () => {
  render(<App />);
  const title = screen.getByText(/Tic Tac Toe/i);
  expect(title).toBeInTheDocument();
  expect(screen.getByText(/Next: Player X/i)).toBeInTheDocument();
});

test('can play a full game and detect winner', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell|empty/i });

  // Simulate moves for X win (X,O,X,O,X)
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[1]); // O
  fireEvent.click(cells[3]); // X
  fireEvent.click(cells[2]); // O
  fireEvent.click(cells[6]); // X

  expect(screen.getByText(/Player X wins/i)).toBeInTheDocument();
});

test('reset button works', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell|empty/i });
  fireEvent.click(cells[0]);
  fireEvent.click(cells[1]);
  fireEvent.click(cells[3]);
  fireEvent.click(cells[2]);
  fireEvent.click(cells[6]);
  const reset = screen.getByRole('button', { name: /reset/i });
  fireEvent.click(reset);

  expect(screen.getByText(/Next: Player X/i)).toBeInTheDocument();
});

test('declares draw correctly', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell|empty/i });

  // X O X
  // X O O
  // O X X
  [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(idx => fireEvent.click(cells[idx]));

  expect(screen.getByText(/It's a draw/i)).toBeInTheDocument();
});
