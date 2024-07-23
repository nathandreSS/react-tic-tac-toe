import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [player, setPlayer] = useState("x");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  function playerTurn() {
    if (player === "x") {
      setPlayer("o");
    } else {
      setPlayer("x");
    }
  }

  function getAllIndexes(arr, val) {
    return arr.reduce((acc, element, index) => {
      if (element === val) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  function checkWinner(newSquares) {
    const winnerPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ];
    const xSquares = getAllIndexes(newSquares, "x");
    const oSquares = getAllIndexes(newSquares, "o");
    for (let i = 0; i < winnerPositions.length; i++) {
      if (winnerPositions[i].every((element) => xSquares.includes(element))) {
        setWinner("x");
        console.log("O ganhador é o 'x'");
      } else if (
        winnerPositions[i].every((element) => oSquares.includes(element))
      ) {
        setWinner("o");
        console.log("O ganhador é o 'o'");
      }
    }
  }
  function handleClick(i) {
    if (squares[i] === null && winner === null) {
      let newSquares = squares.slice();
      newSquares[i] = player;
      checkWinner(newSquares);
      setSquares(newSquares);
      playerTurn();
    }
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
